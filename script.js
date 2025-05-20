document.addEventListener('DOMContentLoaded', () => {
    const bienvenidaDiv = document.getElementById('bienvenida');
    const juegoDiv = document.getElementById('juego');
    const botonComenzar = document.getElementById('boton-comenzar');
    let posiblesPersonajes = obtenerListaPersonajes();
    let numeroPregunta = 0;

    // Elementos de audio
    const musicaDeFondo = new Audio('musicafondo.mp3'); // Reemplaza con la ruta de tu canción
    const sonidoBoton = new Audio('ruta/a/tu/sonido_boton.wav'); // Reemplaza con la ruta de tu sonido de botón
    const sonidoInicio = new Audio('ruta/a/tu/sonido_inicio.wav'); // Reemplaza con la ruta de tu sonido de inicio
    const sonidoAcierto = new Audio('ruta/a/tu/sonido_acierto.wav'); // Reemplaza con la ruta de tu sonido de acierto

    // Configuración de la música de fondo
    musicaDeFondo.loop = true; // Para que la canción se repita en bucle
    musicaDeFondo.volume = 0.5; // Ajusta el volumen si es necesario

    // Iniciar la música de fondo al cargar la página
    musicaDeFondo.play().catch(error => {
        console.error("Error al intentar reproducir la música de fondo:", error);
        console.warn("Es posible que la reproducción automática de audio esté bloqueada por el navegador. El usuario deberá interactuar con la página para iniciar la música.");
    });

    const preguntas = [
    { pregunta: '¿De qué color tiene el pelo tu personaje?', opciones: ['negro', 'rojo'], propiedad: 'pelo' },
    { pregunta: '¿Tu personaje suele tener los ojos cerrados?', opciones: ['sí', 'no'], propiedad: 'ojosCerrados' },
    { pregunta: '¿Tu personaje utiliza gorra?', opciones: ['sí', 'no'], propiedad: 'usaGorra' },
    { pregunta: '¿Tu personaje es moreno?', opciones: ['sí', 'no'], propiedad: 'esMoreno' },
    { pregunta: '¿Tu personaje tiene el pelo casi a rapa?', opciones: ['sí', 'no'], propiedad: 'peloRapado' },
    { pregunta: '¿Tu personaje juega en el Newteam SC?', opciones: ['sí', 'no'], propiedad: 'equipo', valor: 'Newteam SC', tipo: 'equipo' },
    { pregunta: '¿Tu personaje juega en el Muppet FC?', opciones: ['sí', 'no'], propiedad: 'equipo', valor: 'Muppet FC', tipo: 'equipo' },
    { pregunta: '¿Tu personaje juega en la defensa?', opciones: ['sí', 'no'], propiedad: 'posicion', valor: 'DF', tipo: 'posicion' },
    { pregunta: '¿Tu personaje juega en el mediocampo?', opciones: ['sí', 'no'], propiedad: 'posicion', valor: 'MD', tipo: 'posicion' },
    { pregunta: '¿Tu personaje juega como delantero?', opciones: ['sí', 'no'], propiedad: 'posicion', valor: 'DL', tipo: 'posicion' },
    { pregunta: '¿Tu personaje es portero?', opciones: ['sí', 'no'], propiedad: 'posicion', valor: 'P', tipo: 'posicion' },
    { pregunta: '¿Qué número tiene tu personaje?', obtenerOpciones: () => [...new Set(posiblesPersonajes.map(p => p.numero))].sort((a, b) => a - b).map(n => n.toString()), propiedad: 'numero', tipo: 'numero' }
];

    botonComenzar.addEventListener('click', () => {
        sonidoInicio.play(); // Reproducir sonido al iniciar
        bienvenidaDiv.style.display = 'none';
        juegoDiv.style.display = 'block';
        // La música ya se está reproduciendo desde la carga de la página
        iniciarJuego();
    });

    function obtenerListaPersonajes() {
    return [
        { nombre: 'Baxter Foster', numero: 2, posicion: 'DF', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: true, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador2.png' },
        { nombre: 'Steve O Neill', numero: 3, posicion: 'DF', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador3.png' },
        { nombre: 'Nick Star', numero: 4, posicion: 'DF', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador4.png' },
        { nombre: 'Felix Green', numero: 5, posicion: 'DF', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: true, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador5.png' },
        { nombre: 'Arnold Jones', numero: 7, posicion: 'MD', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador7.png' },
        { nombre: 'Oscar Reeves', numero: 8, posicion: 'MD', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador8.png' },
        { nombre: 'Conrad Ayle', numero: 9, posicion: 'MD', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador9.png' },
        { nombre: 'Mark Lenders', numero: 10, posicion: 'DL', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: false, esMoreno: true, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador10.png' },
        { nombre: 'Keith Coleman', numero: 11, posicion: 'DL', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/Jugador11.png' },
        { nombre: 'Danny Melow', numero: 15, posicion: 'MD', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: true, imagen: '/imagenes/jugadoresmuppet/Jugador15.png' },
        { nombre: 'Ed Warner', numero: 17, posicion: 'P', pelo: 'negro', equipo: 'Muppet FC', ojosCerrados: false, usaGorra: true, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresmuppet/jugador17.png' },
        { nombre: 'Benji Price', numero: 1, posicion: 'P', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: true, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/Jugador1.png' },
        { nombre: 'Charlie Custer', numero: 2, posicion: 'DF', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador2.png' },
        { nombre: 'Jill Taylor', numero: 4, posicion: 'DF', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador4.png' },
        { nombre: 'Jack Morris', numero: 5, posicion: 'MD', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador5.png' },
        { nombre: 'Bob Denver', numero: 6, posicion: 'DF', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: true, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador6.png' },
        { nombre: 'Ted Carter', numero: 7, posicion: 'DL', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: true, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador7.png' },
        { nombre: 'Paul Diamond', numero: 8, posicion: 'MD', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador8.png' },
        { nombre: 'Johnny', numero: 9, posicion: 'DL', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador9.png' },
        { nombre: 'Oliver Atom', numero: 10, posicion: 'DL', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador10.png' },
        { nombre: 'Tom Baker', numero: 11, posicion: 'MD', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: false, peloRapado: false, imagen: '/imagenes/jugadoresnewteam/jugador11.png' },
        { nombre: 'Bruce Harper', numero: 14, posicion: 'DF', pelo: 'negro', equipo: 'Newteam SC', ojosCerrados: false, usaGorra: false, esMoreno: true, peloRapado: true, imagen: '/imagenes/jugadoresnewteam/jugador14.png' }
    ];
}

    function iniciarJuego() {
        posiblesPersonajes = obtenerListaPersonajes();
        numeroPregunta = 0;
        mostrarPregunta(preguntas[numeroPregunta].pregunta, preguntas[numeroPregunta].opciones || ['sí', 'no']);
    }

    function mostrarPregunta(pregunta, opciones) {
        juegoDiv.innerHTML = `<h2>${pregunta}</h2><div class="opciones"></div><div id="resultado"></div>`;
        const opcionesDiv = juegoDiv.querySelector('.opciones');
        const resultadoDiv = juegoDiv.querySelector('#resultado');

        opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.textContent = opcion.charAt(0).toUpperCase() + opcion.slice(1);
            boton.dataset.respuesta = opcion;
            opcionesDiv.appendChild(boton);
            boton.addEventListener('click', () => {
                sonidoBoton.currentTime = 0; // Reiniciar el sonido para que se reproduzca completo si se presiona rápido
                sonidoBoton.play();
            });
        });

opcionesDiv.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const respuesta = event.target.dataset.respuesta;
                resultadoDiv.textContent = `Has seleccionado: ${respuesta}`;
                filtrarPersonajes(respuesta);

                setTimeout(() => {
                    if (posiblesPersonajes.length === 1) {
                        mostrarResultadoFinal(posiblesPersonajes[0]);
                    } else if (posiblesPersonajes.length > 1) {
                        const preguntaActual = preguntas[numeroPregunta];
                        let siguientePregunta = null; // Inicializamos siguientePregunta

                        if (preguntaActual.tipo === 'posicion' && respuesta === 'sí') {
                            // Buscar la siguiente pregunta de posición que no se haya hecho
                            const posicionActual = preguntaActual.valor;
                            siguientePregunta = preguntas.find((p, index) =>
                                p.tipo === 'posicion' &&
                                p.valor === posicionActual &&
                                index > numeroPregunta && // Evitar repetir la misma pregunta inmediatamente
                                !preguntasHechas.includes(p.propiedad)
                            );

                            // Si no hay otra pregunta específica de esta posición,
                            // avanzamos al siguiente grupo de preguntas (evitando otras posiciones)
                            if (!siguientePregunta) {
                                let indiceSiguiente = numeroPregunta + 1;
                                while (indiceSiguiente < preguntas.length && preguntas[indiceSiguiente].tipo === 'posicion') {
                                    indiceSiguiente++;
                                }
                                if (indiceSiguiente < preguntas.length) {
                                    siguientePregunta = preguntas[indiceSiguiente];
                                    numeroPregunta = indiceSiguiente; // Actualizamos numeroPregunta
                                }
                            }
                        }

                        // Si no se encontró una pregunta de posición específica o la respuesta fue 'no',
                        // pasamos a la siguiente pregunta en el orden original
                        if (!siguientePregunta) {
                            numeroPregunta++;
                            if (numeroPregunta < preguntas.length) {
                                siguientePregunta = preguntas[numeroPregunta];
                            }
                        }

                        if (siguientePregunta) {
                            const opcionesSiguiente = siguientePregunta.opciones || (siguientePregunta.obtenerOpciones ? siguientePregunta.obtenerOpciones() : ['sí', 'no']);
                            mostrarPregunta(siguientePregunta.pregunta, opcionesSiguiente);
                        } else {
                            if (posiblesPersonajes.length > 0) {
                                mostrarResultadoFinal(posiblesPersonajes[Math.floor(Math.random() * posiblesPersonajes.length)]);
                            } else {
                                resultadoDiv.textContent = '¡Ups! No se encontró ningún personaje con esas características.';
                            }
                        }
                    } else {
                        resultadoDiv.textContent = '¡Ups! No se encontró ningún personaje con esas características.';
                    }
                }, 1500);
            }
        });
    }

    function filtrarPersonajes(respuesta) {
        const preguntaActual = preguntas[numeroPregunta];
        if (preguntaActual) {
            const propiedad = preguntaActual.propiedad;
            const valor = preguntaActual.valor;
            const respuestaBool = respuesta === 'sí';

            if (propiedad === 'pelo') {
                posiblesPersonajes = posiblesPersonajes.filter(personaje => personaje.pelo === respuesta);
            } else if (propiedad === 'equipo') {
                posiblesPersonajes = posiblesPersonajes.filter(personaje => (personaje.equipo === valor) === respuestaBool);
            } else if (propiedad === 'posicion') {
                posiblesPersonajes = posiblesPersonajes.filter(personaje => personaje.posicion === valor === respuestaBool);
            } else if (propiedad === 'numero') {
                posiblesPersonajes = posiblesPersonajes.filter(personaje => personaje.numero === parseInt(respuesta));
            } else if (propiedad === 'ojosCerrados') {
                posiblesPersonajes = posiblesPersonajes.filter(personaje => personaje.ojosCerrados === respuestaBool);
            } else if (propiedad === 'usaGorra') {
                posiblesPersonajes = posiblesPersonajes.filter(personaje => personaje.usaGorra === respuestaBool);
            } else if (propiedad === 'esMoreno') {
                posiblesPersonajes = posiblesPersonajes.filter(personaje => personaje.esMoreno === respuestaBool);
            } else if (propiedad === 'peloRapado') {
                posiblesPersonajes = posiblesPersonajes.filter(personaje => personaje.peloRapado === respuestaBool);
            }
            console.log('Posibles personajes después del filtro (pregunta ' + (numeroPregunta + 1) + '):', posiblesPersonajes);
        }
    }
 
    function mostrarResultadoFinal(personaje) {
    sonidoAcierto.play(); // Reproducir sonido al adivinar
    juegoDiv.innerHTML = `<h2>¡Creo que tu personaje es...</h2><h1>${personaje.nombre}</h1>`;

    // Crear elemento de imagen
    const imagenPersonaje = document.createElement('img');
    imagenPersonaje.src = personaje.imagen;
    imagenPersonaje.alt = personaje.nombre; // Añadir texto alternativo por accesibilidad
    imagenPersonaje.style.maxWidth = '200px'; // O ajusta el tamaño como prefieras
    imagenPersonaje.style.height = '150px';
    juegoDiv.appendChild(imagenPersonaje);

    const detallesPersonaje = document.createElement('p');
    detallesPersonaje.textContent = `Número: ${personaje.numero}, Posición: ${personaje.posicion}, Equipo: ${personaje.equipo}`;
    juegoDiv.appendChild(detallesPersonaje);
 
    const opcionesFinalDiv = document.createElement('div');
    opcionesFinalDiv.classList.add('opciones-final');

    const botonVolverInicio = document.createElement('button');
    botonVolverInicio.id = 'boton-volver-inicio';
    botonVolverInicio.textContent = 'Volver al Inicio';
    opcionesFinalDiv.appendChild(botonVolverInicio);

    const botonSeguirPreguntando = document.createElement('button');
    botonSeguirPreguntando.id = 'boton-seguir-preguntando';
    botonSeguirPreguntando.textContent = 'No es él / Seguir Preguntando';
    opcionesFinalDiv.appendChild(botonSeguirPreguntando);
 
    juegoDiv.appendChild(opcionesFinalDiv);

    botonVolverInicio.addEventListener('click', () => {
        musicaDeFondo.pause();
        musicaDeFondo.currentTime = 0;
        musicaDeFondo.play().catch(error => {
            console.error("Error al intentar reproducir la música de fondo:", error);
            console.warn("Es posible que la reproducción automática de audio esté bloqueada por el navegador. El usuario deberá interactuar con la página para iniciar la música.");
        });
        juegoDiv.style.display = 'none';
        bienvenidaDiv.style.display = 'block';
        iniciarJuego();
    });

    botonSeguirPreguntando.addEventListener('click', () => {
        numeroPregunta++;
        if (numeroPregunta < preguntas.length) {
            const siguientePregunta = preguntas[numeroPregunta];
            const opcionesSiguiente = siguientePregunta.opciones || (siguientePregunta.obtenerOpciones ? siguientePregunta.obtenerOpciones() : ['sí', 'no']);
            mostrarPregunta(siguientePregunta.pregunta, opcionesSiguiente);
        } else {
            if (posiblesPersonajes.length > 0) {
                mostrarResultadoFinal(posiblesPersonajes[Math.floor(Math.random() * posiblesPersonajes.length)]);
            } else {
                juegoDiv.innerHTML = '<h2>¡No pude adivinar!</h2><p>Intenta de nuevo.</p>';
            }
        }
    });
}
});