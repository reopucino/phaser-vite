import Phaser from "phaser";
import GameScene from "./Scenes/GameScene";
import MenuScene from "./Scenes/MenuScene";
import ParticleScene from "./Scenes/ParticleScene";
import SpriteSheetsScene from "./Scenes/SpriteSheetsScene";
import PreloadScene from "./Scenes/PreloadScene";
import ParticleStarScene from "./Scenes/ParticleStarScene";

const config = {
  width: 800,
  height: 640,
  type: Phaser.AUTO,
  scene: [PreloadScene, MenuScene, GameScene, ParticleScene, SpriteSheetsScene, ParticleStarScene],
};

const game = new Phaser.Game(config);
