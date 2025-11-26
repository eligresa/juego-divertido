
export default class Portada extends Phaser.Scene {
    constructor() {
        super("Portada")
    }
    preload() {

    }
    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        // Fondo estrellado:
        this.estrellas = []
        for (let i = 0; i < 50; i++) {
            // Las posicionamos aleatoriamente:
            const x = Phaser.Math.Between(0, gameWidth);
            const y = Phaser.Math.Between(0, gameHeight);
            // Cargamos la imagen de la estrella:
            let estrella = this.add.image(x, y, "estrella")
            // Darles tamaño aleatoriamente.
            const scale = Phaser.Math.FloatBetween(0.2, 1);
            estrella.setScale(scale)
            // Les aplicamos velocidad aleatoria que se aplicará en el update:
            estrella.velocidad = Phaser.Math.FloatBetween(20, 120)
            // Añadimos la estrella creada al array de estrellas:
            this.estrellas.push(estrella)
        }


        //Titulo:
        this.title = this.add.text(gameWidth / 2, gameHeight * 0.25, "Juego Divertido", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
        this.tweens.add({
            targets: this.title,
            y: 500,
            duration: 5000,
            yoyo: true,
            repeat: -1
        })

        // Robot:
        this.add.image(gameWidth / 2, gameHeight * 0.35, 'robot').setScale(0.8, 0.8)


        // Botones menu:
        this.createUIButton(gameWidth / 2, gameHeight * 0.50, "Start", () => this.scene.start('Game'))
        this.createUIButton(gameWidth / 2, gameHeight * 0.65, "Instrucciones", () => this.scene.start('Instrucciones'))

        // Meteorito:
        this.meteorito = this.add.image(gameWidth - 20, 20, 'meteorito').setScale(0.8, 0.8)
        this.tweens.add({
            targets: this.meteorito,
            x: 20,
            y: gameHeight - 20,
            repeat: -1,
            duration: 5000

        })


    }
    createUIButton(x, y, label, callback) {
        // Dimensiones del boton:
        const width = 200;
        const height = 60;
        const color = 0xff0000;//
        // Creo el fondo del boton:
        const bg = this.add.rectangle(x, y, width, height, color, 1)
            .setOrigin(0.5).setStrokeStyle(3, 0xffffff).setInteractive()
        const text = this.add.text(x, y, label, {
            fontSize: "24px",
            fill: "#ffffff",

        }).setOrigin(0.5).setInteractive()
        bg.on('pointerdown', () => {
            this.sound.add("click").play()
            callback();
        })
        text.on('pointerdown', () => {
            this.sound.add("click").play()
            callback();
        })
    }
    update(time, delta) {
        const width = this.sys.game.config.width;

        this.estrellas.forEach(star => {
            // Movimiento horizontal basado en delta:
            star.x += star.velocidad * (delta / 1000);

            // Si sale por la derecha, reaparece a la izquierda:
            if (star.x > width) {
                star.x = -10;
            }
        })
    }
}