// Felicitaciones.js

export default class Felicitaciones extends Phaser.Scene {
    constructor() {
        super({ key: 'Felicitaciones' });
    }

    // Cargar recursos adicionales si es necesario
    preload() {
        // Cargar imagen de trofeo o cualquier otro recurso que quieras mostrar
        this.load.image('trofeo', 'assets/recursos/trophy.png');
        this.load.image('estrella', 'assets/recursos/star.png');
    }

    create() {
        // Configurar fondo
        this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x1a1a1a).setOrigin(0, 0);

        // Mostrar mensaje de felicitaciones
        this.add.text(this.sys.game.config.width / 2, 200, '¡Felicitaciones!', {
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#ffd700',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Mostrar trofeo
        const trofeo = this.add.image(this.sys.game.config.width / 2, 300, 'trofeo');
        trofeo.setScale(0.5);

        // Mostrar puntuación final
        this.add.text(this.sys.game.config.width / 2, 400, 'Puntuación: ' + this.addParameters.score, {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Efecto de partículas
        this.addParticles();

        // Botón para volver al menú principal
        this.add.text(this.sys.game.config.width / 2, 500, 'Volver al Menú', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('MainMenu');
        })
        .on('pointerover', () => {
            this.scaleX = 1.1;
            this.scaleY = 1.1;
        })
        .on('pointerout', () => {
            this.scaleX = 1;
            this.scaleY = 1;
        });

        // Añadir efecto de brillo al texto
        this.add.text(this.sys.game.config.width / 2, 250, '¡Has completado el juego!', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Animación de float para el mensaje de felicitaciones
        this.add.tween({
            targets: this.children.getByName('text'),
            y: {
                from: 200,
                to: 180,
                duration: 1000,
                ease: 'Power2',
                yoyo: true,
                loop: -1
            }
        });
    }

    // Método para crear efecto de partículas
    addParticles() {
        const particles = this.add.particles('estrella');

        this.physics.add.particleSystem({
            key: particles,
            additional: [
                {
                    x: this.sys.game.config.width / 2,
                    y: 300,
                    quantity: 10,
                    frequency: 100,
                    preStart: true,
                    data: {
                        texture: 'estrella',
                        move: true,
                        gravityX: 0,
                        gravityY: 0,
                        lifespan: 1000,
                        speed: 2,
                        scale: 0.5,
                        bounce: 0.5,
                        alpha: 0.5
                    }
                }
            ]
        });
    }

    update(time, delta) {
    }
}

this.scene.start('GameOver', { alias: this.alias, puntaje: this.puntaje });
