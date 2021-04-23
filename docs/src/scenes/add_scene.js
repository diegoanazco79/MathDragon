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
        this.dragon = this.physics.add.sprite(center_width ,center_height, 'mov_dragon')
        this.anims.create({
            key: 'dragon_mov',
            frames: this.anims.generateFrameNumbers('mov_dragon', {
                frames: [0, 1, 2, 3]
            }),
            repeat: -1,
            frameRate: 8
        })
        this.dragon.setCollideWorldBounds(true)
        this.dragon.anims.play('dragon_mov')
        
        
        //Carne
        this.carne= this.physics.add.image(center_width + 250, center_height, "carne")
        
        //Función de Puntos de Carne
        this.physics.add.collider(this.dragon, this.carne, this.puntoCarne, null, this)

        
        //Controles
        this.cursor = this.input.keyboard.createCursorKeys()
    }

    update(){
        if(this.cursor.down.isDown){
            this.dragon.body.setVelocityY(100)
        } else if (this.cursor.up.isDown) {
            this.dragon.body.setVelocityY(-100)
        } else if (this.cursor.left.isDown){
            this.dragon.body.setVelocityX(-100)
        } else if (this.cursor.right.isDown){
            this.dragon.body.setVelocityX(200)
        }
        else {
            this.dragon.body.setVelocityY(0)
            this.dragon.body.setVelocityX(0)  
        }       
    }

    puntoCarne ()
    {
        this.carne.disableBody(true, true);
        console.log("Punto")
    }

}

export default Add_scene