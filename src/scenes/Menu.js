export default class Menu extends Phaser.Scene {
    constructor() {
        super("Menu")
    }
    preload() { }
    create() {
        this.title = this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Escena del Menú", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
        //LAnzamos el evento:
        this.title.setInteractive();
        this.title.on('pointerdown', () => {
            this.scene.start("Pantalla01");
        })
    }
    update() { }
}