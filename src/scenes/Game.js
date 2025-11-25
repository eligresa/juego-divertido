import robot from "../assets/robot.svg"
import tuerca from "../assets/tuerca.svg"
export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }
    preload() {
        this.load.image('robot',robot)
        this.load.image('tuerca',tuerca)
     }
    create() {
        // this.add.text(400,300, "Estas jugando", {
        //     fontSize: "48px",
        //     fill: "#efefef"
        // }).setOrigin(0.5)
        const walls = this.physics.add.staticGroup();
        const mapa = [
            "################",
            "#....#..#..#..##",
            "#.##...###.....#",
            "#.##.#.......###",
            "##.....#####...#",
            "#..###.......###",
            "#......###.....#",
            "################"
        ];
        const tileW = this.scale.width / mapa[0].length;
        const tileH = this.scale.height / mapa.length;
        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                if (c === "#") {
                    const wall = this.add.rectangle(
                        x * tileW + tileW / 2,
                        y * tileH + tileH / 2,
                        tileW,
                        tileH,
                        0xff0000
                    );
                    this.physics.add.existing(wall, true);
                    walls.add(wall);
                }
            });
        });
        //Colocamos el robot:
        this.add.image(400,300,"robot").setScale(0.5)
        this.add.image(100,100,"tuerca").setScale(0.1)




    }
    update() { }
}