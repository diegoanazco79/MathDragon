import Add_scene from "./add_scene.js"

class Tutorial_add_scene extends Phaser.Scene{
    constructor(){
        super({key: "Tutorial_add_scene"})
    }

    create(){

        //Dimensiones
        let center_width = this.sys.game.config.width/2
        let center_height = this.sys.game.config.height/2      
        
        this.fondo = this.add.image(center_width, center_height, "fondov3")

        const button = this.add.sprite( 100, 100, 'button')
        .setInteractive()
        .on('pointerdown', () => console.log("Presionado"))
        .on('pointerup', () => button.setScale( 1 ));

        var spaceDown = this.input.keyboard.addKey('W')

        spaceDown.on('down', function(){
            this.scene.add("add_scene", new Add_scene)
        }, this)
    }

    update(){
        
       

    }




}

export default Tutorial_add_scene