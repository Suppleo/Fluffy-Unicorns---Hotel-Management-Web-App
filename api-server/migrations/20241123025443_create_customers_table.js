exports.up = function(knex) {
    return knex.schema.createTable('customers', (table) => {
      table.increments('id').primary(); // ID tự tăng
      table.string('username').notNullable().unique().comment('Tên đăng nhập');
      table.string('fullname').notNullable().comment('Họ và tên đầy đủ');
      table.string('email').notNullable().unique().comment('Email của khách hàng');
      table.string('tel').notNullable().comment('Số điện thoại');
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('customers');
};
  