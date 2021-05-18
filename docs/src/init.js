import Bootloader from './bootloader.js'
import Add_scene from './scenes/add_scene.js'
import Tutorial_add_scene from './scenes/tutorial_add_scene.js'
import Main_menu from './scenes/main_menu.js'


const config = {
    type: Phaser.AUTO,
    scale: {
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
    },
    parent: "contenedor",
    physics:{
        default: "arcade"
    },
    dom: {
        createContainer: true
    },
    scene: [
        Bootloader,
        //Add_scene,
        //<Tutorial_add_scene,
        Main_menu,
    ]
}

new Phaser.Game(config)