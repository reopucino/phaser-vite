import Phaser from "phaser";

export default class SpriteSheetsScene extends Phaser.Scene {
  constructor() {
    super("ss-example");
  }
  create() {
    //this.add.image(30, 30, "vite");
    var image = this.add.image(30, 30, "back").setScale(0.35).setInteractive();

    image.on("pointerdown", this.backMenuScene, this);

    this.add
      .text(400, 90, "SpriteSheets Scene", { fontSize: "30px", color: "#ffffff" })
      .setOrigin(0.5);

    this.add
      .text(400, 150, "click button left and right to move char", {
        fontSize: "30px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.anims.create({
      key: "moveAnimation",
      frames: this.anims.generateFrameNumbers("kenny-player", { frames: [2, 3] }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "idleAnimation",
      frames: this.anims.generateFrameNumbers("kenny-player", { frames: [0] }),
      frameRate: 1,
      repeat: 0,
    });

    this.player = this.add.sprite(400, 300, "kenny-player");
    this.player.play("idleAnimation");

    //this.input.keyboard.on("keydown-RIGHT", this.movePlayer, this);
    this.moveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.moveLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  }

  update() {
    if (this.moveRight.isDown || this.moveLeft.isDown) {
      if (this.player.anims.currentAnim.key != "moveAnimation") {
        this.player.play("moveAnimation");
      }
      if (this.moveLeft.isDown) this.player.scaleX = -1;
      if (this.moveRight.isDown) this.player.scaleX = 1;
    } else if (this.moveLeft.isUp && this.moveRight.isUp) {
      this.player.play("idleAnimation");
    }
  }

  backMenuScene() {
    this.scene.start("menu");
  }
}
