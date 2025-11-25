export default class Instrucciones extends Phaser.Scene {
    constructor() {
        super("Instrucciones")
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

        //Creamos el fondo:
        this.fondo = this.add.rectangle(400, 300, 500, 500, "0xff0000", 0.6)

        //El título:
        this.title = this.add.text(400, 80, "Instrucciones", {
            fontSize: "32px",
            fill: "#efefef"
        }).setOrigin(0.5)

        const instrucciones =
            `🤖 Usa las teclas de dirección o flechas para moverte por el laberinto y comerte las tuercas.
🤖 Sumarás por cada tuerca.
🤖 Si te comes un cubito de hielo, perderás una vida.
🤖 Si te alcanza un meteorito perderas otra vida.
🤖 Si te quedas sin vidas, acaba la partida.
🤖 Si te comes todas las estrellas cambiarás de laberinto.     
`
        const style = {
            color: "#ffffff",
            fontSize: 18,
            lineSpacing: 12,
            wordWrap: {
                width: 400,
                use: true
            },
            align: "left"

        }
        this.add.text(400, 300, instrucciones, style).setOrigin(0.5)



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