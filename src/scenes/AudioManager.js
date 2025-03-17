export default class AudioManager {
    static instance = null;

    constructor(scene) {
        this.scene = scene;
    }

    static getInstance(scene) {
        if (!this.instance) {
            this.instance = new AudioManager(scene);
        }
        return this.instance;
    }

    create() {
        if (!this.music) {
            this.music = this.scene.sound.add('musica', { loop: true });
            this.music.play();
        }

        // ✅ Crear botón de audio en la parte inferior derecha
        this.audioButton = this.scene.add.image(
            this.scene.scale.width - 15,
            this.scene.scale.height - 15,
            'audioOn'
        )
            .setInteractive()
            .setScale(0.2)
            .setOrigin(1)
            .setDepth(10)
            .setScrollFactor(0);

        // ✅ Alternar entre audio activado y desactivado
        this.audioButton.on('pointerdown', () => {
            if (this.music.isPlaying) {
                this.music.pause();
                this.audioButton.setTexture('audioOff').setScale(0.2);
            } else {
                this.music.resume();
                this.audioButton.setTexture('audioOn').setScale(0.2);
            }
        });
    }
}
