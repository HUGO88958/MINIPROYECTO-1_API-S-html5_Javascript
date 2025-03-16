export default class Instrucciones extends Phaser.Scene {
    constructor() {
        super({ key: 'Instrucciones' });
    }

    preload() {
        // Cargar las imágenes
        this.load.image('flechas', './assets/recursos/flechas.png');
        this.load.image('arriba', './assets/recursos/arriba.png');
        this.load.image('regresarButton', './assets/recursos/regresar-button.png');
        this.load.image('FondoI', './assets/fondos/FondoI.png');
    }

    create() {
        // Agregar el fondo
        const fondo = this.add.image(400, 300, 'FondoI').setScale(1.5);

        // Texto "Instrucciones" con fuente monospace
        this.add.text(400, 50, 'Instrucciones', {
            fontSize: '48px',
            fill: '#FFFFFF',
            fontFamily: 'monospace', // Fuente monospace
            fontStyle: 'bold',
            stroke: '#000000', // Borde negro
            strokeThickness: 3 // Grosor del borde
        }).setOrigin(0.5);

        // Texto "Usa las flechas para moverte" con fuente monospace
        this.add.text(400, 150, 'Usa las flechas para moverte', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'monospace', // Fuente monospace
            stroke: '#000000', // Borde negro
            strokeThickness: 2 // Grosor del borde
        }).setOrigin(0.5);

        // Imagen "flechas.png" centrada
        const flechasImage = this.add.image(400, 250, 'flechas').setScale(0.5);

        // Texto "Usa la flecha de arriba para saltar" con fuente monospace
        this.add.text(400, 350, 'Usa la flecha de arriba para saltar', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'monospace', // Fuente monospace
            stroke: '#000000', // Borde negro
            strokeThickness: 2 // Grosor del borde
        }).setOrigin(0.5);

        // Imagen "arriba.png" centrada
        const arribaImage = this.add.image(400, 450, 'arriba').setScale(0.5);

        // Botón "Regresar" en la esquina inferior derecha
        const regresarButton = this.add.image(750, 550, 'regresarButton')
            .setInteractive({ useHandCursor: true }) // Hacer el botón interactivo y cambiar el cursor
            .setScale(0.5); // Ajustar el tamaño del botón

        // Agregar interacción al botón
        regresarButton.on('pointerdown', () => {
            this.scene.start('MenuPrincipal'); // Cambiar a la escena del menú principal
        });
    }
}