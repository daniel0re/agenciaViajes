import express from 'express';
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env'});

const app = express();

// conectar a la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))


// Habilitar pug
app.set('view engine', 'pug');

// Definir las carpeta publica
app.use(express.static('public'));

// Obtener el year actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear(); 
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Agregar Reuter
app.use('/',router);

// Definir Puerto
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';
app.listen(port, host,() => { 
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});

