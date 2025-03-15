export default class Presentacion extends Phaser.Scene {
    constructor() {
        super({ key: 'Presentacion' });
    }

    preload() {
        this.load.image('logo', 'assets/recursos/fondo_inicio.jpg');
        this.load.image('boton', 'assets/recursos/boton_inicio.png');
    }

    create() {
        // Ajustar el fondo al tamaño de la ventana
        const fondo = this.add.image(this.scale.width / 2, this.scale.height / 2, 'logo');
        fondo.setDisplaySize(this.scale.width, this.scale.height); // Ajustar tamaño

        // Título centrado
        this.add.text(this.scale.width / 2, this.scale.height * 0.7, 'Rostar', {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Crear botón
        const boton = this.add.image(this.scale.width / 2, this.scale.height * 0.8, 'boton')
            .setInteractive()
            .setScale(0.4); // Escalar el botón

        // Evento para cambiar de escena
        boton.on('pointerdown', () => {
            this.scene.start('MenuPrincipal');
        });

        // Efectos al pasar el mouse
        boton.on('pointerover', () => boton.setAlpha(0.7));
        boton.on('pointerout', () => boton.setAlpha(1));
    }
}
