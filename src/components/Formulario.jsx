import React, { Fragment, useState } from 'react';
//Esta libreria no me funciono 
// import uuid from 'uuid/v4';
//Libreria para generar id 
import { v4 as uuidv4 } from 'uuid';
//Modulo Citas 

import PropTypes from 'prop-types';



const Formulario = ({crearCita}) => {

    //Crear State de Citas 

    //La funcion llamada actualizarCita se encarga de escribir o reescribir los campos 
    // del formulario en el mismo momento que el usuario escribe

    const [ cita, actualizarCita ] = useState ({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //Segundo state para valir los inputs 
    //El primer parametro es el nombre del state en este caso error
    //Y las segunda es la función que lo modifica 
    const [ error, actualizaError ] = useState (false) 

    //Función que se ejecuta cada vez que un usuario escribe en un input

    const actualizarState = e => {
        actualizarCita({
            //Spread para crear una copia del state
            ...cita,
            //Array Disctructuring 
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores del state por medio de destructuring

    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Funcion Submit Cita - Funciona para cuando el usuario presiona el boton 
    //Enviar el formulario con los datos 

    const submitCita = e => {
        //Prevenir la acción por default 
        e.preventDefault();

        //Primero siempre hay que validar
        //El trim elimina los espcios en blanco en cualquier sentido 
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
        hora.trim() === '' || sintomas.trim() === '' ){
            actualizaError(true);
            return;
        }

        actualizaError(false);


        // Asignar un ID
        //Toda la cita con los datos rellenados
        cita.id = uuidv4();


        // Crear la cita
        crearCita(cita);

        // Reiniciar el Formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error 
            ? 
            <p className="alerta-error">Todos los campos son obligatorios</p>      
            : null}

            <form 
                onSubmit={submitCita}
            >

                <label>Nombre Mascota:</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    //Evento para actualizar State 
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño:</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                    />

                <label>Fecha:</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora:</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas:</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    placeholder="Descripción de los Síntomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>

            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;