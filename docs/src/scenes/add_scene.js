class Add_scene extends Phaser.Scene{
    constructor(){
        super({key: "Add_scene"})
    }
    create(){

        let center_width = this.sys.game.config.width/2
        let center_height = this.sys.game.config.height/2

        //Fondo
        this.add.image(center_width, center_height, "fondo")
        
        
        //Dragon
        this.dragon = this.physics.add.image(center_width, center_height, "dragon")
        this.dragon.setCollideWorldBounds(true)
        

        
        
        //Carne
        this.add.image(center_width + 150, center_height, "carne")
        
        
        
        //Bomba
        this.add.image(center_width + 250, center_height, "bomba")


        //Controles
        this.cursor = this.input.keyboard.createCursorKeys()
    }

    update(){
        if( this.cursor.down.isDown){
            this.dragon.body.setVelocityY(200)
        } else if (this.cursor.up.isDown) {
            this.dragon.body.setVelocityY(-200)
        } else if (this.cursor.left.isDown){
            this.dragon.body.setVelocityX(-200)
        } else if (this.cursor.right.isDown){
            this.dragon.body.setVelocityX(200)
        }
        else {
            this.dragon.body.setVelocityY(0)
            this.dragon.body.setVelocityX(0)
        }
       
    }

}

export default Add_scene