export default class CapturarAlias extends Phaser.Scene {
    constructor() {
        super({ key: 'CapturarAlias' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');

        // Título
        this.add.text(this.scale.width / 2, 50, 'Captura tu alias', {
            fontSize: '48px',
            fill: '#ff0',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Mensaje de error (debajo del título)
        this.mensajeError = this.add.text(this.scale.width / 2, 130, '', {
            fontSize: '24px',
            fill: '#ff0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Campo de texto
        this.nombreInput = document.createElement('input');
        this.nombreInput.type = 'text';
        this.nombreInput.placeholder = 'Tu nombre...';
        this.nombreInput.style.width = '250px';
        this.nombreInput.style.height = '40px';
        this.nombreInput.style.fontSize = '24px';
        this.nombreInput.style.padding = '5px';
        this.nombreInput.style.border = '2px solid #fff';
        this.nombreInput.style.backgroundColor = '#333';
        this.nombreInput.style.color = '#fff';
        this.nombreInput.style.outline = 'none';
        this.nombreInput.style.textAlign = 'center';
        this.nombreInput.style.borderRadius = '5px';

        // Posicionar campo de texto en relación al canvas
        const canvasRect = this.game.canvas.getBoundingClientRect();
        this.nombreInput.style.position = 'absolute';
        this.nombreInput.style.top = `${canvasRect.top + this.scale.height / 2 - 120}px`;
        this.nombreInput.style.left = `${canvasRect.left + this.scale.width / 2 - 125}px`;

        document.body.appendChild(this.nombreInput);

        // Botón para continuar
        const botonContinuar = this.add.text(this.scale.width / 2, this.scale.height / 2 - 20, 'Continuar', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#444',
            padding: { x: 15, y: 10 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();

        botonContinuar.on('pointerdown', () => this.validarAlias());
        botonContinuar.on('pointerover', () => botonContinuar.setStyle({ fill: '#ff0' }));
        botonContinuar.on('pointerout', () => botonContinuar.setStyle({ fill: '#fff' }));

        // Botón para volver al menú principal
        const botonVolver = this.add.text(this.scale.width / 2, this.scale.height / 2 + 40, 'Volver al menú', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#444',
            padding: { x: 15, y: 10 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();

        botonVolver.on('pointerdown', () => {
            this.nombreInput.style.display = 'none';
            this.gif.remove();
            this.scene.start('MenuPrincipal');
        });

        botonVolver.on('pointerover', () => botonVolver.setStyle({ fill: '#ff0' }));
        botonVolver.on('pointerout', () => botonVolver.setStyle({ fill: '#fff' }));

        // Mostrar GIF animado
        this.gif = document.createElement('img');
        this.gif.src = 'assets/recursos/fondo_CapturarAlias.gif';
        this.gif.style.width = 'auto';
        this.gif.style.height = '300px';
        this.gif.style.maxWidth = `${this.scale.width - 40}px`;
        this.gif.style.maxHeight = `${this.scale.height - 40}px`;
        this.gif.style.position = 'absolute';
        this.gif.style.top = `${canvasRect.top + this.scale.height / 2 + 50}px`;
        this.gif.style.left = `${canvasRect.left + this.scale.width / 2}px`;
        this.gif.style.transform = 'translateX(-50%)';

        document.body.appendChild(this.gif);

        // Eliminar campo de texto y GIF al cambiar de escena
        this.events.on('shutdown', () => {
            this.nombreInput.remove();
            this.gif.remove();
        });
    }

    validarAlias() {
        const nombre = this.nombreInput.value.trim();

        // ✅ Validación de longitud
        if (nombre.length < 4 || nombre.length > 8) {
            this.mostrarMensaje('El alias debe tener entre 4 y 8 caracteres.');
            return;
        }

        // ✅ Validación de caracteres permitidos
        const regex = /^[a-zA-Z0-9_]+$/;
        if (!regex.test(nombre)) {
            this.mostrarMensaje('Solo se permiten letras, números y "_".');
            return;
        }

        // ✅ Verificar si el alias ya existe en localStorage
        let aliasRegistrados = JSON.parse(localStorage.getItem('alias')) || [];
        if (!aliasRegistrados.includes(nombre)) {
            aliasRegistrados.push(nombre);
            localStorage.setItem('alias', JSON.stringify(aliasRegistrados));
            this.mostrarMensaje('Alias registrado con éxito.', '#0f0');
        } else {
            this.mostrarMensaje('Alias existente, continuando...', '#0f0');
        }

        // ✅ Pasar directamente a la escena de selección de personaje
        setTimeout(() => {
            this.nombreInput.style.display = 'none';
            this.gif.remove();
            this.scene.start('ElegirPersonaje', { nombre }); // 👉 Pasa el alias a ElegirPersonaje.js
        }, 1000);
    }

    mostrarMensaje(mensaje, color = '#ff0000') {
        this.mensajeError.setText(mensaje).setColor(color);

        // Ocultar mensaje después de 2 segundos
        this.time.delayedCall(2000, () => {
            this.mensajeError.setText('');
        });
    }
}
