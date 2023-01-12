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

    let particleSceneText = this.add
      .text(400, 350, "Particle Scene", { fontSize: "30px" })
      .setOrigin(0.5)
      .setInteractive();
    particleSceneText.on("pointerdown", this.changeGameSceneParticle, this);

    let particleStarSceneText = this.add
      .text(400, 400, "Particle Star Scene", { fontSize: "30px" })
      .setOrigin(0.5)
      .setInteractive();
    particleStarSceneText.on(
      "pointerdown",
      this.changeGameSceneParticleStar,
      this
    );
  }
  changeGameScene() {
    this.scene.start("game");
  }
  changeGameSceneParticle() {
    this.scene.start("particle");
  }
  changeGameSceneParticleStar() {
    this.scene.start("particle-star");
  }
}
