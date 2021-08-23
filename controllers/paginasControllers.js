import { Testimonial } from '../models/Testimoniales.js';

import { Viaje } from '../models/Viaje.js';

const paginaInicio = async (req,res) => {
    // Consultar 3 viajes de modelo Viaje
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3}));
    promiseDB.push(Testimonial.findAll({ limit: 3}));

    try {
        
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            nombrePagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

    
}

const paginaNosotros = (req, res) => { // req-lo que enviamos, res- lo que express nos responde
    res.render('nosotros', {
        nombrePagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => { // req-lo que enviamos, res- lo que express nos responde
    // Consultar DB
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        nombrePagina: 'Viajes',
        viajes
    });
}
const paginaTestimoniales = async (req, res) => { // req-lo que enviamos, res- lo que express nos responde
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            nombrePagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
    
}

const paginaDetalleViaje = async (req,res) => { 
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne( { where : { slug } } );
        res.render('viaje', {
            nombrePagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}

