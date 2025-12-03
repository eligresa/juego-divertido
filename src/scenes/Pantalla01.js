export default class Pantalla01 extends Phaser.Scene {
    constructor() {
        super("Pantalla01")
    }
    preload() { }
    create() {
        this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Esta es la primera pantalla", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
    }
    update() { }
}