export default class PresentationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PresentationScene' });
    }

    preload() {
        // Cargar assets aquí
       this.load.image('logo', 'assets/logo.png');
    }

    create() {
        // Configurar la escena aquí
        this.add.text(100, 100, 'presentación', { fontSize: '32px', fill: '#fff' });
        this.add.image(400, 300, 'logo'); // Ejemplo de mostrar una imagen
    }
}