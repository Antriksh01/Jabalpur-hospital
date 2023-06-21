// token verification

import { db } from "../connect.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return console.log("you are not authenticate");
  } else {
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        return console.log("invalid token ");
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

export const isAdmin = async (req, res) => {
  const { username, role } = req.body;

  const q = "SELECT * FROM admin_register WHERE username = ?";

  db.query(q, [username], (error, results) => {
    var string = res.send(JSON.stringify(results));

    // console.log(string[0].username);
    if (error) {
      console.error("Error fetching user roles:", error);
      res.status(500).json({ error: "Error fetching user roles" });
    } else {
      const roles = results.map((row) => row.name);
      // console.log({ roles });
    }
  });
};
