import Niveles_scene from "./niveles_scene.js"
class Main_menu extends Phaser.Scene{
    constructor(){
        super({key: "Main_menu"})
    }

    create(){

        //Dimensiones
        let center_width = this.sys.game.config.width/2
        let center_height = this.sys.game.config.height/2      
        
        this.fondo = this.add.image(center_width, center_height, "fondov3")

        this.btn_play = this.add.sprite( 1400, center_height + 100, 'btn_play')
        .setInteractive()
        .on('pointerover', () =>  this.btn_play.setScale(1.1))
        .on('pointerout', () => this.btn_play.setScale( 1 ))
        .on('pointerdown', () => this.scene.add("niveles_scene", new Niveles_scene))
    

        this.tweenMainMenu = this.tweens.createTimeline()
        this.tweenMainMenu.add({
            targets: this.btn_play,
            duration: 1500,
            ease: 'Power1',
            x: center_width,
        })
        
        this.tweenMainMenu.play()
     

    }

    update(){
        
       

    }




}

export default Main_menu