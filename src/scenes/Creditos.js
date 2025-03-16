export default class Creditos extends Phaser.Scene {
    constructor() {
        super({ key: 'Creditos' });
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
        this.add.text(this.scale.width / 2, 80, 'CRÉDITOS', {
            fontSize: '48px', // Ajustado para mantener proporción con la nueva ventana
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Contenido de los créditos
        const textoCreditos = [
            "Concepto, gráficos y programación",
            "Hugo Vázquez Hernández, Andre Velasquez Acuña y Andrés De Anda",
            "",
            "Presentación y diseño",
            "Andrés De Anda",
            "",
            "Niveles",
            "Andre Velasquez Acuña y Hugo Vázquez Hernández ",
            "",
            "Música",
            "Andre Velasquez Acuña"
        ];

        textoCreditos.forEach((linea, index) => {
            this.add.text(this.scale.width / 2, 150 + index * 30, linea, { // Espaciado ajustado
                fontSize: '24px', // Tamaño de texto ajustado para mantener proporción
                fill: '#FFFFFF',
                fontFamily: 'monospace',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);
        });

        // Botón para regresar al menú principal
        const botonVolver = this.add.text(this.scale.width / 2, this.scale.height - 80, '↩ Volver al Menú', {
            fontSize: '28px', // Tamaño ajustado para mantener proporción
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            backgroundColor: '#555',
            padding: { x: 12, y: 8 },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        botonVolver.on('pointerdown', () => this.scene.start('MenuPrincipal'));
        botonVolver.on('pointerover', () => botonVolver.setStyle({ fill: '#ff0', backgroundColor: '#777' }));
        botonVolver.on('pointerout', () => botonVolver.setStyle({ fill: '#fff', backgroundColor: '#555' }));
    }
}
