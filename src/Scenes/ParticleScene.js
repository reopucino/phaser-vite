import Phaser, { Scene } from "phaser";

export default class ParticleScene extends Phaser.Scene {
  constructor() {
    super("particle");
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
  }
}
