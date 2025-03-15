export default class Creditos extends Phaser.Scene {
    constructor() {
        super({ key: 'Creditos' });
    }

    create() {
        // Fondo negro
        this.cameras.main.setBackgroundColor('#000');

        // Título
        this.add.text(this.scale.width / 2, 100, 'CRÉDITOS', {
            fontSize: '50px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Contenido de los créditos
        const textoCreditos = [
            "Concepto, gráficos y programación",
            "Andre, Hugo y Andres",
            "",
            "Presentación y diseño",
            "Andres de Anda",
            "",
            "Música",
            "Andre"
        ];

        // Mostrar créditos línea por línea con separación
        textoCreditos.forEach((linea, index) => {
            this.add.text(this.scale.width / 2, 180 + index * 40, linea, {
                fontSize: '28px',
                fill: '#fff',
                fontFamily: 'Arial',
                align: 'center'
            }).setOrigin(0.5);
        });

        // Botón para regresar al menú principal
        const botonVolver = this.add.text(this.scale.width / 2, this.scale.height - 100, '↩ Volver al Menú', {
            fontSize: '30px',
            fill: '#fff',
            fontFamily: 'Arial',
            backgroundColor: '#555',
            padding: { x: 15, y: 10 },
            borderRadius: 10
        }).setOrigin(0.5).setInteractive();

        // Efectos visuales al pasar el mouse
        botonVolver.on('pointerdown', () => this.scene.start('MenuPrincipal'));
        botonVolver.on('pointerover', () => botonVolver.setStyle({ fill: '#ff0', backgroundColor: '#777' }));
        botonVolver.on('pointerout', () => botonVolver.setStyle({ fill: '#fff', backgroundColor: '#555' }));
    }
}
