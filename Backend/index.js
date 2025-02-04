const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const e = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
    //Localhost.....
      host: 'localhost', // MySQL zerbitzariaren helbidea
     port: '3308' , // Portua 



    //Clase.....

    // iker host: '10.5.104.39'
   // host: '10.5.104.49', // MySQL zerbitzariaren helbidea
    user: 'admin', // MySQL erabiltzailea
    password: '', // MySQL pasahitza
    database: 'elorbase', // Datu-basearen izena
   // port: '3309', // Portua 

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
app.get('/admins', (req, res) => {
    const query = 'SELECT * FROM users where tipo_id = 2';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results[0]);
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

app.post('/addUser', (req, res) => { 
    const { user, curso, ciclo_id } = req.body;

    const { username, password, email, nombre, apellidos, telefono1, dni, direccion, telefono2, tipo_id, argazkia } = user;

    if (!username || !password || !email) {
        return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
    }

    const query = 'INSERT INTO users (username, password, email, nombre, apellidos, telefono1, dni, direccion, telefono2, tipo_id, argazkia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [username, password, email, nombre, apellidos, telefono1, dni, direccion, telefono2, tipo_id, argazkia];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al insertar el usuario' });
        }

        if (tipo_id == 4) {
            const query2 = 'INSERT INTO matriculaciones (alum_id, ciclo_id, curso, fecha) VALUES (?, ?, ?, NOW())';
            const values2 = [result.insertId, ciclo_id, curso];

            db.query(query2, values2, (err) => {
                if (err) {
                    console.error('Error al insertar matriculación:', err);
                    return res.status(500).json({ success: false, message: 'Error al insertar la matriculación' });
                }

                res.status(201).json({ success: true, message: 'Usuario y matriculación creados correctamente', id: result.insertId });
            });

        } else {
            res.status(201).json({ success: true, message: 'Usuario creado correctamente', id: result.insertId });
        }
    });
});







app.post('/updateUser', (req, res) => {
    const { id, username, password, email, nombre, apellidos, telefono1, dni, direccion, telefono2, tipo_id, argazkia } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
    }

    const query = 'Update users set username = ?, password = ?, email = ?, nombre = ?, apellidos = ?, telefono1 = ?, dni = ?, direccion = ?, telefono2 = ? where id = ?';
    const values = [username, password, email, nombre, apellidos, telefono1, dni, direccion, telefono2, id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al editar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al editar el usuario' });
        }
        res.status(201).json({ success: true, message: 'Usuario editado correctamente', id: result.insertId });
    });
});

app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;  // Ahora obtenemos el ID de la URL

    if (!id) {
        return res.status(400).json({ success: false, message: 'Falta el ID del usuario' });
    }

    const query = 'DELETE FROM users WHERE id = ?';
    const values = [id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al borrar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al borrar el usuario' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Usuario borrado correctamente' });
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


// GET HORARIOS POR ID Alumnos

app.get('/ordutegia/:id', (req, res) => {
    const { id } = req.params;

    // Verificar si el alumno existe en la base de datos
    const checkStudentQuery = 'SELECT COUNT(*) as count FROM matriculaciones WHERE alum_id = ?';
    db.query(checkStudentQuery, [id], (err, results) => {
        if (err) {
            console.error('Error al verificar el alumno:', err);
            return res.status(500).json({ message: 'Error al verificar el alumno.' });
        }
        
        if (results[0].count === 0) {
            return res.status(404).json({ message: 'Alumno no encontrado.' });
        }

        // Si el alumno existe, ejecutar la consulta original
        const query = `
            SELECT 
                h.dia AS Dia,
                h.hora AS Hora,
                m.nombre AS Modulo,
                m.nombre_eus AS ModuloEu
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
                                alum_id = ?
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
        
        db.query(query, [id, id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ message: 'Error al ejecutar la consulta.' });
            }
            res.send(results);
        });
    });
});



// GET HORARIOS POR ID Profesores


app.get('/ordutegiaIrakasle/:id', (req, res) => {
    const { id } = req.params;
    const query = `
       SELECT 
    h.dia AS Dia,
    h.hora AS Hora,
    m.nombre AS Modulo,
    m.nombre_eus AS ModuloEu
FROM
    horarios h
JOIN
    modulos m ON m.id = h.modulo_id
JOIN 
    users u ON u.id = h.profe_id
WHERE
    h.profe_id = ?
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
    const query = 'SELECT * FROM reuniones where alumno_id = ? and date(fecha) >= current_date()';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


app.get('/bilera/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM reuniones where id_reunion = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    });
});

// Bilera bakoitzaren erabiltzailearen izena lortu


app.post('/bileraUsers', (req, res) => {
    const { profe_id, alumno_id } = req.body;

    if (!profe_id || !alumno_id) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros' });
    }

    const query = `SELECT 
        (SELECT nombre FROM users WHERE id = ?) AS nombre_profesor, 
        (SELECT nombre FROM users WHERE id = ?) AS nombre_alumno`;

    db.query(query, [profe_id, alumno_id], (err, result) => {
        if (err) {
            console.error('Error al recuperar usuarios:', err);
            return res.status(500).json({ success: false, message: 'Error al recuperar usuarios' });
        }

        if (!result.length) {
            return res.status(404).json({ success: false, message: 'Usuarios no encontrados' });
        }

        res.status(200).json([result[0].nombre_profesor, result[0].nombre_alumno]);
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




