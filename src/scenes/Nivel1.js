/* export default class Nivel1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel1' });
    }

    // Precarga de recursos
    preload() {
        this.load.image('fondo', 'assets/fondos/fondo2.png'); // Fondo del nivel 1
        this.load.image('plataforma', 'assets/recursos/platforma.png'); // Plataformas
        this.load.image('recurso', 'assets/star.png'); // Recursos (estrellas)
        this.load.image('bomba', 'assets/bomb.png'); // Bombas (enemigos)
        this.load.spritesheet('personaje', 'assets/personaje2_spriteshet.png', {
            frameWidth: 32,
            frameHeight: 48
        }); // Personaje
    }

    // Creación de elementos
    create() {
        // Configuración inicial
        this.vidas = 3; // Inicializar vidas
        this.puntuacion = 0; // Inicializar puntuación

        // Mostrar fondo
        this.add.image(400, 300, 'fondo');

        // Crear plataformas
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(400, 568, 'plataforma').setScale(2).refreshBody();
        this.plataformas.create(600, 400, 'plataforma');
        this.plataformas.create(50, 250, 'plataforma');
        this.plataformas.create(750, 220, 'plataforma');

        // Crear personaje
        this.personaje = this.physics.add.sprite(100, 450, 'personaje');
        this.personaje.setBounce(0.2);
        this.personaje.setCollideWorldBounds(true);

        // Animaciones del personaje
        this.anims.create({
            key: 'izquierda',
            frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'quieto',
            frames: [{ key: 'personaje', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'derecha',
            frames: this.anims.generateFrameNumbers('personaje', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Colisiones entre personaje y plataformas
        this.physics.add.collider(this.personaje, this.plataformas);

        // Crear recursos (estrellas)
        this.recursos = this.physics.add.group({
            key: 'recurso',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.recursos.children.iterate((recurso) => {
            recurso.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Colisiones entre recursos y plataformas
        this.physics.add.collider(this.recursos, this.plataformas);

        // Crear bombas (enemigos)
        this.bombas = this.physics.add.group();

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
    }

    // Actualización del juego (se ejecuta en cada frame)
    update() {
        // Movimiento del personaje
        if (this.cursors.left.isDown) {
            this.personaje.setVelocityX(-160);
            this.personaje.anims.play('izquierda', true);
        } else if (this.cursors.right.isDown) {
            this.personaje.setVelocityX(160);
            this.personaje.anims.play('derecha', true);
        } else {
            this.personaje.setVelocityX(0);
            this.personaje.anims.play('quieto', true);
        }

        if (this.cursors.up.isDown && this.personaje.body.touching.down) {
            this.personaje.setVelocityY(-330);
        }
    }

    // Recolectar recursos
    recolectarRecurso(personaje, recurso) {
        recurso.disableBody(true, true);

        // Incrementar puntuación
        this.puntuacion += 10;
        this.mostrarPuntuacion();

        // Verificar si se recolectaron todos los recursos
        if (this.recursos.countActive(true) === 0) {
            // Reiniciar recursos
            this.recursos.children.iterate((recurso) => {
                recurso.enableBody(true, recurso.x, 0, true, true);
            });

            // Lanzar una bomba
            const x = (this.personaje.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            const bomba = this.bombas.create(x, 16, 'bomba');
            bomba.setBounce(1);
            bomba.setCollideWorldBounds(true);
            bomba.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    // Perder una vida
    perderVida() {
        this.vidas--;
        this.mostrarVidas();

        if (this.vidas === 0) {
            this.scene.start('GameOver');
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
} */

    export default class Nivel1 extends Phaser.Scene {
        constructor() {
            super({ key: 'Nivel1' });
        }
    
        init(data) {
            this.nombreJugador = data.nombreJugador || 'Jugador';
            this.personajeSeleccionado = data.personajeSeleccionado || 'MC_personaje';
        }
    
        preload() {
            this.load.image('fondo', 'assets/fondos/fondo1.png');
            this.load.image('plataforma', 'assets/recursos/platform.png');
            this.load.spritesheet(this.personajeSeleccionado, `assets/personajes/${this.personajeSeleccionado}.png`, {
                frameWidth: 32,
                frameHeight: 48
            });
        }
    
        create() {
            // Mostrar nombre y personaje seleccionado
            this.add.text(16, 16, `Jugador: ${this.nombreJugador}`, { fontSize: '24px', fill: '#fff' });
    
            // Crear personaje seleccionado
            this.personaje = this.physics.add.sprite(100, 450, this.personajeSeleccionado);
            this.personaje.setBounce(0.2);
            this.personaje.setCollideWorldBounds(true);
        }
    }
    