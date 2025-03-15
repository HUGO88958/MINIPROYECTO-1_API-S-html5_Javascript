export default class Presentacion extends Phaser.Scene {
    constructor() {
        super({ key: 'Presentacion' });
    }

    preload() {
        this.load.image('logo', 'assets/recursos/logo.png');
    }

    create() {
        this.add.image(400, 300, 'logo');
        this.add.text(400, 500, 'Nombre del Juego', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.time.delayedCall(3000, () => {
            this.scene.start('MenuPrincipal');
        });
    }
}