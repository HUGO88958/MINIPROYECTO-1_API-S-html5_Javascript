export default class Records extends Phaser.Scene {
    constructor() {
        super({ key: 'Records' });
    }

    create() {
        this.add.text(200, 50, '🏆 Mejores Puntuaciones 🏆', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });

        // ✅ Leer solo el último registro guardado
        const records = JSON.parse(localStorage.getItem('records')) || [];

        let startY = 120;

        // ✅ Encabezado de la tabla
        this.add.text(150, startY, 'Nombre', { fontSize: '24px', fill: '#ffcc00' });
        this.add.text(350, startY, 'Puntuación', { fontSize: '24px', fill: '#ffcc00' });
        this.add.text(500, startY, 'Fecha', { fontSize: '24px', fill: '#ffcc00' });

        startY += 40;

        // ✅ Mostrar el único registro guardado
        if (records.length > 0) {
            const record = records[0];
            this.add.text(150, startY, record.nombre, { fontSize: '20px', fill: '#ffffff' });
            this.add.text(350, startY, record.puntuacion, { fontSize: '20px', fill: '#ffffff' });
            this.add.text(500, startY, record.fecha, { fontSize: '20px', fill: '#ffffff' });
        }

        // ✅ Botón para volver al menú principal
        const backButton = this.add.text(300, 500, '⬅️ Volver al Menú', {
            fontSize: '24px',
            fill: '#ff0000',
            fontStyle: 'bold',
            backgroundColor: '#ffffff'
        })
        .setInteractive({ useHandCursor: true })
        .setPadding(10);

        backButton.on('pointerdown', () => {
            this.scene.start('MenuPrincipal');
        });
    }
}
