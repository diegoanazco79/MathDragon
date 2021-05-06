import Bootloader from './bootloader.js'
import Add_scene from './scenes/add_scene.js'
const config = {
    width: 1280,
    height: 720,
    parent: "contenedor",
    physics:{
        default: "arcade"
    },
    dom: {
        createContainer: true
    },
    scene: [
        Bootloader,
        Add_scene
    ]
}

new Phaser.Game(config)