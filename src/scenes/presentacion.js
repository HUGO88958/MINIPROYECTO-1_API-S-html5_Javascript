export default class Presentacion extends Phaser.Scene {
    constructor() {
        super({ key: 'Presentacion' });
    }

    preload() {
        // Cargar el logo desde la carpeta assets/recursos/
        this.load.image('logo', 'assets/recursos/logo.jpg');
    }

    create() {
        // Mostrar el logo en la pantalla
        this.add.image(400, 300, 'logo');

        // Mostrar el nombre del juego
        this.add.text(400, 500, 'Nombre del Juego', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Cambiar a la escena del Menú Principal después de 3 segundos
        this.time.delayedCall(3000, () => {
            this.scene.start('MenuPrincipal');
        });
    }
}