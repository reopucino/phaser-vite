import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }
  preload() {
    this.kotakBG = this.add.graphics();
    this.progressGrap = this.add.graphics();

    this.kotakBG.fillStyle(0xaaaaaa, 1);
    this.kotakBG.fillRect(200, 300, 400, 50);

    this.add
      .text(400, 325, "Loading...", {
        fontSize: "30px",
        color: "#ff0000",
      })
      .setOrigin(0.5);

    this.load.svg("vite", "vite.svg");
    this.load.svg("js", "javascript.svg");
    //this.load.setBaseURL("https://labs.phaser.io");
    this.load.image(
      "logo",
      "https://labs.phaser.io/assets/sprites/phaser3-logo.png"
    );

    this.load.atlas(
      "flares",
      "https://labs.phaser.io/assets/particles/flares.png",
      "https://labs.phaser.io/assets/particles/flares.json"
    );

    this.load.image("star", "img/star.png");

    this.load.image("sky", "https://labs.phaser.io/assets/skies/space3.png");
    this.load.image("char", "assets/char-0.png");
    this.load.image("bg", "assets/img_bg.png");
    this.load.image("log", "assets/basic-log.png");
    this.load.image("ranting", "assets/branch-1.png");

    this.load.image("ui-indicator", "assets/red_indicator.png");
    this.load.image("bg-indicator", "assets/grey_bg.png");
    this.load.image("popup", "assets/grey_panel.png");

    this.load.audio("bgm", "assets/bgm/happy_adveture.mp3");
    this.load.audio("impact", "assets/sfx/impact.mp3");

    this.load.on("progress", this.updateProgress, this);
    this.load.on("complete", this.completeLoad, this);
  }
  updateProgress(value) {
    this.progressGrap.clear();
    this.progressGrap.fillStyle(0x00ff00, 1);
    this.progressGrap.fillRect(220, 310, 360 * value, 30);
  }
  completeLoad() {
    console.log("selesai");
    // this.progressGrap.destroy();
    // this.kotakBG.destroy();

    console.log("preload scene first");
  }
  create() {
    //console.log("jumping scene");
    this.scene.start("menu");
  }
}
