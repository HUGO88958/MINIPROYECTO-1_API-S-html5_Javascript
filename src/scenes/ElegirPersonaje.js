export default class ElegirPersonaje extends Phaser.Scene {
    constructor() {
        super({ key: 'ElegirPersonaje' });
    }

    preload() {
        // Cargar imágenes de los personajes
        this.load.image('personaje1', 'assets/personajes/personaje1.png');
        this.load.image('personaje2', 'assets/personajes/personaje2.png');
        this.load.image('contenedor', 'assets/recursos/contenedor.png'); // Imagen del contenedor donde se soltarán los personajes
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

        // Zona de selección (donde se deben soltar los personajes)
        const contenedor = this.add.image(400, 500, 'contenedor').setScale(0.6);
        contenedor.setAlpha(0.5); // Para que se vea más como una guía

        // Crear los personajes y hacerlos arrastrables
        const personaje1 = this.add.image(200, 300, 'personaje1').setInteractive();
        const personaje2 = this.add.image(600, 300, 'personaje2').setInteractive();

        personaje1.setScale(0.5);
        personaje2.setScale(0.8);

        // Hacer los personajes arrastrables
        this.input.setDraggable(personaje1);
        this.input.setDraggable(personaje2);

        // Evento al comenzar a arrastrar
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setScale(gameObject.scale * 1.1); // Aumenta el tamaño
        });

        // Evento mientras se arrastra
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // Evento al soltar el personaje
        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setScale(gameObject.scale / 1.1); // Regresa al tamaño normal

            // Verificar si el personaje fue soltado en el contenedor
            if (Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), contenedor.getBounds())) {
                let personajeSeleccionado = gameObject === personaje1 ? 'personaje1' : 'personaje2';
                this.registry.set('personajeSeleccionado', personajeSeleccionado);
                this.scene.start('Nivel1'); // Iniciar el juego con el personaje seleccionado
            } else {
                // Regresar al personaje a su posición original si no se soltó en el contenedor
                if (gameObject === personaje1) {
                    gameObject.setPosition(200, 300);
                } else {
                    gameObject.setPosition(600, 300);
                }
            }
        });

        // Texto debajo de los personajes
        this.add.text(200, 450, 'Personaje 1', {
            fontSize: '24px',
            fontFamily: 'Lucida Console',
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(600, 450, 'Personaje 2', {
            fontSize: '24px',
            fontFamily: 'Lucida Console',
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Texto del contenedor
        this.add.text(400, 550, 'Arrastra aquí para elegir', {
            fontSize: '20px',
            fontFamily: 'Lucida Console',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
    }

    createGradientBackground(color1, color2) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = this.sys.game.config.width;
        canvas.height = this.sys.game.config.height;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, Phaser.Display.Color.IntegerToColor(color1).rgba);
        gradient.addColorStop(1, Phaser.Display.Color.IntegerToColor(color2).rgba);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const texture = this.textures.addCanvas('gradientBackground', canvas);
        this.add.image(0, 0, 'gradientBackground').setOrigin(0, 0);
    }
}