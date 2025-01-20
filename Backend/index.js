const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
    //Localhost.....
   // host: 'localhost', // MySQL zerbitzariaren helbidea
  //  port: '3306' , // Portua 

    //Clase.....
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

app.delete('/usersdelete/:id', (req, res) => {
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



// Endpoints CRUD horarios

app.get('/horarios', (req, res) => {
    const query = 'SELECT * FROM horarios';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// GET HORARIOS POR ID 

app.get('/ordutegia/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
    h.dia AS Dia,
    h.hora AS Hora,
    m.nombre AS Modulo
FROM 
    horarios h
JOIN 
    modulos m ON m.id = h.modulo_id
WHERE 
    m.nombre NOT IN ('Tutoria', 'Guardia') 
    AND h.modulo_id IN (
        SELECT 
            m.id 
        FROM 
            modulos m
        WHERE 
            m.ciclo_id = (
                SELECT 
                    ciclo_id 
                FROM 
                    matriculaciones mat
                WHERE 
                    alum_id = 3
            )
            AND m.curso = (
                SELECT 
                    curso 
                FROM 
                    matriculaciones mat
                WHERE 
                    alum_id = ?
            )
    )
GROUP BY 
    h.dia, h.hora, m.nombre
        ORDER BY 
            CASE 
                WHEN h.dia = 'L/A' THEN 1
                WHEN h.dia = 'M/A' THEN 2
                WHEN h.dia = 'X' THEN 3
                WHEN h.dia = 'J/O' THEN 4
                WHEN h.dia = 'V/O' THEN 5
                ELSE 6
            END,
            h.hora;
    `;
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


// Endpoints CRUD modulos

app.get('/modulos', (req, res) => {
    const query = 'SELECT * FROM modulos';
    db.query(query, (err, results) => {
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

// RECUPERAR LAS REUNIONES DE HOY

app.get('/gaurkoBilerak', (req, res) => {
    const query = 'SELECT * FROM reuniones WHERE DATE(fecha) = current_date();';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// RECUPERAR LAS REUNIONES DE HOY POR USUARIO

app.get('/gaurkoBilerak/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM reuniones WHERE DATE(fecha) = current_date() AND profesor_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


//RECUPERAR TODAS LAS REUNIONES DE UN USUARIO


app.get('/bilerak/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM reuniones where alumno_id = 3';
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


// Zerbitzaria hasieratu
const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Zerbitzaria http://localhost:${PORT} -n martxan dago`);
});




