

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }
    preload() {
      
  
     }
    create() {
        
        //Creamos el laberinto o mapa del juego:
        const walls = this.physics.add.staticGroup();
        const mapa = [
            "################",
            "#1...#..#..#..##",
            "#.##...###.....#",
            "#.##.#...0...###",
            "##.....#####...#",
            "#..###.......###",
            "#..0...###.....#",
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
                        0xC688D1
                    );
                    this.physics.add.existing(wall, true);
                    walls.add(wall);
                }
            });
        });

        //Craemos las tuercas donde tocan:

        this.tuerca = this.physics.add.staticGroup()
        // colocamos las tuercas donde no hay muros
        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                if (c === ".") {
                    const sx = x * tileW + tileW / 2;
                    const sy = y * tileH + tileH / 2;
                    const tuerca = this.tuerca.create(sx, sy, 'tuerca').setScale(0.1);
                    tuerca.body.setCircle(8);
                    tuerca.body.setOffset(0, 0);
                }
            });
        });

         // colocamos los cubitos de hielo donde no hay tuercas
         this.cubitohielo = this.physics.add.staticGroup()

        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                if (c === "0") {
                    const sx = x * tileW + tileW / 2;
                    const sy = y * tileH + tileH / 2;
                    const cubitohielo = this.tuerca.create(sx, sy, 'cubitohielo').setScale(0.2);
                    cubitohielo.body.setCircle(8);
                    cubitohielo.body.setOffset(0, 0);
                }
            });
        });
         // colocamos el robot donde hay tuercas:
         this.robot = this.physics.add.staticGroup()

        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                if (c === "1") {
                    const sx = x * tileW + tileW / 2;
                    const sy = y * tileH + tileH / 2;
                    const robot = this.robot.create(sx, sy, 'robot').setScale(0.4);
                    robot.body.setCircle(8);
                    robot.body.setOffset(0, 0);
                }
            });
        });



        // colisiones entre tuercas y muros
        this.physics.add.collider(this.tuercas, this.walls);

        //Colocamos el robot:
        // this.add.image(400,300,"robot").setScale(0.5)
      




    }
    update() { }
}