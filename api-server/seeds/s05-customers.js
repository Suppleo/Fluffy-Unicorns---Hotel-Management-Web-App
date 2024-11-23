/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('customers').del()
    .then(function () {
      // Chèn dữ liệu mẫu
      return knex('customers').insert([
        {
          username: 'customer01',
          fullname: 'Nguyễn Văn A',
          email: 'nguyenvana@gmail.com',
          tel: '0901234567'
        },
        {
          username: 'customer02',
          fullname: 'Trần Thị B',
          email: 'tranthib@gmail.com',
          tel: '0902345678'
        },
        {
          username: 'customer03',
          fullname: 'Lê Hoàng C',
          email: 'lehoangc@gmail.com',
          tel: '0903456789'
        },
        {
          username: 'customer04',
          fullname: 'Phạm Kim D',
          email: 'phamkimd@gmail.com',
          tel: '0904567890'
        }
      ]);
    });
};

