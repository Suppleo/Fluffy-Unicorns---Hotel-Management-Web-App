const { getKnex } = require('./db.js');
const { rowFilter } = require('./security/row.js');
const { columnFilter } = require('./security/column.js');
const _ = require('lodash');

// Định nghĩa bảng và các cột được phép thao tác
const table = 'customers';
const columns = ['username', 'fullname', 'email', 'tel'];

const getAll = async (req) => {
    let knex = getKnex();
    
    // Join Customer and Account tables to get full information
    let query = knex('Customer')
        .join('Account', 'Customer.AccountID', '=', 'Account.AccountID')
        .select(
            'Customer.CustomerID',
            'Customer.RewardPoints',
            'Account.FirstName',
            'Account.MiddleName',
            'Account.LastName',
            'Account.Username',
            'Account.Status',
            'Account.DateOfBirth',
            'Account.Gender',
            'Account.Email',
            'Account.Phone',
            'Account.Address',
            'Account.IDNumber'
        );

    // Apply row-level security based on user role
    query = rowFilter(query, "getAll", "customers", req.user);

    const result = await query;
    return result;
};


// Hàm lấy thông tin một khách hàng
const getOne = async (context, username) => {
    // Tạo truy vấn lấy thông tin khách hàng dựa trên username
    let knex = getKnex()(table).select(columns).where({ username });

    // Áp dụng bảo mật dựa trên vai trò
    knex = rowFilter(knex, "getAll", table, context);

    // Thực thi truy vấn
    const result = await knex.first(); // Chỉ trả về dòng đầu tiên
    return result;
};

const update = async (context, username, patch) => {
    const { role } = context;

    // Lọc các cột có thể cập nhật dựa trên vai trò
    const validPatch = _.pick(patch, columnFilter(table, role, "update"));

    // Kiểm tra quyền sửa dựa trên hàng
    let knex = getKnex()(table).update(validPatch).where({ username });
    knex = rowFilter(knex, "update", table, context);

    const rowCount = await knex;
    return {
        success: rowCount === 1,
        data: validPatch
    };
};

const deleteOne = async (context, username) => {
    // Kiểm tra quyền truy cập ở cấp hàng
    let knex = getKnex()('customers').where({ username });
    knex = rowFilter(knex, "delete", "customers", context);

    // Thực hiện xóa
    const rowCount = await knex.del();
    return {
        success: rowCount === 1 // Trả về true nếu xóa thành công
    };
};

const create = async (username, password) => {
    const knex = getKnex();

    try {
        // First create the account
        const result = await knex.raw(
            `select * from public.create_account(?, ?, ?)`,
            [username, password, 'customer']
        );

        const { success, message, data } = result.rows[0];

        if (success) {
            // Create customer record with initial reward points
            await knex('Customer').insert({
                AccountID: data.account_id,
                RewardPoints: 0
            });
        }

        return { success, message, data };
    } catch (error) {
        throw new Error('Error creating customer account: ' + error.message);
    }
};
const getBookings = async (context, username) => {
    const knex = getKnex();
    
    try {
        const allowedColumns = columnFilter("booking", context.role, "getBookings");
        let query = knex('booking').select(allowedColumns).where({ username });
        query = rowFilter(query, "getBookings", "booking", context);

        const bookings = await query;

        if (!bookings || bookings.length === 0) {
            return {
                success: false,
                message: 'No bookings found for this user'
            };
        }

        // Fetch booking details for each booking
        const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
            const details = await knex('booking_detail')
                .where({ booking_id: booking.booking_id });
            return { ...booking, details };
        }));

        return {
            success: true,
            data: bookingsWithDetails
        };
    } catch (error) {
        console.error('Error in getBookings:', error);
        return {
            success: false,
            message: 'Failed to retrieve bookings'
        };
    }
};


module.exports = {
    getAll,
    getOne,
    update,
    deleteOne,
    create,
    getBookings
};
