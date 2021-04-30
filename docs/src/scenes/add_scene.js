class Add_scene extends Phaser.Scene{
    constructor(){
        super({key: "Add_scene"})
    }

    create(){

        //Dimensiones
        let center_width = this.sys.game.config.width/2
        let center_height = this.sys.game.config.height/2        

        

        //Fondo
        this.fondo = this.add.image(center_width, center_height, "fondov3")
        this.marco = this.physics.add.image(center_width, center_height-305, "marco").setImmovable(true)
        
        //Puntajes
        this.puntaje = 0
        this.puntajeCarnes = 0
        this.puntajePescados = 0
        this.vida = 3
        this.scorePescados = this.add.text(center_width + 300, center_height - 328, '', { fontSize: '40px', color: 'white' });
        this.scoreCarnes = this.add.text(center_width + 460, center_height - 328, '', { fontSize: '40px', color: 'white' });


        //Dragon
        this.dragon = this.physics.add.sprite(200 ,center_height, 'mov_dragon')
        this.physics.add.collider(this.dragon, this.marco);
        //Dragon: Animación vuelo
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

        //Dragon: Animación daño
        this.anims.create({
            key: 'dragon_dan',
            frames: this.anims.generateFrameNumbers('dan_dragon', {
                frames: [0, 1, 2]
            }),
            repeat: 1,
            frameRate: 8
        })
        //Dragon: Animación daño
        this.anims.create({
        key: 'dragon_muer',
        frames: this.anims.generateFrameNumbers('muer_dragon', {
            frames: [0, 1, 2]
        }),
        repeat: 1,
        frameRate: 5
        })

        this.dragon.on('animationcomplete', this.danoComplete, this);
        
        //Carne
        this.carne = this.physics.add.group()
        this.nuevaCarne()
      
        //Bombas
        this.bomba = this.physics.add.group()
        this.nuevaBomba()
               
        //Pescado
        this.pescado = this.physics.add.group()
        this.nuevaPescado()


        //Controles
        this.cursor = this.input.keyboard.createCursorKeys()

        //Vidas
        

    }

    update(){
        
        //Movimiento del Dragon
        if(this.cursor.down.isDown){
            this.dragon.body.setVelocityY(150)
        } else if (this.cursor.up.isDown) {
            this.dragon.body.setVelocityY(-150)
        } else if (this.cursor.left.isDown){
            this.dragon.body.setVelocityX(-250)
        } else if (this.cursor.right.isDown){
            this.dragon.body.setVelocityX(250)
        } else{
            this.dragon.body.setVelocityX(0)
            this.dragon.body.setVelocityY(0)
        }
    }

    puntoCarne (dragon, carne){
        carne.disableBody(true, true)
        this.puntaje =  this.puntaje + 1
        this.puntajeCarnes = this.puntajeCarnes + 1
        this.scoreCarnes.setText(' ' + this.puntajeCarnes)
        console.log("Total: " + this.puntaje)
    }

    puntoPescado(dragon, pescado){
        pescado.disableBody(true,true)
        this.puntaje = this.puntaje + 1
        this.puntajePescados = this.puntajePescados + 1
        this.scorePescados.setText(' ' + this.puntajePescados)
        console.log("Total: " + this.puntaje)
    }

    puntoBomba(dragon, bomba){
        bomba.disableBody(true,true)
        this.dragon.anims.play('dragon_dan', true)
        this.vida = this.vida - 1
        console.log("Vida: " + this.vida)
        if (this.vida <= 0){
            this.dragon.body.setAccelerationX(500)
            this.dragon.body.setAccelerationY(500)
            this.input.keyboard.removeAllKeys(true)
            this.dragon.anims.play('dragon_muer', true)
            console.log("Muerto")
        }
    }


    nuevaCarne() {
        this.carne.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,600), 'carne');
        this.carne.setVelocityX(-200);
        this.carne.checkWorldBounds = true;
        this.carne.outOfBoundsKill = true;
        this.time.delayedCall(1000, this.nuevaCarne, [], this);
        this.physics.add.overlap(this.dragon, this.carne, this.puntoCarne, null, this);
    }

    nuevaPescado() {
        this.pescado.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,600), 'pescado');
        this.pescado.setVelocityX(-200);
        this.pescado.checkWorldBounds = true;
        this.pescado.outOfBoundsKill = true;
        this.time.delayedCall(2500, this.nuevaPescado, [], this);
        this.physics.add.overlap(this.dragon, this.pescado, this.puntoPescado, null, this);
    }

    nuevaBomba() {
        this.bomba.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,600), 'bomba');
        this.bomba.setVelocityX(-200);
        this.bomba.checkWorldBounds = true;
        this.bomba.outOfBoundsKill = true;
        this.time.delayedCall(4000, this.nuevaBomba, [], this);
        this.physics.add.overlap(this.dragon, this.bomba, this.puntoBomba, null, this);
    }

    danoComplete(animation, frame, sprite){
        if (animation.key === 'dragon_dan') {
            this.dragon.play('dragon_mov');
        }
    }

}

export default Add_scene