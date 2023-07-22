const { client_db, db } = require("./connect");
const dotenv = require("dotenv");
dotenv.config();

// Create the stored procedure in the ${process.env.DATABASE} database
async function createProcedureInQMSProject() {
  try {
    await client_db.query(`
      CREATE PROCEDURE IF NOT EXISTS ${process.env.DATABASE}.sync_patient_details(
        IN action VARCHAR(10),
        IN uhid_value VARCHAR(255),
        IN firstname_value VARCHAR(255),
        IN midname_value VARCHAR(255),
        IN lastname_value VARCHAR(255),
        IN fathername_value VARCHAR(255),
        IN husbandname_value VARCHAR(255),
        IN mothername_value VARCHAR(255),
        IN dob_value VARCHAR(255),
        IN genderid_value VARCHAR(255),
        IN maritalstatusid_value VARCHAR(255),
        IN bloodgroupid_value VARCHAR(255),
        IN address_value VARCHAR(255),
        IN pincode_value VARCHAR(255),
        IN mobileno_value VARCHAR(255),
        IN emailid_value VARCHAR(255),
        IN adharno_value VARCHAR(255),
        IN isvip_value VARCHAR(255)
      )
      BEGIN
        IF action = 'INSERT' THEN
          INSERT INTO ${process.env.DATABASE}.patient_details (uhid, firstname, midname, lastname, fathername, husbandname, mothername, dob, genderid, maritalstatusid, bloodgroupid, address, pincode, mobileno, emailid, adharno, isvip)
          VALUES (uhid_value, firstname_value, midname_value, lastname_value, fathername_value, husbandname_value, mothername_value, dob_value, genderid_value, maritalstatusid_value, bloodgroupid_value, address_value, pincode_value, mobileno_value, emailid_value, adharno_value, isvip_value);
        ELSEIF action = 'UPDATE' THEN
          UPDATE ${process.env.DATABASE}.patient_details
          SET firstname = firstname_value, midname = midname_value, lastname = lastname_value, fathername = fathername_value, husbandname = husbandname_value, mothername = mothername_value, dob = dob_value, genderid = genderid_value, maritalstatusid = maritalstatusid_value, bloodgroupid = bloodgroupid_value, address = address_value, pincode = pincode_value, mobileno = mobileno_value, emailid = emailid_value, adharno = adharno_value, isvip = isvip_value
          WHERE uhid = uhid_value;
        ELSEIF action = 'DELETE' THEN
          DELETE FROM ${process.env.DATABASE}.patient_details WHERE uhid = uhid_value;
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
      CREATE TRIGGER IF NOT EXISTS ${process.env.SERVERDATABASE}.client_db_patient_reg_after_insert
      AFTER INSERT ON patient_reg
      FOR EACH ROW
      BEGIN
        CALL ${process.env.DATABASE}.sync_patient_details(
          'INSERT',
          NEW.uhid, NEW.firstname, NEW.midname, NEW.lastname, NEW.fathername, NEW.husbandname, NEW.mothername, NEW.dob, NEW.genderid, NEW.maritalstatusid, NEW.bloodgroupid, NEW.address, NEW.pincode, NEW.mobileno, NEW.emailid, NEW.adharno, NEW.isvip
        );
      END;
    `);

    // Trigger for AFTER UPDATE
    await db.query(`
      CREATE TRIGGER IF NOT EXISTS ${process.env.SERVERDATABASE}.client_db_patient_reg_after_update
      AFTER UPDATE ON patient_reg
      FOR EACH ROW
      BEGIN
        CALL ${process.env.DATABASE}.sync_patient_details(
          'UPDATE',
          NEW.uhid, NEW.firstname, NEW.midname, NEW.lastname, NEW.fathername, NEW.husbandname, NEW.mothername, NEW.dob, NEW.genderid, NEW.maritalstatusid, NEW.bloodgroupid, NEW.address, NEW.pincode, NEW.mobileno, NEW.emailid, NEW.adharno, NEW.isvip
        );
      END;
    `);

    // Trigger for AFTER DELETE
    await db.query(`
      CREATE TRIGGER IF NOT EXISTS ${process.env.SERVERDATABASE}.client_db_patient_reg_after_delete
      AFTER DELETE ON patient_reg
      FOR EACH ROW
      BEGIN
        CALL ${process.env.DATABASE}.sync_patient_details(
          'DELETE',
          OLD.uhid, OLD.firstname, OLD.midname, OLD.lastname, OLD.fathername, OLD.husbandname, OLD.mothername, OLD.dob, OLD.genderid, OLD.maritalstatusid, OLD.bloodgroupid, OLD.address, OLD.pincode, OLD.mobileno, OLD.emailid, OLD.adharno, OLD.isvip
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
