/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function(knex) {
    await knex('role').insert({
        name: 'guest',
        note: 'Người dùng chưa đăng nhập'
    });
};

exports.down = async function(knex) {
    await knex('role').where({ name: 'guest' }).del();
};
