const express = require('express'),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
	path = require('path'),
    dbFile = path.join(__dirname, '../data', 'husky.db'),
    dbFileProd = path.join(process.resourcesPath, "express/data/husky.db");

let db = new sqlite3.Database(dbFile);
    
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (name TEXT)");
});

db.close();

router.get('/', (req, res) => {
    db = new sqlite3.Database(dbFile);
    db.serialize(() => {
        db.all('SELECT name FROM products', (err, rows) => {
            if (err) return res.json({ err });
            return res.json({ rows })
        });  
    });
    db.close();
});

router.post('/add', (req, res) => {
    db = new sqlite3.Database(dbFile);
    db.serialize(() => {
        db.run('INSERT INTO products VALUES (?)', [req.body.product], function getLastRow(err) {
            if (err) return res.json(err);
            return res.json({ product: req.body.product, id: this.lastID });
        });
    });
    db.close();
});

module.exports = router;
