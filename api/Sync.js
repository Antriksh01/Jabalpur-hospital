const { client_db, db } = require("./connect");
const dotenv = require("dotenv");
dotenv.config();

// Create the stored procedure in the ${process.env.DATABASE} database
async function createProcedureInQMSProject() {
  try {
    await client_db.query(`
      CREATE PROCEDURE IF NOT EXISTS ${process.env.DATABASE}.sync_patient_token(
        IN action VARCHAR(10),
        IN tokenno_value VARCHAR(255),
        IN patientstatus_value VARCHAR(255),
        IN uhid_value VARCHAR(255),
        IN recieptdatetime_value VARCHAR(255),
        IN Assigned_doctor_value VARCHAR(255),
        IN Token_Generated_by_value VARCHAR(255),
        IN P_Contact_value VARCHAR(255),
        IN P_Email_value Varchar(255)
      )
      BEGIN
        IF action = 'INSERT' THEN
          INSERT INTO ${process.env.DATABASE}.patient_token (Token_ID, treatment_status, uhid, Time, Assigned_doctor, Token_Generated_by, P_Contact, P_Email)
          VALUES (tokenno_value, patientstatus_value, uhid_value, recieptdatetime_value, Assigned_doctor_value, Token_Generated_by_value, P_Contact_value, P_Email_value);
        ELSEIF action = 'UPDATE' THEN
          UPDATE ${process.env.DATABASE}.patient_token
          SET treatment_status = patientstatus_value,
              uhid = uhid_value,
              Time = recieptdatetime_value,
              Assigned_doctor = Assigned_doctor_value,
              Token_Generated_by = Token_Generated_by_value,
              P_Contact = P_Contact_value,
              P_Email = P_Email_value
          WHERE Token_ID = tokenno_value;
        ELSEIF action = 'DELETE' THEN
          DELETE FROM ${process.env.DATABASE}.patient_token WHERE Token_ID = tokenno_value;
        END IF;
      END;
    `);
    console.log("Stored procedure in qms project created successfully!");
  } catch (err) {
    console.error("Error creating stored procedure in qms project:", err);
  }
}

// Create triggers in the qms_test database
async function createTriggersInQMSTest() {
  try {
    // Trigger for AFTER INSERT
    await db.query(`
      CREATE TRIGGER IF NOT EXISTS ${process.env.SERVERDATABASE}.client_db_token_gen_after_insert
      AFTER INSERT ON token_gen
      FOR EACH ROW
      BEGIN
        CALL ${process.env.DATABASE}.sync_patient_token(
          'INSERT',
          NEW.tokenno,
          NEW.patientstatus,
          NEW.uhid,
          NEW.recieptdatetime,
          NEW.Assigned_doctor,
          NEW.Token_Generated_by,
          NEW.P_Contact,
          NEW.P_Email
        );
      END;
    `);

    // Trigger for AFTER UPDATE
    await db.query(`
      CREATE TRIGGER IF NOT EXISTS ${process.env.SERVERDATABASE}.client_db_token_gen_after_update
      AFTER UPDATE ON token_gen
      FOR EACH ROW
      BEGIN
        CALL ${process.env.DATABASE}.sync_patient_token(
          'UPDATE',
          NEW.tokenno,
          NEW.patientstatus,
          NEW.uhid,
          NEW.recieptdatetime,
          NEW.Assigned_doctor,
          NEW.Token_Generated_by,
          NEW.P_Contact,
          NEW.P_Email
        );
      END;
    `);

    // Trigger for AFTER DELETE
    await db.query(`
      CREATE TRIGGER IF NOT EXISTS ${process.env.SERVERDATABASE}.client_db_token_gen_after_delete
      AFTER DELETE ON token_gen
      FOR EACH ROW
      BEGIN
        CALL ${process.env.DATABASE}.sync_patient_token(
          'DELETE',
          OLD.tokenno,
          OLD.patientstatus,
          OLD.uhid,
          OLD.recieptdatetime,
          OLD.Assigned_doctor,
          OLD.Token_Generated_by,
          OLD.P_Contact,
          OLD.P_Email
        );
      END;
    `);

    console.log("Triggers in qms_test created successfully!");
  } catch (err) {
    console.error("Error creating triggers in qms_test:", err);
  }
}

// Call the functions to create the stored procedure and triggers
async function setupTriggersAndProcedures() {
  await createProcedureInQMSProject();
  await createTriggersInQMSTest();
  console.log("Triggers and stored procedure setup completed successfully!");
}

setupTriggersAndProcedures();
