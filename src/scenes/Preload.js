import ambiente from "../assets/arcade.mp3"
import click from "../assets/click.mp3"
export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload")
    }
    preload() {
        this.load.audio("ambiente", ambiente)
        this.load.audio("click", click)
    }
    create() {
        this.scene.start('Portada')
    }
    update() { }
}