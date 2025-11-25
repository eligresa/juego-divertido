export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    preload() { }
    create() {
        const mapa = [
            "################",
            "#1...#..#..#..###",
            "#.##...###.....#",
            "#.##.#...0...###",
            "##.....#####...#",
            "#..###.......###",
            "#..0...###.....#",
            "################"
        ];
        const tileW = this.scale.width / mapa[0].length;
        const tileH = this.scale.height / mapa.length;
        // Guardamos grupos en la escena
        this.walls = this.physics.add.staticGroup();
        this.tuercas = this.physics.add.staticGroup();
        this.cubitoshielo = this.physics.add.staticGroup();
        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                const px = x * tileW + tileW / 2;
                const py = y * tileH + tileH / 2;
                switch (c) {
                    case "#": {
                        const wall = this.add.rectangle(px, py, tileW, tileH, 0xE7CCEB);
                        this.walls.add(wall); // ya crea body estático
                        break;
                    }
                    case ".": {
                        const tuerca = this.tuercas.create(px, py, 'tuerca').setScale(0.1);
                        tuerca.body.setCircle(8);
                        tuerca.refreshBody();
                        break;
                    }
                    case "0": {
                        const cbt = this.cubitoshielo.create(px, py, 'cubitohielo').setScale(0.2);
                        cbt.body.setCircle(8);
                        cbt.refreshBody();
                        break;
                    }
                    case "1": {
                        // Un solo robot
                        this.robot = this.physics.add.sprite(px, py, 'robot');
                        this.robot.setScale(0.38);
                        break;
                    }
                }
            });
        });
        // Colisiones de las paredes con las tuercas,robots y los cubitos de hielo:
        this.physics.add.collider(this.robot, this.walls);
        this.physics.add.collider(this.tuercas, this.walls);
        this.physics.add.collider(this.cubitoshielo, this.walls);
        this.physics.add.overlap(this.robot, this.tuercas, tragarTuercas, null, this);
        this.physics.add.overlap(this.robot, this.cubitoshielo, tragarCubitosHielo, null, this);
        this.glup = this.sound.add('glup')
        function tragarCubitosHielo(robot, hielo) {
            hielo.disableBody(true, true); // este es el cubito tocado
            this.glup.play();
        }
        function tragarTuercas(robot, tuerca) {
            tuerca.disableBody(true, true); // esta es la tuerca tocada
            this.glup.play();
        }

        //Creamos los cursores:
        this.cursors = this.input.keyboard.createCursorKeys();

        //Creamos la puntuación y el texto:
        this.puntos = 0
        this.vidas = 3
        this.add.text(10, 10, `Puntos:${this.puntos} Vidas:${this.vidas}`, { color: "black", fontSize: 36 })
    }

    update() {
        const speed = 160;
        // Resetear velocidad cada frame
        this.robot.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.robot.setVelocityX(-speed);
        }
        else if (this.cursors.right.isDown) {
            this.robot.setVelocityX(speed);
        }
        if (this.cursors.up.isDown) {
            this.robot.setVelocityY(-speed);
        }
        else if (this.cursors.down.isDown) {
            this.robot.setVelocityY(speed);
        }
    }
}

















