const { getKnex } = require('./db.js');
const { rowFilter } = require('./security/row.js');
const { columnFilter } = require('./security/column.js');
const _ = require('lodash');

// Định nghĩa bảng và các cột được phép thao tác
const table = 'customers';
const columns = ['username', 'fullname', 'email', 'tel'];

// Hàm lấy danh sách khách hàng
const getAll = async (req) => {
    // Bắt đầu truy vấn với các cột được phép
    let knex = getKnex()(table).select(columns);
    // Áp dụng bộ lọc hàng dựa trên quyền
    knex = rowFilter(knex, "getAll", table, req.user);
    // Thực thi truy vấn và trả về kết quả
    const result = await knex;
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
        // Gọi hàm create_account
        const result = await knex.raw(
            `select * from public.create_account(?, ?, ?)`,
            [username, password, 'customer']
        );

        const { success, message, data } = result.rows[0];

        if (success) {
            // Thêm thông tin cơ bản vào bảng `customer`
            await knex('customers').insert({
                username: username,
                fullname: '',
                email: '',
                tel: '',
            });
        }

        return { success, message, data };
    } catch (error) {
        throw new Error('Error calling create_account function: ' + error.message);
    }
};



module.exports = {
    getAll,
    getOne,
    update,
    deleteOne,
    create // Export hàm create
};
