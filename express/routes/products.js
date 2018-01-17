const express = require('express'),
    router = express.Router(),
    sqlite3 = require('sqlite3').verbose(),
	path = require('path'),
    dbFile = path.join(__dirname, '../data', 'husky.db'),
	dbFileProd = path.join(process.resourcesPath, "express/data/husky.db");

const db = new sqlite3.Database(dbFileProd);
    
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (key TEXT, value INTEGER)");
    db.run("INSERT INTO products (key, value) VALUES (?, ?)", "counter", 0);
});

router.get('/', (req, res) => res.json({ foo: 'bar' }));

router.get('/all', (req, res) => {
    db.get("SELECT * FROM products", (err, row) => {
        if (err) return res.json({ err })
        res.json({ row });
    });
});

module.exports = router;
