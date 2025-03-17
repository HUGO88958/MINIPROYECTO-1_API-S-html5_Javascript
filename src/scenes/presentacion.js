
export default class Presentacion extends Phaser.Scene {
    constructor() {
        super({ key: 'Presentacion' });
    }

    preload() {
        this.load.image('fondoInicio', 'assets/recursos/fondo_inicio.jpg'); // Fondo original
        this.load.image('botonInicio', 'assets/recursos/boton_inicio.png'); 
    }

    create() {
        // Mostrar el fondo de pantalla centrado
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'fondoInicio')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height); // Ajusta al tamaño de la ventana

        // Nombre del juego
        this.add.text(this.scale.width / 2, 100, 'God of:Reach', {
            fontSize: '64px',
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Botón para ir al menú principal 
        const botonInicio = this.add.image(this.scale.width / 2, this.scale.height - 150, 'botonInicio')
            .setOrigin(0.5)
            .setScale(0.5)
            .setInteractive();

        botonInicio.on('pointerdown', () => this.iniciarJuego());
        botonInicio.on('pointerover', () => botonInicio.setScale(0.55));
        botonInicio.on('pointerout', () => botonInicio.setScale(0.5));
    }

    iniciarJuego() {
        this.scene.start('MenuPrincipal');
    }
}
