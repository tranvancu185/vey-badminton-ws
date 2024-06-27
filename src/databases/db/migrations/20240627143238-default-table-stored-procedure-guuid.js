'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('uuid_codes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      prefix: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      sequence: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    });

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE ${`ume.generate_uuid_code`}(IN prefix VARCHAR(255))
      BEGIN
        DECLARE next_sequence INT;
        DECLARE new_code VARCHAR(255);
        DECLARE last_created_date DATE;
        DECLARE cur_date DATE;

        START TRANSACTION;

        SET cur_date = CURDATE(); 

        SELECT DATE(created_at) INTO last_created_date
        FROM uuid_codes
        ORDER BY id DESC
        LIMIT 1 FOR UPDATE;

        -- Check if a code with this prefix has already been created today
        SELECT IFNULL(MAX(sequence), 0) + 1 INTO next_sequence
        FROM uuid_codes
        WHERE DATE(created_at) = cur_date AND prefix = prefix;

        -- If no code has been created today with this prefix, start with 1
        IF next_sequence = 1 THEN
            SET next_sequence = 1;
        END IF;

        -- Create new code
        SET new_code = CONCAT(prefix, DATE_FORMAT(cur_date, '%y%m%d'), LPAD(next_sequence, 6, '0'));

        -- Insert new code into table
        INSERT INTO uuid_codes (code, prefix, created_at, sequence)
        VALUES (new_code, prefix, cur_date, next_sequence);

        COMMIT;
        SELECT new_code;
      END
    `, { type: queryInterface.sequelize.QueryTypes.RAW });

    await queryInterface.sequelize.query(`
      CREATE PROCEDURE ${`ume.generate_uuid_code_personal`}(IN prefix VARCHAR(255), IN sequence_length INT)
      BEGIN
        DECLARE next_sequence INT;
        DECLARE new_code VARCHAR(255);
        DECLARE last_created_date DATE;
        DECLARE cur_date DATE;

        START TRANSACTION;

        SET cur_date = CURDATE(); 

        SELECT DATE(created_at) INTO last_created_date
        FROM uuid_codes
        ORDER BY id DESC
        LIMIT 1 FOR UPDATE;

        -- Check if a code with this prefix has already been created today
        SELECT IFNULL(MAX(sequence), 0) + 1 INTO next_sequence
        FROM uuid_codes
        WHERE DATE(created_at) = cur_date AND prefix = prefix;

        -- If no code has been created today with this prefix, start with 1
        IF next_sequence = 1 THEN
            SET next_sequence = 1;
        END IF;

        -- Create new code
        SET new_code = CONCAT(prefix, DATE_FORMAT(cur_date, '%y%m%d'), LPAD(next_sequence, sequence_length, '0'));

        -- Insert new code into table
        INSERT INTO uuid_codes (code, prefix, created_at, sequence)
        VALUES (new_code, prefix, cur_date, next_sequence);

        COMMIT;
        SELECT new_code;
      END
    `, { type: queryInterface.sequelize.QueryTypes.RAW });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS generate_uuid_code;');
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS generate_uuid_code_personal;');
    await queryInterface.dropTable('uuid_codes');
  }
};
