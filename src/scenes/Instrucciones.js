class Instrucciones extends Phaser.Scene {
    constructor() {
        super({ key: 'Instrucciones' }); // Asignar una clave única a la escena
    }

    preload() {
        // Cargar las imágenes necesarias para las instrucciones
        this.load.image('flechas', 'assets/flechas.png'); // Imagen de las flechas
        this.load.image('arriba', 'assets/arriba.png'); // Imagen de la flecha arriba
        this.load.image('botonContinuar', 'assets/botonContinuar.png'); // Botón normal
        this.load.image('botonContinuar2', 'assets/botonContinuar2.png'); // Botón hover
    }

    create() {
        // Fondo de la escena (puedes cambiarlo o quitarlo si no lo necesitas)
        this.add.rectangle(400, 300, 800, 600, 0x87CEEB); // Fondo azul claro

        // Crear un panel rectangular para las instrucciones
        const panel = this.add.rectangle(400, 300, 600, 400, 0xffffff); // Rectángulo blanco
        panel.setStrokeStyle(4, 0x000000); // Borde negro

        // Texto de instrucciones
        this.add.text(400, 150, 'Instrucciones', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        // Texto e imagen para moverse
        this.add.text(400, 220, 'Usa las flechas para moverte', { fontSize: '24px', fill: '#000' }).setOrigin(0.5);
        this.add.image(400, 270, 'flechas').setScale(0.5); // Imagen de las flechas

        // Texto e imagen para saltar
        this.add.text(400, 330, 'Presiona para saltar', { fontSize: '24px', fill: '#000' }).setOrigin(0.5);
        this.add.image(400, 380, 'arriba').setScale(0.5); // Imagen de la flecha arriba

        // Botón de continuar
        const botonContinuar = this.add.image(400, 450, 'botonContinuar').setInteractive(); // Botón normal
        botonContinuar.setScale(0.5);

        // Cambiar el cursor a una manita cuando el ratón esté sobre el botón
        botonContinuar.on('pointerover', () => {
            botonContinuar.setTexture('botonContinuar2'); // Cambiar a la imagen hover
            this.input.setDefaultCursor('pointer'); // Cambiar el cursor a una manita
        });

        // Restaurar la imagen normal y el cursor cuando el ratón salga del botón
        botonContinuar.on('pointerout', () => {
            botonContinuar.setTexture('botonContinuar'); // Cambiar a la imagen normal
            this.input.setDefaultCursor('default'); // Restaurar el cursor predeterminado
        });

        // Evento para cambiar a la escena principal al hacer clic en el botón
        botonContinuar.on('pointerdown', () => {
            this.scene.start('main'); // Cambiar a la escena principal (main.js)
        });
    }
}