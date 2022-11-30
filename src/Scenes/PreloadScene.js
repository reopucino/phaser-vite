import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }
  preload() {
    this.progressGrap = this.add.graphics();

    this.load.svg("vite", "vite.svg");
    this.load.svg("js", "javascript.svg");
    //this.load.setBaseURL("https://labs.phaser.io");
    this.load.image("logo", "https://labs.phaser.io/assets/sprites/phaser3-logo.png");
    this.load.image("sky", "https://labs.phaser.io/assets/skies/space3.png");
    console.log("preload scene first");

    //start here
    this.load.image("char", "assets/char-0.png");
    this.load.image("bg", "assets/img_bg.png");
    this.load.image("log", "assets/basic-log.png");
    this.load.image("ranting", "assets/branch-1.png");

    this.load.image("ui-indicator", "assets/red_indicator.png");
    this.load.image("bg-indicator", "assets/grey_bg.png");
    this.load.image("popup", "assets/grey_panel.png");

    //sound here
    this.load.audio("bgm", "assets/bgm/happy_adveture.mp3");
    this.load.audio("impact", "assets/sfx/impact.mp3");

    this.load.on("progress", this.updateProgress, this);
    this.load.on("complete", this.completeLoad, this);

    this.load.on("filecomplete", function (key, type, data) {
      console.log(key + " " + type + " " + data);
    });
    //this.load.update();
  }
  updateProgress(value) {
    console.log(value);
    this.progressGrap.clear();
    this.progressGrap.fillStyle(0xffffff, 1);
    this.progressGrap.fillRect(0, 270, 200 * value, 60);
  }
  completeLoad() {
    console.log("complete load");
    this.progressGrap.destroy();
  }
  create() {
    console.log("prepare jump to menu");
    this.scene.start("menu");
  }
  update() {
    console.log("update game");
  }
}
