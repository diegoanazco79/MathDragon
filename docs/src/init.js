import Bootloader from './bootloader.js'
import Scene_play from './scenes/scene_play.js'
const config = {
    width: 1280,
    height: 720,
    parent: "contenedor",
    physics:{
        default: "arcade"
    },
    scene: [
        Bootloader,
        Scene_play
    ]
}

new Phaser.Game(config)