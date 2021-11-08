/*
Autores:
	- Yeisson Pinilla
	- Edward Mendez
	- Alejandro Buelvas
Proyecto para la clase de 
	Programación Creativa
2021
Universidad de La Sabana
*/

// Variables
var partidaRecienCreada = true;
var listaEnemigos = [];
var disparosEnemigos = [];
var disparosJugador = [];
var jugador;

// Colores
var azul = "#1082c8"
var celeste = "#33b2ff"
var rojo = "#ec360f"
var naranja = "#f09811"

function preload() {
	musicaFondo = loadSound("media/musicaFondo.mp3")
	audioDisparoJugador = loadSound("media/disparoJugador.wav");
	audioDisparoEnemigo = loadSound("media/disparoEnemigo.wav");
	audioJugadorHerido = loadSound("media/jugadorHerido.wav");
	audioMuerteJugador = loadSound("media/muerteJugador.wav");
	audioMuerteEnemigo = loadSound("media/muerteEnemigo.wav");
	audioVictoria = loadSound("media/victoria.wav")
	imagenCielo = loadImage("media/cielo.jpg");
	spriteJugador = loadImage("media/jugador.png");
	spriteEnemigo = loadImage("media/enemigo.png");
}

function setup() {
	createCanvas(500, 500);
	jugador = new Jugador(225);
	musicaFondo.setVolume(0.25);
	musicaFondo.play()
}

function draw() {
	background(imagenCielo);

	if (partidaRecienCreada) {
		crearHileraEnemigos(-20);
		crearHileraEnemigos(-120);
		crearHileraEnemigos(-220);
		partidaRecienCreada = false;
	} else {
		enemigosVivos = listaEnemigos.filter(enemigo => enemigo.estaVivo)
		enemigosVivos.forEach(enemigo => enemigo.crear())

		if (listaEnemigos.length === 0) {
			detenerPartida(audioVictoria)
		}
	}

	for (var enemigo in listaEnemigos) {
		enemigoActual = listaEnemigos[enemigo];
		enemigoActual.moverse();
		//esperar(1000).then(activarEnemigo(enemigoActual));
		for (var disparo in disparosJugador) {
			disparoActual = disparosJugador[disparo];
			if (enemigoActual.estaVivo) {
				if (enemigoActual.fueImpactado(disparoActual)) {
					disparosJugador.splice(disparo, 1);
					listaEnemigos.splice(enemigo, 1)
				}
			}
		}
	}

	/*
	for (var enemigo of listaEnemigos) {
		for (var disparo in disparosEnemigos) {
			if (jugador.fueImpactado(disparo)) {
				audioJugadorHerido.play();
				disparosEnemigos.splice(disparo, 1);
			}
		}
	}
	*/

	jugador.crear();
	activarDisparos(disparosJugador, azul, celeste);

}

/*
function activarEnemigo(enemigo) {
	var valorAleatorio = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
	activarDisparos(disparosEnemigos, rojo, naranja);
	
	enemigo.moverse();
	if (valorAleatorio === 1) {
		enemigo.disparar();
	}
}
*/

function detenerPartida(audio) {
	noLoop();
	musicaFondo.stop();
	audio.play();
}

function activarDisparos(lista, color, aura) {
	fill(color);
	stroke(aura);
	lista.forEach(disparo => disparo.moverse());
}

function crearHileraEnemigos(posicionY) {
	for (posicionX = 40; posicionX < width - 60; posicionX += 50) {
		enemigo = new Enemigo(posicionX, posicionY);
		enemigo.crear();

		listaEnemigos.push(enemigo);
	}
}

function esperar(milisegundos) {
	return new Promise((resolve) => {
		setTimeout(resolve, milisegundos);
	})
}