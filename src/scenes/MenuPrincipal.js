
export default class MenuPrincipal extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuPrincipal' });
    }

    create() {
        this.add.text(this.scale.width / 2, 100, 'Menu Principal', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Botones del menú
        this.crearBoton('Jugar', this.scale.width / 2, 200, () => this.scene.start('Nivel1'));
        this.crearBoton('Records', this.scale.width / 2, 300, () => console.log('Mostrar records'));
        this.crearBoton('Instrucciones', this.scale.width / 2, 400, () => console.log('Mostrar instrucciones'));
        this.crearBoton('Créditos', this.scale.width / 2, 500, () => this.scene.start('Creditos'));
    }

    crearBoton(texto, x, y, callback) {
        const boton = this.add.text(x, y, texto, {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        boton.on('pointerdown', callback);
        boton.on('pointerover', () => boton.setStyle({ fill: '#ff0' }));
        boton.on('pointerout', () => boton.setStyle({ fill: '#fff' }));
    }
}


