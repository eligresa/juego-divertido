//Este archivo precarga todos los archivos del juego:
import ambiente from "../assets/arcade.mp3"
import click from "../assets/click.mp3"
import robot from "../assets/robot.svg"
import tuerca from "../assets/tuerca.svg"
import cubitohielo from "../assets/cubito-hielo.svg"
import estrella from "../assets/star.png"
import meteorito from "../assets/fireball.svg"
export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload")
    }
    preload() {
        this.load.audio("ambiente", ambiente)
        this.load.audio("click", click)
        this.load.image("cubitohielo", cubitohielo)
        this.load.image("robot", robot)
        this.load.image("tuerca", tuerca)
        this.load.image("star", estrella)
        this.load.image("meteorito",meteorito)
    }
    create() {
        this.scene.start('Portada')
    }
    update() { }
}