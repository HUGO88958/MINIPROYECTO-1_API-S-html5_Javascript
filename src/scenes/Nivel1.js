export default class Nivel1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel1' });
    }

    // Precarga de recursos
    preload() {
        this.load.image('fondo', 'assets/fondos/fondo1.png'); // Fondo del nivel 1
        this.load.image('plataforma', 'assets/recursos/plataforma.png'); // Plataformas
        this.load.image('estrella', 'assets/recursos/star.png'); // Recursos (estrellas)
        this.load.image('bomba', 'assets/recursos/enemigo.png'); // Bombas (enemigos)
        this.load.spritesheet('personaje', 'assets/personajes/spritep2.png', {
            frameWidth: 137,
            frameHeight: 144,
        }); // Personaje
    }

    // Creación de elementos
    create() {
        // Configuración inicial
        this.vidas = 3; // Inicializar vidas
        this.puntuacion = 0; // Inicializar puntuación
        this.gameOver = false; // Flag for game over state

        // Mostrar fondo
        const fondo = this.add.image(400, 300, 'fondo');
        fondo.setScale(this.sys.game.config.width / fondo.width, this.sys.game.config.height / fondo.height);

        // Crear plataformas
        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(700, 600, 'plataforma').setScale(1).refreshBody();
        this.plataformas.create(500, 600, 'plataforma').setScale(1).refreshBody();
        this.plataformas.create(300, 600, 'plataforma').setScale(1).refreshBody();
        this.plataformas.create(100, 600, 'plataforma').setScale(1).refreshBody();

        this.plataformas.create(600, 400, 'plataforma');
        this.plataformas.create(50, 250, 'plataforma');
        this.plataformas.create(750, 220, 'plataforma');

          // Ajustar hitboxes de plataformas
        this.plataformas.children.iterate((plataforma) => {
        plataforma.body.setSize(plataforma.width * 0.8, plataforma.height*0.4); // Reducir altura del hitbox
        });

        // Crear personaje
        this.personaje = this.physics.add.sprite(500, 450, 'personaje');
        this.personaje.setBounce(0.2);
        this.personaje.setCollideWorldBounds(true);

        //Ajuste de hitbox
        this.personaje.body.setSize(30, 60); // Cambiar tamaño del hitbox del personaje
        this.personaje.body.setOffset(60,40); // Ajustar la posición del hitbox
        
        

        // Animaciones del personaje
        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('personaje', {frames: [0,1,2,3,4,5] }), // Usa los fotogramas de caminar hacia la derecha
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'quieto',
            frames: [{ key: 'personaje', frame: 5 }], // Fotograma cuando está quieto
            frameRate: 20
        });

        // Colisiones entre personaje y plataformas
        this.physics.add.collider(this.personaje, this.plataformas);

        // Crear recursos (estrellas)
        this.recursos = this.physics.add.group({
            key: 'estrella',
            repeat: 15,
            setXY: {
                x: 12,
                y: 0,
                stepX: 70
            }
        });

        this.recursos.children.iterate((recurso) => {
            recurso.setBounceY(Phaser.Math.FloatBetween(0.6, 1.0));
            recurso.setScale(0.8);
        });

        // Colisiones entre recursos y plataformas
        this.physics.add.collider(this.recursos, this.plataformas);

        // Crear bombas (enemigos)
        this.bombas = this.physics.add.group({
            key: 'bomba',
            repeat: 0,
            setXY: {
                x: 12,
                y: 0,
                stepX: 70
            }
        });

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
        if (this.gameOver) {
            return;
        }

        // Movimiento del personaje
        if (this.cursors.left.isDown) {
            this.personaje.setVelocityX(-160);
            this.personaje.anims.play('caminar', true);
            this.personaje.setFlipX(true); // Invertir horizontalmente para la izquierda
        } else if (this.cursors.right.isDown) {
            this.personaje.setVelocityX(160);
            this.personaje.anims.play('caminar', true);
            this.personaje.setFlipX(false); // Normal para la derecha
        } else {
            this.personaje.setVelocityX(0);
            this.personaje.anims.play('quieto', true);
        }

        // Salto
        if (this.cursors.up.isDown && this.personaje.body.touching.down) {
            this.personaje.setVelocityY(-360);
        }

        this.bombas.children.iterate((bomba) => {
            // Asegurar que la bomba siempre tenga gravedad constante
            if (!bomba.body.allowGravity) {
                bomba.allowGravity = true;
            }
            bomba.body.gravity.y = 1000; // Gravedad constante
    
            // Mantener rebote constante
            bomba.setBounce(1.0);
    
            // Si la bomba está en el suelo, asegurar movimiento constante
            if (bomba.body.touching.down) {
                if (Math.abs(bomba.body.velocity.x) < 50) {
                    bomba.setVelocityX(Phaser.Math.Between(-200, 200));
                }
            }
    
            // Si la bomba está fuera de los límites visibles, reposiciónala
            if (bomba.y > this.sys.game.config.height + 50 || 
                bomba.x < -50 || 
                bomba.x > this.sys.game.config.width + 50) {
                bomba.setPosition(Phaser.Math.Between(0, this.sys.game.config.width), 0);
                bomba.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        });
    }


    // Recolectar recursos*******************************
    recolectarRecurso(personaje, recurso) {
        recurso.disableBody(true, true);

        // Incrementar puntuación
        this.puntuacion += 10;
        this.mostrarPuntuacion();

        // Verificar si se recolectaron todos los recursos
        if (this.recursos.countActive(true) === 0) {
            // Transición a Nivel2
            console.log('Transición a Nivel2 iniciada');
            this.time.delayedCall(1000, () => {
            this.scene.start('Nivel2', {score: this.puntuacion});
            });
        }
    }  

    generarBomba(esBombaFinal = false) {
        const x = (this.personaje.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomba = this.bombas.create(x, 16, 'bomba');
        
        bomba.setBounce(0.8);
        bomba.setCollideWorldBounds(true);
        
        // Si es bomba final, darle más velocidad como desafío adicional
        const velocidadBase = esBombaFinal ? 250 : 150;
        bomba.setVelocity(Phaser.Math.Between(-velocidadBase, velocidadBase), 20);
        
        bomba.allowGravity = true;
        bomba.body.setCircle(bomba.width / 2.5); // Corregido de widht a width
        
        // Configurar comportamiento de salto
        this.time.addEvent({
            delay: Phaser.Math.Between(2000, 4000),
            callback: () => this.saltoBomba(bomba),
            callbackScope: this,
            loop: true
        });
        
        return bomba;
    }

    // COMPORTAMIENTO DE LA BOMBA
    saltoBomba(bomba) {
        // Solo salta si está en contacto con el suelo o plataforma
        if (bomba.body.touching.down) {
            // Aplicar impulso vertical constante
            bomba.setVelocityY(-600);

            // Mantener velocidad horizontal constante
            bomba.setVelocityX(Phaser.Math.Between(-200, 200));
        }
      
    
        // Si la bomba está cerca del jugador, intenta saltar hacia él
        const distancia = Phaser.Math.Distance.Between(
            bomba.x, bomba.y, 
            this.personaje.x, this.personaje.y
        );
    
        if (distancia < 200 && bomba.body.touching.down) {
            // Calcular dirección hacia el jugador
            const dirX = this.personaje.x - bomba.x;
            bomba.setVelocityX(dirX > 0 ? 150 : -150);
            bomba.setVelocityY(-350); // Salto agresivo
        }
    }

    perderVida(personaje, bomba) {
    if (this.gameOver) return;

    bomba.disableBody(true, true);

    this.vidas--;
    this.mostrarVidas();

    if (this.vidas === 0) {
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
            nuevaBomba.setVelocity(Phaser.Math.Between(-100, 100), 20);
            nuevaBomba.allowGravity = true;
            nuevaBomba.body.setCircle(nuevaBomba.width / 2.5);

            this.time.addEvent({
                delay: Phaser.Math.Between(2000, 4000),
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