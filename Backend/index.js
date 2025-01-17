const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
    host: '10.5.104.55', // MySQL zerbitzariaren helbidea
    user: 'admin', // MySQL erabiltzailea
    password: '', // MySQL pasahitza
    database: 'elorbase', // Datu-basearen izena
    port: '3308' , // Portua 

});

db.connect((err) => {
    if (err) {
        console.error('Errorea datu-basera konektatzean:', err);
        return;
    }
    console.log('Datu-basera konektatuta');
});

// Endpoints CRUD USERS
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/ikasleak', (req, res) => {
    const query = 'SELECT * FROM users where tipo_id = 4';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/irakasleak', (req, res) => {
    const query = 'SELECT * FROM users where tipo_id = 3';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
app.get('/admin', (req, res) => {
    const query = 'SELECT * FROM users where tipo_id = 2';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// Endpoints CRUD USERS
app.post('/login', (req, res) => {
    const { user, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [user, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send({ success: true, user: results[0] });
        } else {
            res.send({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE users SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
// Endpoints CRUD CICLOS

app.get('/ciclos', (req, res) => {
    const query = 'SELECT * FROM ciclos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/ciclos', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO ciclos SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});

app.put('/ciclos/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE ciclos SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/ciclos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ciclos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoints CRUD horarios

app.get('/horarios', (req, res) => {
    const query = 'SELECT * FROM horarios';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/horarios', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO horarios SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});

app.put('/horarios/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE horarios SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/horarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM horarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// Endpoints CRUD MATRICULACIONES

app.get('/matriculaciones', (req, res) => {
    const query = 'SELECT * FROM matriculaciones';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/matriculaciones', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO matriculaciones SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});

app.put('/matriculaciones/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE matriculaciones SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/matriculaciones/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM matriculaciones WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoints CRUD modulos

app.get('/modulos', (req, res) => {
    const query = 'SELECT * FROM modulos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/modulos', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO modulos SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});

app.put('/modulos/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE modulos SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/modulos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM modulos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoints CRUD reuniones

app.get('/reuniones', (req, res) => {
    const query = 'SELECT * FROM reuniones';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/reuniones', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO reuniones SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});

app.put('/reuniones/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE reuniones SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/reuniones/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM reuniones WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});



// Endpoints CRUD tipos

app.get('/tipos', (req, res) => {
    const query = 'SELECT * FROM tipos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/tipos', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO tipos SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});

app.put('/tipos/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE tipos SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/tipos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tipos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});






// Zerbitzaria hasieratu
const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Zerbitzaria http://localhost:${PORT} -n martxan dago`);
});




