import Phaser from "phaser";
import GameScene from "./Scenes/GameScene";
import MenuScene from "./Scenes/MenuScene";
import PreloadScene from "./Scenes/PreloadScene";
import SpriteSheetsScene from "./Scenes/SpriteSheetsScene";

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: [PreloadScene, MenuScene, GameScene, SpriteSheetsScene],
};

const game = new Phaser.Game(config);
