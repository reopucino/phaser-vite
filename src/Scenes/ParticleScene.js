import Phaser, { Scene } from "phaser";

export default class ParticleScene extends Phaser.Scene {
  constructor() {
    super("example-particle");
  }
  create() {
    var particles = this.add.particles("flares");

    var emitter = particles.createEmitter({
      frame: ["red", "blue", "green", "yellow"],
      x: 400,
      y: 300,
      speed: 200,
      lifespan: 3000,
      blendMode: "ADD",
    });

    var image = this.add.image(90, 30, "js");

    image.setInteractive();
    image.on("pointerdown", this.backMenuScene, this);
  }
  backMenuScene() {
    this.scene.start("menu");
  }
}
