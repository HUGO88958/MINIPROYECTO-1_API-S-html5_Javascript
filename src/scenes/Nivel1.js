export default class Nivel1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel1' });
        this.puedeSaltar = true; // Bandera para controlar el sonido de salto
    }

    // Precarga de recursos
    preload() {
        this.load.image('fondo1', 'assets/fondos/fondo1.png');
        this.load.image('plataforma', 'assets/recursos/plataforma.png');
        this.load.image('estrella', 'assets/recursos/star.png');
        this.load.image('bomba', 'assets/recursos/enemigo.png');
        this.load.image('iconoPausa', 'assets/recursos/pausa.png');
        this.load.image('iconoReanudar', 'assets/recursos/reanudar.png');
       
        this.load.spritesheet('spritep1', 'assets/personajes/spritep1.png', {
            frameWidth: 100,
            frameHeight: 80,
        });
        this.load.spritesheet('spritep2', 'assets/personajes/spritep2.png', {
            frameWidth: 137,
            frameHeight: 144,
        });

        // Cargar sonidos
        this.load.audio('sonidoRecolectar', 'assets/sonidos/recolectar.mp3');
        this.load.audio('sonidoSalto', 'assets/sonidos/salto.mp3'); 
        this.load.audio('sonidoMorir', 'assets/sonidos/muerte.mp3');
        this.load.audio('sonidoCoalicion', 'assets/sonidos/coalicion.mp3');
    }

    // Creación de elementos
    create() {
        const seleccion = this.registry.get('personajeSeleccionado') || 'personaje1';
        this.spritePersonaje = seleccion === 'personaje1' ? 'spritep1' : 'spritep2';
        
        this.vidas = 3;
        this.puntuacion = 0;
        this.gameOver = false;

        const fondo = this.add.image(400, 300, 'fondo1');
        fondo.setScale(this.sys.game.config.width / fondo.width, this.sys.game.config.height / fondo.height);

        this.plataformas = this.physics.add.staticGroup();
        this.plataformas.create(700, 600, 'plataforma').setScale(1).refreshBody();
        this.plataformas.create(500, 600, 'plataforma').setScale(1).refreshBody();
        this.plataformas.create(300, 600, 'plataforma').setScale(1).refreshBody();
        this.plataformas.create(100, 600, 'plataforma').setScale(1).refreshBody();

        this.plataformas.create(300, 400, 'plataforma');
        this.plataformas.create(50, 200, 'plataforma');
        this.plataformas.create(750, 220, 'plataforma');

        this.plataformas.children.iterate((plataforma) => {
            plataforma.body.setSize(plataforma.width * 0.8, plataforma.height * 0.4);
        });

        this.personaje = this.physics.add.sprite(500, 450, this.spritePersonaje);
        this.personaje.setBounce(0.2);
        this.personaje.setCollideWorldBounds(true);

        if (this.personaje === 'spritep1') {
            this.personaje.body.setSize(40, 90); 
            this.personaje.body.setOffset(60, 40);
        } else {
            this.personaje.body.setSize(30, 40);
            this.personaje.body.setOffset(30, 40);
        }
        
        this.crearAnimaciones();
        this.physics.add.collider(this.personaje, this.plataformas);

        this.recursos = this.physics.add.group({
            key: 'estrella',
            repeat: 11,
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

        this.physics.add.collider(this.recursos, this.plataformas);

        this.bombas = this.physics.add.group({
            key: 'bomba',
            repeat: 0,
            setXY: {
                x: 12,
                y: 0,
                stepX: 70
            }
        });

        this.physics.add.collider(this.bombas, this.plataformas);
        this.physics.add.collider(this.personaje, this.bombas, this.perderVida, null, this);
        this.physics.add.overlap(this.personaje, this.recursos, this.recolectarRecurso, null, this);

        this.mostrarVidas();
        this.mostrarPuntuacion();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.crearBotonPausa();
        this.crearBotonSalir();

    }
    
    crearAnimaciones() {
        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers(this.spritePersonaje, { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'quieto',
            frames: [{ key: this.spritePersonaje, frame: 5 }],
            frameRate: 20
        });

        
    }

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
            if (this.puedeSaltar) {
                this.personaje.setVelocityY(-360);
                this.sound.play('sonidoSalto', { volume: 0.5 }); 
                this.puedeSaltar = false; 
            }
        } else if (!this.cursors.up.isDown && this.personaje.body.touching.down) {
            this.puedeSaltar = true; 
        }

        this.bombas.children.iterate((bomba) => {
            if (!bomba.body.allowGravity) {
                bomba.allowGravity = true;
            }
            bomba.body.gravity.y = 1000;
            bomba.setBounce(1.0);

            if (bomba.body.touching.down) {
                if (Math.abs(bomba.body.velocity.x) < 50) {
                    bomba.setVelocityX(Phaser.Math.Between(-200, 200));
                }
            }

            if (bomba.y > this.sys.game.config.height + 50 || 
                bomba.x < -50 || 
                bomba.x > this.sys.game.config.width + 50) {
                bomba.setPosition(Phaser.Math.Between(0, this.sys.game.config.width), 0);
                bomba.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        });
    }

    crearBotonSalir() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        const buttonWidth = 120; 
        const buttonHeight = 50; 
        const margin = 10;
        const salirButton = this.add.graphics();
        salirButton
            .fillStyle(0x000000, 0.4) 
            .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 15) 
            .setDepth(1);

        const salirTexto = this.add.text(buttonWidth / 2, buttonHeight / 2, 'Salir', {
            fontSize: '18px',
            color: '#ffffff',
            fontFamily: 'Verdana', 
            fontStyle: 'bold',
            align: 'center',
        })
            .setOrigin(0.5, 0.5) 
            .setDepth(2);
    
        // contenedordel boton
        const container = this.add.container(width - buttonWidth - margin, height - buttonHeight - margin, [salirButton, salirTexto]);
        container.setSize(buttonWidth, buttonHeight); 
        container.setInteractive({ useHandCursor: true }); 
    
        // Evento al hacer clic en el botón
        container.on('pointerdown', () => {
            this.scene.start('MenuPrincipal'); // Cambiar a la escena del menú principal
        });
        
        container.on('pointerover', () => {
            salirButton.clear()
                .fillStyle(0xffffff, 0.3) 
                .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 15);
        });
     
        container.on('pointerout', () => {
            salirButton.clear()
                .fillStyle(0x000000, 0.4) 
                .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 15);
        });
    }

    crearBotonPausa() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        const buttonWidth = 32; 
        const buttonHeight = 32; 
        const margin = 10;
    
        const pausaButton = this.add.graphics();
        pausaButton
            .fillStyle(0x000000, 0.4) 
            .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 15) 
            .setDepth(1);
    
        //contenedor del botón
        const container = this.add.container(margin, height - buttonHeight - margin, [pausaButton]);
        container.setSize(buttonWidth, buttonHeight); 
        container.setInteractive({ useHandCursor: true });
    
        const iconoPausa = this.add.image(buttonWidth / 2, buttonHeight / 2, 'iconoPausa').setScale(0.5).setDepth(2);
        const iconoReanudar = this.add.image(buttonWidth / 2, buttonHeight / 2, 'iconoReanudar').setScale(0.5).setDepth(2).setVisible(false);
    
        //íconos al contenedor
        container.add(iconoPausa);
        container.add(iconoReanudar);
    
        // Variable estado del juego
        let enPausa = false;
    
        // Creamos una escena superpuesta para manejar la pausa
        const escenaPausa = this.scene.get('EscenaPausa') || this.scene.add('EscenaPausa', {
            create: function() {
                // botón de reanudar 
                const botonReanudar = this.add.graphics();
                botonReanudar
                    .fillStyle(0x000000, 0.4)
                    .fillRoundedRect(margin, height - buttonHeight - margin, buttonWidth, buttonHeight, 15)
                    .setDepth(1);
                
                const iconoReanudarPausa = this.add.image(
                    margin + buttonWidth / 2, 
                    height - buttonHeight - margin + buttonHeight / 2, 
                    'iconoReanudar'
                ).setScale(0.5).setDepth(2);
                
                const contenedorReanudar = this.add.container(0, 0, [botonReanudar, iconoReanudarPausa]);
                contenedorReanudar.setSize(buttonWidth, buttonHeight);
                contenedorReanudar.setPosition(margin, height - buttonHeight - margin);
                contenedorReanudar.setInteractive({ useHandCursor: true });
                
                // Efectos visuales
                contenedorReanudar.on('pointerover', () => {
                    botonReanudar.clear()
                        .fillStyle(0xffffff, 0.3)
                        .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 15);
                });
                
                contenedorReanudar.on('pointerout', () => {
                    botonReanudar.clear()
                        .fillStyle(0x000000, 0.4)
                        .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 15);
                });
                
                // Evento de clic para reanudar
                contenedorReanudar.on('pointerdown', () => {
                    // Reanudar la escena principal
                    this.scene.resume('Nivel1');
                    // Ocultar esta escena
                    this.scene.setVisible(false);
                    this.scene.stop();
                });
            }
        }, false);
        
        // Escena de pausa inicialmente oculta
        if (this.scene.get('EscenaPausa')) {
            this.scene.get('EscenaPausa').scene.setVisible(false);
            this.scene.get('EscenaPausa').scene.stop();
        }
    
        // Evento de pausa
        container.on('pointerdown', () => {
            if (!enPausa) {
                // Pausar la escena principal
                this.scene.pause();
                // Mostrar y activar la escena de pausa
                escenaPausa.scene.setVisible(true);
                escenaPausa.scene.start();
                // Cambiar íconos
                iconoPausa.setVisible(false);
                iconoReanudar.setVisible(true);
                enPausa = true;
            } else {
                // Si está en pausa intentar reanudar directamente
                this.scene.resume();
                escenaPausa.scene.stop();
                iconoPausa.setVisible(true);
                iconoReanudar.setVisible(false);
                enPausa = false;
            }
        });
    
        // Escuchar eventos de cambio de estado de la escena
        this.events.on('resume', () => {
            iconoPausa.setVisible(true);
            iconoReanudar.setVisible(false);
            enPausa = false;
        });
    
        // Efectos
        container.on('pointerover', () => {
            pausaButton.clear()
                .fillStyle(0xffffff, 0.3)
                .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 15);
        });
        container.on('pointerout', () => {
            pausaButton.clear()
                .fillStyle(0x000000, 0.4) 
                .fillRoundedRect(0, 0, buttonWidth, buttonHeight, 15);
        });
    }
    
    
    

    recolectarRecurso(personaje, recurso) {
        recurso.disableBody(true, true);
        this.sound.play('sonidoRecolectar', { volume: 0.5 });
        this.puntuacion += 10;
        this.mostrarPuntuacion();

        if (this.recursos.countActive(true) === 0) {
            console.log('Transición a Nivel2 iniciada');
            this.time.delayedCall(1000, () => {
                this.scene.start('Nivel2', {
                    score: this.puntuacion, 
                    personajeSeleccionado: this.registry.get('personajeSeleccionado')
                });
            });
        }
    }  

    generarBomba(esBombaFinal = false) {
        const x = (this.personaje.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomba = this.bombas.create(x, 16, 'bomba');
        bomba.setBounce(0.8);
        bomba.setCollideWorldBounds(true);
        const velocidadBase = esBombaFinal ? 250 : 150;
        bomba.setVelocity(Phaser.Math.Between(-velocidadBase, velocidadBase), 20);
        bomba.allowGravity = true;
        bomba.body.setCircle(bomba.width / 2.5);
        this.time.addEvent({
            delay: Phaser.Math.Between(2000, 4000),
            callback: () => this.saltoBomba(bomba),
            callbackScope: this,
            loop: true
        });
        return bomba;
    }

    saltoBomba(bomba) {
        if (bomba.body.touching.down) {
            bomba.setVelocityY(-600);
            bomba.setVelocityX(Phaser.Math.Between(-200, 200));
        }
        const distancia = Phaser.Math.Distance.Between(bomba.x, bomba.y, this.personaje.x, this.personaje.y);
        if (distancia < 200 && bomba.body.touching.down) {
            const dirX = this.personaje.x - bomba.x;
            bomba.setVelocityX(dirX > 0 ? 150 : -150);
            bomba.setVelocityY(-350);
        }
    }

    perderVida(personaje, bomba) {
        if (this.gameOver) return;
        this.sound.play('sonidoCoalicion', { volume: 0.5 });

        bomba.disableBody(true, true);
        this.vidas--;
        this.mostrarVidas();

        if (this.vidas === 0) {
            this.sound.play('sonidoMorir', { volume: 0.5 });
            this.gameOver = true;
            this.physics.pause();
            this.personaje.setTint(0xff0000);
            this.personaje.anims.play('quieto');
            this.time.delayedCall(1000, () => {
                this.scene.start('GameOver', { 
                    score: this.puntuacion,
                    personajeSeleccionado: this.registry.get('personajeSeleccionado') 
                });
            });
        } else {
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

    mostrarVidas() {
        if (this.textoVidas) {
            this.textoVidas.destroy();
        }
        this.textoVidas = this.add.text(16, 16, `Vidas: ${this.vidas}`, {
            fontSize: '32px',
            fill: '#fff'
        });
    }

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