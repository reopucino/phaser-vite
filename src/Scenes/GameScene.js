import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }
  preload() {
    //this.add.image(30, 30, "vite");
    var image = this.add.image(90, 30, "js");

    image.setInteractive();
    image.on("pointerdown", this.backMenuScene, this);

    this.add.text(120, 90, "Game Scene");
  }
  backMenuScene() {
    this.scene.start("menu");
  }
}
