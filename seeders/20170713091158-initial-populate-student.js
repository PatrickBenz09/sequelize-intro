'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Students', [
      {
        first_name: 'Ahmad',
        last_name: 'Nasikin',
        email: 'ahmadnasikin@sekolah.id',
        jurusan: 'Computer Science',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Kokoh',
        last_name: 'Tegar',
        email: 'kokohtegar@sekolah.id',
        jurusan: 'Computer Engineering',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
