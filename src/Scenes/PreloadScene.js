import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }
  preload() {
    this.kotakBG = this.add.graphics();
    this.progressGrap = this.add.graphics();

    this.kotakBG.fillStyle(0xeeeeee, 0.3);
    this.kotakBG.fillRect(140, 320, 200, 50);

    this.add.text(240, 345, "Loading", { fontSize: "30px", color:"#ff0000" }).setOrigin(0.5);

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

    // this.load.on("filecomplete", function (key, type, data) {
    //   console.log(key + " " + type + " " + data);
    // });
  }
  updateProgress(value) {
    this.progressGrap.clear();
    this.progressGrap.fillStyle(0xffffff, 1);
    this.progressGrap.fillRect(150, 330, 180 * value, 30);
  }
  completeLoad() {
    this.progressGrap.destroy();
    this.kotakBG.destroy();
  }
  create() {
    this.scene.start("menu");
  }
}
