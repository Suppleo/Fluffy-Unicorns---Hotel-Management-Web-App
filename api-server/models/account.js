const { getKnex } = require('./db.js');
const { rowFilter } = require('./security/row.js');
const { columnFilter } = require('./security/column.js');
const {getPgClient} = require('./db.js');
const format = require('pg-format');

const register = async (FirstName, LastName, Username, Phone, Password) => {
    const knex = getKnex();
    
    try {
        // Start transaction
        const result = await knex.transaction(async (trx) => {
            // Create authentication record using stored procedure
            const accountResult = await trx.raw(
                'SELECT * FROM create_account(?, ?, ?)',
                [Username, Password, 'customer']
            );

            const { success, message, data } = accountResult.rows[0];
            
            if (!success) {
                throw new Error(message);
            }

            // Create Account record
            const [accountId] = await trx('Account')
                .insert({
                    Username,
                    FirstName,
                    LastName,
                    Phone,
                    Status: 'Active',
                    Role: 'customer'
                })
                .returning('AccountID');

            // Create Customer record
            await trx('Customer').insert({
                AccountID: accountId.AccountID,
                RewardPoints: 0
            });

            return { success: true, data: { username: Username } };
        });

        return result;

    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};

const login = async (username, password) => {
    const client = getPgClient();
    const sql = format(
        "select json_agg(public.login(%L, %L))",
        username, password
    );
    
    await client.connect();
    const result = await client.query(sql);  
    await client.end();

    return result.rows[0].json_agg[0];;
} 


module.exports = {
    register,
    login
};