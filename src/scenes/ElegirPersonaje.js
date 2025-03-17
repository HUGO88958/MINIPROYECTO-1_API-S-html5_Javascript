export default class ElegirPersonaje extends Phaser.Scene {
    constructor() {
        super({ key: 'ElegirPersonaje' });
    }

    preload() {
        this.load.image('personaje1', 'assets/personajes/personaje1.png');
        this.load.image('personaje2', 'assets/personajes/personaje2.png');
        this.load.image('contenedor', 'assets/recursos/contenedor.png');
    }

    create() {
        this.createGradientBackground(0xFF0000, 0x000000);

        this.add.text(400, 50, 'Elige tu personaje', {
            fontFamily: 'Impact',
            fontSize: '36px',
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        const contenedor = this.add.image(400, 450, 'contenedor').setScale(1);
        contenedor.setAlpha(0.5);

        const personaje1 = this.add.image(250, 200, 'personaje1').setInteractive().setScale(0.4);
        const personaje2 = this.add.image(550, 200, 'personaje2').setInteractive().setScale(0.6);

        this.input.setDraggable(personaje1);
        this.input.setDraggable(personaje2);

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setScale(gameObject.scale * 1.1);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setScale(gameObject.scale / 1.1);
            
            if (Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), contenedor.getBounds())) {
                let personajeSeleccionado = gameObject === personaje1 ? 'personaje1' : 'personaje2';
                this.registry.set('personajeSeleccionado', personajeSeleccionado);
                this.scene.start('Nivel1');
            } else {
                gameObject.setPosition(gameObject === personaje1 ? 250 : 550, 200);
            }
        });

        this.add.text(250, 340, 'Personaje 1', {
            fontSize: '18px',
            fontFamily: 'Lucida Console',
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(550, 340, 'Personaje 2', {
            fontSize: '18px',
            fontFamily: 'Lucida Console',
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(400, 540, 'Entra para empezar a jugar', {
            fontSize: '16px',
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