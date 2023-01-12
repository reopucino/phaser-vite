import Phaser, { Scene } from "phaser";

export default class ParticleStarScene extends Phaser.Scene {
  constructor() {
    super("particle-star");
  }
  create() {
    let image = this.add.image(30, 30, "back").setScale(0.35);
    image.setInteractive();
    image.on("pointerdown", this.backtomainmenu, this);

    this.particle = this.add.particles("star");
    this.emitter = this.particle.createEmitter({
      gravityY: 100,
      scale: { start: 0.25, end: 0.001 },
      lifespan: 500,
      angle: { min: 0, max: 360 },
      x: 200,
      y: 200,
      speed: { min: -220, max: 220 },
      rotate: { start: 0, end: 220 },
      frequency: -1,
    });

    this.input.on("pointerdown", this.spawnParticle, this);
  }

  spawnParticle(pointer) {
    //console.log(this.particle);
    this.emitter.explode(50, pointer.x, pointer.y);
  }

  backtomainmenu() {
    this.scene.start("menu");
  }
}
