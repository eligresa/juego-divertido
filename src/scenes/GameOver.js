export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver")
    }
    preload() { }

    create() {

        //Fondo Estrellado:
        this.estrellas = [];
        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, 800)
            const y = Phaser.Math.Between(0, 600)
            let estrella = this.add.image(x, y, "star")

            // Escala y velocidad aleatoria para efecto de profundidad:
            const scale = Phaser.Math.FloatBetween(0.2, 1);
            estrella.setScale(scale);

            // Velocidades lentas → estrellas lejanas:
            estrella.velocidad = Phaser.Math.FloatBetween(20, 120);

            //Añadimos la estrella creada al array de estrellas:
            this.estrellas.push(estrella)

        }

        //El título:
        this.title = this.add.text(400, 100, "Game Over", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)

        // Animación texto:
        this.tweens.add({
            targets: this.title,
            y: 500,
            yoyo: true,
            repeat: -1,
            duration: 5000
        })

        //Craemos los asset:
        this.add.image(400, 210, "robot").setScale(0.8, 0.8)//robot

        //Creamos los botones menú:
        this.createUIButton(400, 300, "Volver a Jugar", () => this.scene.start('Game'));
        this.createUIButton(400, 400, "Instrucciones", () => this.scene.start('Instrucciones'));
        this.meteorito = this.add.image(780, 10, "meteorito").setScale(0.8, 0.8)
        // Animación meteorito:
        this.tweens.add({
            targets: this.meteorito,
            x: 10,
            y: 590,
            repeat: -1,
            duration: 5000
        })


    }

    createUIButton(x, y, label, callback) {
        //Tamaño del botón:
        const width = 200;
        const height = 60;

        //Creamos el fondo del boton:
        const bg = this.add.rectangle(x, y, width, height, 0xff0000, 1).setOrigin(0.5).setInteractive().setStrokeStyle(3, 0xffffff)
        const text = this.add.text(x, y, label, { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5).setInteractive()

        //Añadimos el sonido en los botones tanto een el bg como en el texto:
        bg.on('pointerdown', () => { this.sound.add("click").play(); callback() })
        text.on('pointerdown', () => { this.sound.add("click").play(); callback() })

    }
    update(time, delta) {
        const width = this.sys.game.config.width;

        this.estrellas.forEach(star => {
            // Movimiento horizontal basado en delta
            star.x += star.velocidad * (delta / 1000);

            // Si sale por la derecha, reaparece a la izquierda
            if (star.x > width) {
                star.x = -10;
            }
        });
    }
}