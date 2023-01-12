import Phaser from "phaser";
import GameScene from "./Scenes/GameScene";
import MenuScene from "./Scenes/MenuScene";
import PreloadScene from "./Scenes/PreloadScene";
import ParticleScene from "./Scenes/ParticleScene";
import ParticleStarScene from "./Scenes/ParticleStarScene";

const config = {
  width: 800,
  height: 640,
  type: Phaser.AUTO,
  scene: [PreloadScene, MenuScene, GameScene, ParticleScene, ParticleStarScene],
};

const game = new Phaser.Game(config);
