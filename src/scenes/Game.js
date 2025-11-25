export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    preload() { }
    create() {
        const mapa = [
            "################",
            "#1...#..#..#0.###",
            "#.##.0.###....0#",
            "#.##.#...0...###",
            "##.....#####...#",
            "#0.###.......###",
            "#..0...###....0#",
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
                        const tuercas = this.tuercas.create(px, py, 'tuerca').setScale(0.1);
                        tuercas.body.setCircle(8);
                        tuercas.refreshBody();
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
                        this.robot.setScale(0.37);
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
            this.vidas--
            this.actualizarTexto()
        }
        function tragarTuercas(robot, tuerca) {
            tuerca.disableBody(true, true); // esta es la tuerca tocada
            this.glup.play();         
            this.puntos++
            this.actualizarTexto()
        }

        //Creamos los cursores:
        this.cursors = this.input.keyboard.createCursorKeys();

        //Creamos la puntuación y el texto:
        this.puntos = 0
        this.vidas = 3
        this.tiempo=60;
        this.puntosVidas = this.add.text(10, 10, "", { color: "black", fontSize: 32 })

        //Actializamos texto:
        this.actualizarTexto = () => {
            this.puntosVidas.setText(`Puntos: ${this.puntos} Vidas: ${this.vidas} Tiempo:${this.tiempo}`);
            if(this.vidas<=0 || this.tiempo<=0 ){
            this.scene.start('GameOver')
        }
        };
        this.actualizarTexto();
        
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
        //El tiempo disminuye:
       this.tiempo=Math.floor(this.tiempo -0.01)
    }

}

















