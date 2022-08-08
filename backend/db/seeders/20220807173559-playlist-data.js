'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name: 'CJs Playlist',
        imageUrl: 'cjsjams.com'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
      const Op = Sequelize.Op;
      await queryInterface.bulkDelete('Playlists', {
        name: { [Op.in]: ['CJs Playlist']}
    }, {});
  }
};
