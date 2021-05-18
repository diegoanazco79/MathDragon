const config = {
    type: Phaser.AUTO,
    scale: {
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
        Main_menu,
        Niveles_scene,
        Add_scene
    ]
}

new Phaser.Game(config)