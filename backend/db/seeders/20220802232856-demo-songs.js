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
    return queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        albumId: 1,
        title: 'Tomorrow',
        description: 'A song about the future',
        url: 'www.cjrocks.com',
        imageUrl: 'www.nohedoesnt.org',
      },
      // {
      //   userId: 1,
      //   title: 'Albumless',
      //   description: 'A hot single',
      //   url: 'www.actuallyhedoes.net',
      //   imageUrl: 'www.actuallyyoureanidiot.io',
      // }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ['Tomorrow']}
    }, {});
  }
};
