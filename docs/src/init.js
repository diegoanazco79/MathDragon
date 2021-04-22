import Bootloader from './bootloader.js'
import Add_scene from './scenes/add_scene.js'
const config = {
    width: 1280,
    height: 600,
    parent: "contenedor",
    physics:{
        default: "arcade"
    },
    scene: [
        Bootloader,
        Add_scene
    ]
}

new Phaser.Game(config)