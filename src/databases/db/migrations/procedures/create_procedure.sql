CREATE DEFINER=`root`@`localhost` PROCEDURE `ume`.`generate_uuid_code`(IN prefix VARCHAR(255))
BEGIN
    DECLARE next_sequence INT;
    DECLARE new_code VARCHAR(255);
    DECLARE last_created_date DATE;
    DECLARE cur_date DATE; -- Renamed variable to avoid conflict

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
END;


CREATE DEFINER=`root`@`localhost` PROCEDURE `ume`.`generate_uuid_code_personal`(IN prefix VARCHAR(255), IN sequence_length INT)
BEGIN
    DECLARE next_sequence INT;
    DECLARE new_code VARCHAR(255);
    DECLARE last_created_date DATE;
    DECLARE cur_date DATE; -- Renamed variable to avoid conflict

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
END;