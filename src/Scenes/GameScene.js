import Phaser from "phaser";
var timeCountDown = 10000;
var arrayBatangPohon = [];
var poolArrayBatangPohonTidakTerpakai = [];
var score = 0;
var indicatortimer = null;
var reduceTimer = 1;

const DATA_RANTING_KOSONG = 0;
const POSISI_PLAYER_KIRI = 1;
const POSISI_PLAYER_KANAN = 2;
const MAX_DISPLAY_WIDTH = 127;
const MAX_TIME_COUNT = 10000;
const ADDITIONAL_TIMER = 200;
const MIN_REDUCER = 0.3;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }
  preload() {
    //this.add.image(30, 30, "vite");
    //this.add.image(90, 30, "js");
    //this.add.text(120, 90, "Game Scene");
  }
  create() {
    const config = this.game.config;

    this.gameover = false;

    let image = this.add.image(30, 30, "back").setScale(0.35);
    image.setInteractive();
    image.on("pointerdown", this.backtomainmenu, this);
    image.setDepth(2);

    this.tambahkanBatangPohon = function () {
      var container = this.add.container(0, 0);
      container.setDataEnabled();

      var batangPohon = this.add.image(0, 0, "log");
      var rantingKanan = this.add.image(45, 0, "ranting");
      var rantingKiri = this.add.image(-45, 0, "ranting");
      rantingKiri.setFlip(true);

      container.add(batangPohon);
      container.add(rantingKanan);
      container.add(rantingKiri);

      return container;
    };

    /**
     *
     * @param {number} posisiRanting 0 tidak ada ranting,1 kanan hilang, 2 kiri hilang, default adalah 2
     * @returns Phaser Container batang pohon
     */
    this.mengisiBatangPohon = function (posisiRanting) {
      if (posisiRanting === undefined) posisiRanting = 2;
      var batangPohonBaru = null;
      if (poolArrayBatangPohonTidakTerpakai.length > 0) {
        batangPohonBaru = poolArrayBatangPohonTidakTerpakai[0];
        poolArrayBatangPohonTidakTerpakai.shift();
        batangPohonBaru.iterate(function (child) {
          child.visible = true;
        });
      } else {
        batangPohonBaru = this.tambahkanBatangPohon();
      }

      if (posisiRanting == 0) {
        var rantingKanan = batangPohonBaru.getAt(1);
        rantingKanan.visible = false;
        var rantingKiri = batangPohonBaru.getAt(2);
        rantingKiri.visible = false;
        batangPohonBaru.data.set("ranting", 0);
      } else if (posisiRanting == 2) {
        var rantingKiri = batangPohonBaru.getAt(2);
        rantingKiri.visible = false;
        batangPohonBaru.data.set("ranting", 2);
      } else if (posisiRanting == 1) {
        var rantingKanan = batangPohonBaru.getAt(1);
        rantingKanan.visible = false;
        batangPohonBaru.data.set("ranting", 1);
      }

      return batangPohonBaru;
    };

    this.animasiBatangPohon = function (batangpohon, posisilempar) {
      //buat timelinetween
      var timeline = this.tweens.createTimeline();
      var xLemparan = 360;
      if (posisilempar == "kiri") {
        xLemparan = 120;
      }

      timeline.add({
        targets: batangpohon,
        ease: "Linear",
        duration: 300,
        y: 500,
      });
      timeline.add({
        targets: batangpohon,
        ease: "Linear",
        duration: 300,
        y: 700,
        onComplete: function () {
          poolArrayBatangPohonTidakTerpakai.push(batangpohon);
        },
      });

      timeline.play();
      this.tweens.add({
        targets: batangpohon,
        ease: "Linear",
        duration: 600,
        x: xLemparan,
        angle: 720,
      });
    };

    this.turunkanBatangPohon = function () {
      for (var i = 0; i < arrayBatangPohon.length; i++) {
        batangPohon = arrayBatangPohon[i];
        batangPohon.y = config.height - 70 * (i + 1);
      }

      var pilihRanting = Phaser.Math.Between(1, 2);
      var batangPohonTeratas = arrayBatangPohon[arrayBatangPohon.length - 1];
      var dataRanting = batangPohonTeratas.data.get("ranting");
      if (dataRanting > DATA_RANTING_KOSONG) {
        pilihRanting = 0;
      }
      var batangPohonBaru = this.mengisiBatangPohon(pilihRanting);

      batangPohonBaru.y = batangPohonTeratas.y - 70;
      batangPohonBaru.x = batangPohonTeratas.x;

      //batangPohonBaru.setPosition(batangPohonTeratas.x, batangPohonTeratas.y-70);

      batangPohonBaru.angle = 0;
      arrayBatangPohon.push(batangPohonBaru);
    };

    this.cekTumbukan = function (posisiPlayer) {
      var tumbukan = false;
      var batangPohon = arrayBatangPohon[0];
      var posisiBatangPohon = batangPohon.data.get("ranting");
      if (posisiPlayer == posisiBatangPohon) {
        this.permainanBerakhir();
        tumbukan = true;
      }
      return tumbukan;
    };

    this.permainanBerakhir = function () {
      console.log("permainan berakhir");
      this.gameover = true;
      this.input.keyboard.enabled = false;

      this.add
        .image(config.width * 0.5, config.height * 0.5, "popup")
        .setScale(3);

      this.add
        .text(config.width * 0.5, config.height * 0.5, "GAME OVER", {
          fontSize: 30,
          color: "#000",
          align: "center",
        })
        .setOrigin(0.5);
    };

    this.sound.add("bgm").play({ loop: true });

    this.add.image(config.width * 0.5, config.height * 0.5, "bg");
    var char = this.add.image(config.width * 0.5 - 40, 570, "char");

    for (var i = 1; i < 10; i++) {
      var batangPohon = this.tambahkanBatangPohon();
      if (i % 2 == 0 || i == 1) {
        var rantingKanan = batangPohon.getAt(1);
        rantingKanan.visible = false;
        var rantingKiri = batangPohon.getAt(2);
        rantingKiri.visible = false;
        batangPohon.data.set("ranting", 0);
      } else {
        var random = Phaser.Math.Between(1, 2);
        var ranting = batangPohon.getAt(random);
        ranting.visible = false;
        batangPohon.data.set("ranting", random);
      }

      batangPohon.setPosition(config.width * 0.5, config.height - 70 * i);
      arrayBatangPohon.push(batangPohon);
    }

    //add UI here
    var textDisplay = this.add
      .text(config.width * 0.5, 40, score, {
        fontSize: 50,
        color: "#000",
        align: "center",
      })
      .setOrigin(0.5);
    textDisplay.setDepth(1);

    this.add.image(200, 30, "bg-indicator").setScale(0.7, 0.7);
    indicatortimer = this.add
      .image(136, 30, "ui-indicator")
      .setScale(0.5, 0.5)
      .setOrigin(0, 0.5);
    indicatortimer.displayWidth = MAX_DISPLAY_WIDTH;
    //console.log(indicatortimer.displayWidth);
    //indicatortimer.angle = 90;

    this.input.keyboard.on("keydown-RIGHT", () => {
      if (this.gameover) return;
      char.x = config.width * 0.5 + 40;
      char.flipX = true;
      var tumbukan = this.cekTumbukan(POSISI_PLAYER_KANAN);
      if (tumbukan) return;
      //tumbangkan pohon ke kiri
      var batangpohon = arrayBatangPohon[0];
      this.animasiBatangPohon(batangpohon, "kiri");
      arrayBatangPohon.shift();
      this.turunkanBatangPohon();
      //check posisi batang pohon terbawah dan posisi player
      tumbukan = this.cekTumbukan(POSISI_PLAYER_KANAN);
      if (!tumbukan) {
        score += 1;
        textDisplay.text = score;
        if (reduceTimer < MIN_REDUCER) reduceTimer = MIN_REDUCER;
        console.log(reduceTimer);
        timeCountDown += ADDITIONAL_TIMER * reduceTimer;
        this.sound.add("impact").play();
      }
    });

    this.input.keyboard.on("keydown-LEFT", () => {
      if (this.gameover) return;
      char.x = config.width * 0.5 - 40;
      char.flipX = false;
      var tumbukan = this.cekTumbukan(POSISI_PLAYER_KIRI);
      if (tumbukan) return;
      //tumbangkan pohon ke kiri
      var batangpohon = arrayBatangPohon[0];
      this.animasiBatangPohon(batangpohon, "kanan");
      arrayBatangPohon.shift();
      this.turunkanBatangPohon();
      //check posisi batang pohon terbawah dan posisi player
      var tumbukan = this.cekTumbukan(POSISI_PLAYER_KIRI);
      if (!tumbukan) {
        score += 1;
        textDisplay.text = score;
        if (reduceTimer < MIN_REDUCER) reduceTimer = MIN_REDUCER;
        console.log(reduceTimer);
        timeCountDown += ADDITIONAL_TIMER * reduceTimer;
        this.sound.add("impact").play();
      }
    });
  }
  update(timestep, dt) {
    if (this.gameover) return;
    timeCountDown -= dt;
    if (timeCountDown <= 0) {
      timeCountDown = 0;
      this.gameover = true;
      this.add
        .image(
          this.game.config.width * 0.5,
          this.game.config.height * 0.5,
          "popup"
        )
        .setScale(3);

      this.add
        .text(
          this.game.config.width * 0.5,
          this.game.config.height * 0.5,
          "GAME OVER",
          {
            fontSize: 30,
            color: "#000",
            align: "center",
          }
        )
        .setOrigin(0.5);
    }
    reduceTimer -= dt * 0.0001;
    if (timeCountDown > MAX_TIME_COUNT) timeCountDown = MAX_TIME_COUNT;
    indicatortimer.displayWidth =
      MAX_DISPLAY_WIDTH * (timeCountDown / MAX_TIME_COUNT);
  }

  backtomainmenu() {
    this.scene.start("menu");
  }
}
