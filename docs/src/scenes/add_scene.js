class Add_scene extends Phaser.Scene{
    constructor(){
        super({key: "Add_scene"})
    }
    create(){

        let center_width = this.sys.game.config.width/2
        let center_height = this.sys.game.config.height/2

        //Fondo
        this.add.image(center_width, center_height,"fondo").setScale(0.239);

       
    }

    update(){
       
    }

}

export default Add_scene