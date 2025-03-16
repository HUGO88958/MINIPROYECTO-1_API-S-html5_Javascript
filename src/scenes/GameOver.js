export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        // Cargar las imágenes
        this.load.image('background', './assets/fondos/FondoGO.jpg');
        this.load.image('gameOverLogo', './assets/recursos/game-over-logo.png');
        this.load.image('retryButton', './assets/recursos/retry-button.png');
        this.load.audio('game-over-sound', './assets/sonidos/GameOverSong.mp3');
    }

    create() {
        // Reproducir el sonido
        this.sound.play('game-over-sound', { volume: 0.5 });

        // Agregar el fondo
        const background = this.add.image(400, 300, 'background'); // Ajusta el scale según el tamaño de la imagen
        background.setAlpha(0.7); // Hacerlo un poco transparente para darle un efecto oscuro

        // Agregar el logo de "Game Over"
        const gameOverLogo = this.add.image(400, 200, 'gameOverLogo').setScale(0.6);
        gameOverLogo.setAlpha(0); // Inicialmente invisible para animarlo

        // Animación de aparición del logo
        this.tweens.add({
            targets: gameOverLogo,
            alpha: 1, // Hacerlo visible
            duration: 2000, // Duración de la animación
            ease: 'Power2'
        });

        // Agregar el botón de reintento
        const retryButton = this.add.image(400, 400, 'retryButton').setScale(0.5);
        retryButton.setAlpha(0); // Inicialmente invisible para animarlo

        // Hacer el botón interactivo y cambiar el cursor a una "manita"
        retryButton.setInteractive({ useHandCursor: true }); // ¡Aquí está la magia!

        // Animación de aparición del botón
        this.tweens.add({
            targets: retryButton,
            alpha: 1, // Hacerlo visible
            duration: 2000, // Duración de la animación
            ease: 'Power2',
            delay: 1000 // Retraso para que aparezca después del logo
        });

        // Agregar interacción al botón
        retryButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // Cambia 'GameScene' por el nombre de tu escena principal
        });

        // Efecto de sonido (opcional)
        this.sound.play('game-over-sound', { volume: 0.5 }); // Asegúrate de cargar el sonido en preload
    }
}