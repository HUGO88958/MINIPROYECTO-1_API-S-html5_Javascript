export default class Nivel2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel2' });
    }

    // Precarga de recursos
    preload() {
        this.load.image('fondo', 'assets/fondos/fondo2.png'); // Fondo del nivel 2
        this.load.image('plataforma', 'assets/recursos/plataforma.png'); // Plataformas
        this.load.image('estrella', 'assets/recursos/star.png'); // Recursos (estrellas)
        this.load.image('bomba', 'assets/recursos/enemigo.png'); // Bombas (enemigos)
        this.load.spritesheet('personaje', 'assets/personajes/spritep2.png', {
            frameWidth: 137,
            frameHeight: 144,
        }); // Personaje
        this.load.audio('sonidoRecolectar', 'assets/sonidos/recolectar.mp3');
        this.load.audio('sonidoSalto', 'assets/sonidos/salto.mp3'); 
        this.load.audio('sonidoMorir', 'assets/sonidos/muerte.mp3');
        this.load.audio('sonidoCoalicion', 'assets/sonidos/coalicion.mp3');

    }

    // Creación de elementos
    create(data) {
        // Configuración inicial
        this.vidas = 3; // Inicializar vidas
        this.puntuacion = data.score || 0; // Puntuación del nivel anterior
        this.gameOver = false; // Flag for game over state
        this.anchoPantalla = this.sys.game.config.width;
        this.altoPantalla = this.sys.game.config.height;
        
        // Punto de spawn del personaje (más arriba y centrado)
        this.personajeSpawnX = this.anchoPantalla / 2;
        this.personajeSpawnY = 200; // Más arriba para evitar caer directamente

        // Mostrar fondo
        const fondo = this.add.image(400, 300, 'fondo');
        fondo.setScale(this.anchoPantalla / fondo.width, this.altoPantalla / fondo.height);

        // Crear plataformas distribuidas para cubrir la pantalla con espacios estratégicos
        this.plataformas = this.physics.add.staticGroup();
        
        // Plataformas inferiores con espacio en el centro para caer
        this.plataformas.create(175, this.altoPantalla - 50, 'plataforma').setScale(1).refreshBody();
        this.plataformas.create(625, this.altoPantalla - 50, 'plataforma').setScale(1).refreshBody();
        
        // Plataformas intermedias
        this.plataformas.create(400, this.altoPantalla - 200, 'plataforma').setScale(1).refreshBody();
        
        // Plataformas superiores
        this.plataformas.create(150, this.altoPantalla - 350, 'plataforma').setScale(0.8).refreshBody();
        this.plataformas.create(650, this.altoPantalla - 350, 'plataforma').setScale(0.8).refreshBody();
        this.plataformas.create(400, this.altoPantalla - 480, 'plataforma').setScale(0.8).refreshBody();

        // Ajustar hitboxes de plataformas
        this.plataformas.children.iterate((plataforma) => {
            plataforma.body.setSize(plataforma.width * 0.8, plataforma.height * 0.4);
        });

        // Crear personaje en el punto de spawn
        this.personaje = this.physics.add.sprite(this.personajeSpawnX, this.personajeSpawnY, 'personaje');
        this.personaje.setBounce(0.2);
        this.personaje.setCollideWorldBounds(false); // Permitir salir de los límites para detectar caída

          //Ajuste de hitbox
          if (this.personaje === 'spritep1') {
            // Reducir el ancho y alto del hitbox para mejor precisión
            this.personaje.body.setSize(40, 90); 
            // Centrar el hitbox en el personaje
            this.personaje.body.setOffset(60, 40);
            
        }else{
            this.personaje.body.setSize(30, 40); // Cambiar tamaño del hitbox del personaje
             this.personaje.body.setOffset(30,40); // Ajustar la posición del hitbox
        }

        // Animaciones del personaje
        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('personaje', { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'quieto',
            frames: [{ key: 'personaje', frame: 5 }],
            frameRate: 20
        });

        // Colisiones entre personaje y plataformas
        this.physics.add.collider(this.personaje, this.plataformas);

        // Crear recursos (estrellas) - Distribuidas por toda la pantalla
        this.recursos = this.physics.add.group();
        
        // Posiciones para estrellas más distribuidas estratégicamente
        const posicionesEstrellas = [
            {x: 175, y: this.altoPantalla - 100},  // Plataforma inferior izquierda
            {x: 625, y: this.altoPantalla - 100},  // Plataforma inferior derecha
            {x: 400, y: this.altoPantalla - 250},  // Plataforma central
            {x: 150, y: this.altoPantalla - 400},  // Plataforma superior izquierda
            {x: 650, y: this.altoPantalla - 400},  // Plataforma superior derecha
            {x: 400, y: this.altoPantalla - 530},  // Plataforma más alta
            // Estrellas adicionales en posiciones estratégicas
            {x: 250, y: this.altoPantalla - 170},
            {x: 550, y: this.altoPantalla - 170},
            {x: 100, y: this.altoPantalla - 220},
            {x: 700, y: this.altoPantalla - 220},
            {x: 250, y: this.altoPantalla - 300},
            {x: 550, y: this.altoPantalla - 300},
            {x: 300, y: this.altoPantalla - 400},
            {x: 500, y: this.altoPantalla - 400},
            {x: 300, y: this.altoPantalla - 530},
            {x: 500, y: this.altoPantalla - 530},
        ];
        
        // Crear estrellas en las posiciones definidas
        posicionesEstrellas.forEach(pos => {
            const estrella = this.recursos.create(pos.x, pos.y, 'estrella');
            estrella.setBounceY(Phaser.Math.FloatBetween(0.6, 1.0));
            estrella.setScale(0.8);
        });

        // Colisiones entre recursos y plataformas
        this.physics.add.collider(this.recursos, this.plataformas);

        // Crear bombas (enemigos)
        this.bombas = this.physics.add.group();
        this.crearBomba();
        this.crearBomba();

        // Colisiones entre bombas y plataformas
        this.physics.add.collider(this.bombas, this.plataformas);

        // Colisiones entre personaje y bombas
        this.physics.add.collider(this.personaje, this.bombas, this.perderVida, null, this);

        // Colisiones entre personaje y recursos
        this.physics.add.overlap(this.personaje, this.recursos, this.recolectarRecurso, null, this);

        // Mostrar vidas y puntuación
        this.mostrarVidas();
        this.mostrarPuntuacion();

        // Controles del personaje
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Detector de caída al vacío - verificamos más frecuentemente
        this.verificadorCaida = this.time.addEvent({
            delay: 100, // Verificar más rápido (cada 100ms)
            callback: this.verificarCaida,
            callbackScope: this,
            loop: true
        });
    }

    // Crear una bomba con comportamiento avanzado
    crearBomba() {
        const x = Phaser.Math.Between(100, this.anchoPantalla - 100);
        const bomba = this.bombas.create(x, 16, 'bomba');
        
        bomba.setBounce(1);
        bomba.setCollideWorldBounds(false);
        bomba.setVelocity(Phaser.Math.Between(-400, -400), 20);
        bomba.allowGravity = true;
        bomba.body.setCircle(bomba.width / 2.5);
        
        // Añadir evento de salto para la bomba
        this.time.addEvent({
            delay: Phaser.Math.Between(1500, 3000),
            callback: () => this.saltoBomba(bomba),
            callbackScope: this,
            loop: true
        });
        
        return bomba;
    }

    // Verificar si el personaje ha caído al vacío
    verificarCaida() {
        if (this.gameOver) return;
        
        // Si el personaje está por debajo del borde inferior de la pantalla
        if (this.personaje.y > this.altoPantalla + 50) {
            this.perderVidaPorCaida();
        }
    }

    // Perder una vida por caída al vacío
    perderVidaPorCaida() {
        // Asegurar que el personaje está activo antes de procesarlo
        if (!this.personaje.active || this.gameOver) return;
        
        this.vidas--;
        this.mostrarVidas();
        
        if (this.vidas <= 0) {
            this.gameOver = true;
            this.physics.pause();
            
            // Esperar un momento antes de cambiar a la escena GameOver
            this.time.delayedCall(1000, () => {
                this.scene.start('GameOver', { score: this.puntuacion });
            });
        } else {
            // Reposicionar el personaje en su punto de inicio
            this.personaje.setVelocity(0, 0);
            this.personaje.setPosition(this.personajeSpawnX, this.personajeSpawnY);
            this.personaje.setTint(0xff0000);
            
            // Quitar el tinte rojo después de un momento
            this.time.delayedCall(500, () => {
                this.personaje.clearTint();
            });
        }
    }

    // Actualización del juego (se ejecuta en cada frame)
    update() {
        if (this.gameOver) {
            return;
        }

        // Movimiento del personaje
        if (this.cursors.left.isDown) {
            this.personaje.setVelocityX(-160);
            this.personaje.anims.play('caminar', true);
            this.personaje.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.personaje.setVelocityX(160);
            this.personaje.anims.play('caminar', true);
            this.personaje.setFlipX(false);
        } else {
            this.personaje.setVelocityX(0);
            this.personaje.anims.play('quieto', true);
        }

        // Salto
        if (this.cursors.up.isDown && this.personaje.body.touching.down) {
            this.sound.play('sonidoSalto', { volume: 0.5 });
            this.personaje.setVelocityY(-360);
        }

        // Actualizar comportamiento de bombas
        this.bombas.children.iterate((bomba) => {
            if (!bomba || !bomba.active) return;
            
            // Asegurar que la bomba siempre tenga gravedad constante
            if (!bomba.body.allowGravity) {
                bomba.allowGravity = true;
            }
            bomba.body.gravity.y = 900; // Gravedad
            
            // Si la bomba está fuera de los límites visibles, reposiciónala
            if (bomba.y > this.altoPantalla + 50 ||
                bomba.x < -50 ||
                bomba.x > this.anchoPantalla + 50) {
                bomba.setPosition(Phaser.Math.Between(100, this.anchoPantalla - 100), 0);
                bomba.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        });
    }

    // Recolectar recursos PASO A la siguiente escena
    recolectarRecurso(personaje, recurso) {
        recurso.disableBody(true, true);
        this.sound.play('sonidoRecolectar', { volume: 0.5 });
        // Incrementar puntuación
        this.puntuacion += 10;
        this.mostrarPuntuacion();

        // Verificar si se recolectaron todos los recursos
        if (this.recursos.countActive(true) === 0) {
            // Reiniciar recursos (solo algunas estrellas para hacer más difícil el nivel)
            for (let i = 0; i < 8; i++) {
                const x = Phaser.Math.Between(100, this.anchoPantalla - 100);
                const y = Phaser.Math.Between(50, this.altoPantalla / 2);
                const estrella = this.recursos.create(x, y, 'estrella');
                estrella.setBounceY(Phaser.Math.FloatBetween(0.6, 1.0));
                estrella.setScale(0.8);
            }

            // Lanzar más bombas con comportamiento de salto
            this.crearBomba();
            
            // Aumentar la dificultad tras cada ciclo de estrellas recolectadas
            if (this.puntuacion >= 300) {  // Condición de victoria
                this.time.delayedCall(1000, () => {
                    this.scene.start('GameOver', { score: this.puntuacion, win: true });
                });
            }
        }
    }

    // Método para hacer que la bomba salte aleatoriamente
    saltoBomba(bomba) {
        if (!bomba || !bomba.active) return;
        
        // Solo salta si está en contacto con el suelo o plataforma
        if (bomba.body.touching.down) {
            // Aplicar impulso vertical
            bomba.setVelocityY(-500);

            // Mantener velocidad horizontal
            bomba.setVelocityX(Phaser.Math.Between(-300, 300));
        }

        // Si la bomba está cerca del jugador, intenta saltar hacia él
        const distancia = Phaser.Math.Distance.Between(
            bomba.x, bomba.y,
            this.personaje.x, this.personaje.y
        );

        if (distancia < 200 && bomba.body.touching.down) {
            // Calcular dirección hacia el jugador
            const dirX = this.personaje.x - bomba.x;
            bomba.setVelocityX(dirX > 0 ? 200 : -200);
            bomba.setVelocityY(-500); // Salto agresivo
        }
    }

   

    // Perder vida por colisión con bomba
    perderVida(personaje, bomba) {
        if (this.gameOver) return;

        
        this.sound.play('sonidoCoalicion', { volume: 0.5 });
        this.vidas--;
        this.mostrarVidas();

        if (this.vidas === 0) {
            this.sound.play('sonidoMorir', { volume: 0.5 });
            this.gameOver = true;
            this.physics.pause();
            this.personaje.setTint(0xff0000);
            this.personaje.anims.play('quieto');

            // Esperar un momento antes de cambiar a la escena GameOver
            this.time.delayedCall(1000, () => {
                this.scene.start('GameOver', { score: this.puntuacion });
            });
        } else {
            // Regenerar una nueva bomba si no hay bombas activas
            if (this.bombas.countActive(true) === 0) {
                const x = (this.personaje.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                const nuevaBomba = this.bombas.create(x, 16, 'bomba');
                nuevaBomba.setBounce(0.8);
                nuevaBomba.setCollideWorldBounds(true);
                nuevaBomba.setVelocity(Phaser.Math.Between(-250, 250), 20);
                nuevaBomba.allowGravity = true;
                nuevaBomba.body.setCircle(nuevaBomba.width / 2.5);

                this.time.addEvent({
                    delay: Phaser.Math.Between(1500, 3000),
                    callback: () => this.saltoBomba(nuevaBomba),
                    callbackScope: this,
                    loop: true
                });
            }
        }
    }

    // Mostrar vidas en pantalla
    mostrarVidas() {
        if (this.textoVidas) {
            this.textoVidas.destroy();
        }
        this.textoVidas = this.add.text(16, 16, `Vidas: ${this.vidas}`, {
            fontSize: '32px',
            fill: '#fff'
        });
    }

    // Mostrar puntuación en pantalla
    mostrarPuntuacion() {
        if (this.textoPuntuacion) {
            this.textoPuntuacion.destroy();
        }
        this.textoPuntuacion = this.add.text(16, 50, `Puntuación: ${this.puntuacion}`, {
            fontSize: '32px',
            fill: '#fff'
        });
    }
}
