export default class AudioManager {
    static instance = null;

    constructor(scene) {
        this.scene = scene;

        this.scene.load.audio('musica', 'assets/sonidos/musica.mp3');
        this.scene.load.image('audioOn', 'assets/recursos/audioOn.png');
        this.scene.load.image('audioOff', 'assets/recursos/audioOff.png');
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

       
       this.audioButton = this.scene.add.image(
       this.scene.scale.width - 15, 
       110, 
       'audioOn'
        )
    .setInteractive()
    .setScale(0.15) 
    .setOrigin(1) 
    .setDepth(10)
    .setScrollFactor(0);


        //Alternar entre audio activado y desactivado
        this.audioButton.on('pointerdown', () => {
            if (this.music.isPlaying) {
                this.music.pause();
                this.audioButton.setTexture('audioOff').setScale(0.15); 
            } else {
                this.music.resume();
                this.audioButton.setTexture('audioOn').setScale(0.15); 
            }
        });
    }
}
