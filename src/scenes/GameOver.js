export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        this.load.image('background', './assets/fondos/FondoGO.jpg');
        this.load.image('gameOverLogo', './assets/recursos/game-over-logo.png');
        this.load.image('retryButton', './assets/recursos/retry-button.png');
        this.load.audio('game-over-sound', './assets/sonidos/GameOverSong.mp3');
    }

    create(data) {
        //  Reproducir sonido de Game Over
        this.sound.play('game-over-sound', { volume: 0.5 });

        //  Mostrar fondo
        const background = this.add.image(400, 300, 'background');
        background.setAlpha(0.7);

        //  Mostrar logo de "Game Over"
        const gameOverLogo = this.add.image(400, 200, 'gameOverLogo').setScale(0.6);
        gameOverLogo.setAlpha(0);

        // Animación de aparición del logo
        this.tweens.add({
            targets: gameOverLogo,
            alpha: 1,
            duration: 2000,
            ease: 'Power2'
        });

        //  Mostrar botón de reintentar
        const retryButton = this.add.image(400, 400, 'retryButton').setScale(0.5);
        retryButton.setAlpha(0);
        retryButton.setInteractive({ useHandCursor: true });

        // Animación de aparición del botón
        this.tweens.add({
            targets: retryButton,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            delay: 1000
        });

        //  **GUARDAR REGISTRO AL PERDER**
        this.guardarRegistro(data.puntuacion);

        //  Acción al presionar el botón de reintentar
        retryButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('MenuPrincipal');
        });
    }

    // Guardar registro en LocalStorage
    guardarRegistro(puntuacion) {
        const alias = localStorage.getItem('alias') || 'Jugador Desconocido'; // Alias registrado
        const fecha = new Date().toLocaleString(); // Fecha y hora actual

        // Leer registros existentes o crear un array vacío
        const records = JSON.parse(localStorage.getItem('records')) || [];

        // Crear nuevo registro
        const nuevoRegistro = {
            nombre: alias,
            puntuacion: puntuacion,
            fecha: fecha
        };

        // Añadir registro y ordenar por puntuación (de mayor a menor)
        records.push(nuevoRegistro);
        records.sort((a, b) => b.puntuacion - a.puntuacion);

        // Guardar registros actualizados en LocalStorage
        localStorage.setItem('records', JSON.stringify(records));
    }
}