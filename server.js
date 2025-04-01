const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST, // pl. "localhost"
  user: process.env.DB_USER, // pl. "root"
  password: process.env.DB_PASS, // adatbázis jelszó
  database: process.env.DB_NAME, // adatbázis neve
});

db.connect((err) => {
  if (err) {
    console.error("Hiba a MySQL kapcsolat során: ", err);
    return;
  }
  console.log("MySQL csatlakoztatva!");
});


app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";  // SQL lekérés a users táblára
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Hiba történt a felhasználók lekérésekor." });
    }
    res.json(results);  // A lekért adatokat JSON formátumban küldjük vissza
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));
