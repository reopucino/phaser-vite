import Phaser, { Scene } from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }
  preload() {
    this.add.image(0, 0, "sky").setOrigin(0);
    this.add.image(30, 30, "vite");
    let image = this.add.image(770, 30, "js");

    image.setInteractive();
    image.on("pointerdown", this.changeGameScene, this);

    this.add.image(400, 150, "logo");

    this.add.text(400, 550, "Menu Scene", { fontSize: "30px" }).setOrigin(0.5);

    this.add
      .text(400, 300, "Particle Scene", { fontSize: "30px" })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", this.changeIntoParticleScene, this);
  }
  changeGameScene() {
    this.scene.start("game");
  }
  changeIntoParticleScene() {
    this.scene.start("example-particle");
  }
}
