export default class ElegirPersonaje extends Phaser.Scene {
    constructor() {
        super({ key: 'ElegirPersonaje' });
    }

    preload() {
        // Cargar imágenes de los personajes
        this.load.image('personaje1', 'assets/personajes/personaje1.png');
        this.load.image('personaje2', 'assets/personajes/personaje2.png');
    }

    create() {
        // Crear un fondo degradado entre rojo y negro
        this.createGradientBackground(0xFF0000, 0x000000);

        // Título de la escena
        this.add.text(400, 100, 'Elige tu personaje', {
            fontFamily: 'Impact',
            fontSize: '48px',
            fill: '#FFD700', // Color dorado
            stroke: '#000000', // Borde negro
            strokeThickness: 4 // Grosor del borde
        }).setOrigin(0.5);

        // Mostrar personaje 1
        const personaje1 = this.add.image(200, 300, 'personaje1').setInteractive();
        personaje1.setScale(0.5); // Reducir el tamaño al 50%

        // Animación al pasar el cursor sobre el personaje 1
        personaje1.on('pointerover', () => {
            this.tweens.add({
                targets: personaje1,
                scale: 0.6, // Escalar un poco más grande
                duration: 200, // Duración de la animación en milisegundos
                ease: 'Power2'
            });
        });

        // Animación al quitar el cursor del personaje 1
        personaje1.on('pointerout', () => {
            this.tweens.add({
                targets: personaje1,
                scale: 0.5, // Volver al tamaño original
                duration: 200,
                ease: 'Power2'
            });
        });

        // Selección del personaje 1
        personaje1.on('pointerdown', () => {
            this.registry.set('personajeSeleccionado', 'personaje1'); // Guardar selección
            this.scene.start('Nivel1'); // Pasar a Nivel 1
        });

        // Mostrar personaje 2
        const personaje2 = this.add.image(600, 300, 'personaje2').setInteractive();
        personaje2.setScale(0.8); // Reducir el tamaño al 80%

        // Animación al pasar el cursor sobre el personaje 2
        personaje2.on('pointerover', () => {
            this.tweens.add({
                targets: personaje2,
                scale: 0.9, // Escalar un poco más grande
                duration: 200,
                ease: 'Power2'
            });
        });

        // Animación al quitar el cursor del personaje 2
        personaje2.on('pointerout', () => {
            this.tweens.add({
                targets: personaje2,
                scale: 0.8, // Volver al tamaño original
                duration: 200,
                ease: 'Power2'
            });
        });

        // Selección del personaje 2
        personaje2.on('pointerdown', () => {
            this.registry.set('personajeSeleccionado', 'personaje2'); // Guardar selección
            this.scene.start('Nivel1'); // Pasar a Nivel 1
        });

        // Texto debajo de los personajes
        this.add.text(200, 450, 'Personaje 1', {
            fontSize: '24px',
            fontFamily: 'Lucida Console',
            fill: '#FFD700', // Color dorado
            stroke: '#000000', // Borde negro
            strokeThickness: 2 // Grosor del borde
        }).setOrigin(0.5);

        this.add.text(600, 450, 'Personaje 2', {
            fontSize: '24px',
            fontFamily: 'Lucida Console',
            fill: '#FFD700', // Color dorado
            stroke: '#000000', // Borde negro
            strokeThickness: 2 // Grosor del borde
        }).setOrigin(0.5);
    }

    createGradientBackground(color1, color2) {
        // Crear un canvas temporal
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Configurar el tamaño del canvas igual al tamaño de la escena
        canvas.width = this.sys.game.config.width;
        canvas.height = this.sys.game.config.height;

        // Crear el degradado
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, Phaser.Display.Color.IntegerToColor(color1).rgba);
        gradient.addColorStop(1, Phaser.Display.Color.IntegerToColor(color2).rgba);

        // Rellenar el canvas con el degradado
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Convertir el canvas en una textura de Phaser
        const texture = this.textures.addCanvas('gradientBackground', canvas);

        // Agregar la textura como fondo
        this.add.image(0, 0, 'gradientBackground').setOrigin(0, 0);
    }
}