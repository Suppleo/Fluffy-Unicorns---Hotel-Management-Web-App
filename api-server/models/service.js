const {getPgClient, getKnex} = require('./db.js');

const getAllServices = async () => {
    const knex = getKnex();
    try {
        const services = await knex('Service')
            .select(
                'ServiceID',
                'ServiceName',
                'ServiceType',
                'Unit',
                'UnitPrice',
                'Description'
            );
        return { success: true, data: services };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = {
    getAllServices
}
