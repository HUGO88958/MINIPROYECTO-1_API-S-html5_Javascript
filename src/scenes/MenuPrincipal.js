export default class MenuPrincipal extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuPrincipal' });
    }

    preload() {
        this.load.image('fondo', 'assets/recursos/fondo_menu.jpeg');
    }

    create() {
        // Fondo de imagen
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'fondo')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Título
        this.add.text(this.scale.width / 2, 100, 'Menú Principal', {
            fontSize: '48px',
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Botón para jugar
        const botonJugar = this.add.text(this.scale.width / 2, 200, 'Jugar', {
            fontSize: '32px',
            fill: '#FFFFFF',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        botonJugar.on('pointerdown', () => this.scene.start('CapturarAlias'));
        botonJugar.on('pointerover', () => botonJugar.setStyle({ fill: '#ff0' }));
        botonJugar.on('pointerout', () => botonJugar.setStyle({ fill: '#fff' }));

        // Botón para ir a los récords
        const botonRecords = this.add.text(this.scale.width / 2, 270, 'Records', {
        fontSize: '32px',
        fill: '#FFFFFF',
        backgroundColor: '#444',
        padding: { x: 10, y: 5 },
        stroke: '#000000',
        strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

       botonRecords.on('pointerdown', () => this.scene.start('Records'));
       botonRecords.on('pointerover', () => botonRecords.setStyle({ fill: '#ff0' }));
       botonRecords.on('pointerout', () => botonRecords.setStyle({ fill: '#fff' }));



       // Botón para ir a las instrucciones
       const botonInstrucciones = this.add.text(this.scale.width / 2, 340, 'Instrucciones', {
       fontSize: '32px',
       fill: '#FFFFFF',
       backgroundColor: '#444',
       padding: { x: 10, y: 5 },
       stroke: '#000000',
       strokeThickness: 2
       }).setOrigin(0.5).setInteractive();

       botonInstrucciones.on('pointerdown', () => this.scene.start('Instrucciones'));
       botonInstrucciones.on('pointerover', () => botonInstrucciones.setStyle({ fill: '#ff0' }));
       botonInstrucciones.on('pointerout', () => botonInstrucciones.setStyle({ fill: '#fff' }));


        // Botón para ir a los créditos
        const botonCreditos = this.add.text(this.scale.width / 2, 410, 'Créditos', {
            fontSize: '32px',
            fill: '#FFFFFF',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        botonCreditos.on('pointerdown', () => this.scene.start('Creditos'));
        botonCreditos.on('pointerover', () => botonCreditos.setStyle({ fill: '#ff0' }));
        botonCreditos.on('pointerout', () => botonCreditos.setStyle({ fill: '#fff' }));

        // ✅ Botón para regresar a la página de inicio
        const botonInicio = this.add.text(this.scale.width / 2, 480, '↩ Volver a Inicio', {
            fontSize: '32px',
            fill: '#FFFFFF',
            backgroundColor: '#555',
            padding: { x: 15, y: 10 },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        botonInicio.on('pointerdown', () => this.scene.start('Presentacion'));
        botonInicio.on('pointerover', () => botonInicio.setStyle({ fill: '#ff0', backgroundColor: '#777' }));
        botonInicio.on('pointerout', () => botonInicio.setStyle({ fill: '#fff', backgroundColor: '#555' }));
    }
}
