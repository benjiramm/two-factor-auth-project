'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // up
      await queryInterface.sequelize.query(
        'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
        { transaction },
      );

      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            unique: true,
          },
          username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          isEnabled2FA: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.DataTypes.NOW,
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // down

      await queryInterface.dropTable('users', { transaction });

      await queryInterface.sequelize.query(
        'DROP EXTENSION IF EXISTS "uuid-ossp";',
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
