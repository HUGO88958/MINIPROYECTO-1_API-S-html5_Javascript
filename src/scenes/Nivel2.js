export default class Nivel2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel2' });
    }

    create(data) {
        // Recuperar la puntuación pasada desde Nivel1
        this.puntuacion = data.score || 0;

        // Mostrar puntuación en pantalla
        this.add.text(16, 16, `Puntuación: ${this.puntuacion}`, {
            fontSize: '32px',
            fill: '#fff',
        });

        // Mostrar mensaje para indicar que es Nivel 2
        this.add.text(400, 300, '¡Bienvenido a Nivel 2!', {
            fontSize: '48px',
            fill: '#fff',
        }).setOrigin(0.5);
    }
}
