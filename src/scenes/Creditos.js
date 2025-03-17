export default class Creditos extends Phaser.Scene {
    constructor() {
        super({ key: 'Creditos' });
    }

    preload() {
        this.load.image('fondo', 'assets/recursos/fondo_menu.jpeg');
        this.load.image('andres', 'assets/recursos/andres.jpg');
        this.load.image('andre', 'assets/recursos/andre.jpeg');
        this.load.image('hugo', 'assets/recursos/hugo.jpeg');
    }

    create() {
        // Fondo de imagen
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'fondo')
            .setOrigin(0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Título
        this.add.text(this.scale.width / 2, 60, 'CRÉDITOS', {
            fontSize: '42px',
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Mostrar imágenes y nombres
        const integrantes = [
            { key: 'andres', nombre: 'Andrés De Anda' },
            { key: 'andre', nombre: 'Andre Velasquez Acuña' },
            { key: 'hugo', nombre: 'Hugo Vázquez Hernández' }
        ];

        integrantes.forEach((integrante, index) => {
            // Imagen
            this.add.image(this.scale.width / 2 - 120, 140 + index * 120, integrante.key)
                .setDisplaySize(80, 80)
                .setOrigin(0.5);

            // Nombre
            this.add.text(this.scale.width / 2 + 40, 140 + index * 120, integrante.nombre, {
                fontSize: '24px',
                fill: '#FFFFFF',
                fontFamily: 'monospace',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0, 0.5);
        });

        // ✅ Subí "Materia" y "Fecha" hacia arriba unos 40 píxeles
        this.add.text(this.scale.width / 2, 460, 'Materia: Tecnologías Web', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, 490, `Fecha: ${new Date().toLocaleDateString()}`, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Botón para regresar al menú principal
        const botonVolver = this.add.text(this.scale.width / 2, this.scale.height - 40, '↩ Volver al Menú', {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'monospace',
            backgroundColor: '#555',
            padding: { x: 10, y: 5 },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        botonVolver.on('pointerdown', () => this.scene.start('MenuPrincipal'));
        botonVolver.on('pointerover', () => botonVolver.setStyle({ fill: '#ff0', backgroundColor: '#777' }));
        botonVolver.on('pointerout', () => botonVolver.setStyle({ fill: '#fff', backgroundColor: '#555' }));
    }
}
