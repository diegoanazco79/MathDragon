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

        
        
        //Datos del videojuego
        this.data.set('puntaje', 0)
        this.data.set('puntajeCarnes', 0)
        this.data.set('puntajePescados', 0)
        this.data.set('vida', 3)

        this.scorePescados = this.add.text(center_width + 310, center_height - 338, ' 0', { 
            fontFamily: 'Berlin_Sans',
            fontSize: '50px',
            color: 'white' }
            )
        this.scoreCarnes = this.add.text(center_width + 470, center_height - 338, ' 0', { 
            fontFamily: 'Berlin_Sans',
            fontSize: '50px',
            color: 'white' }
            )

        //Tiempo
        this.temporizador = Phaser.Math.Between(20, 60)
        this.scoreTemporizador = this.add.text(center_width , center_height - 355, this.temporizador , { 
            fontFamily: 'Berlin_Sans',
            fontSize: '90px',
            color: 'white' }
            )
        this.funTemporizador()

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

        //Función de daño del dragón
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
        this.corazon_1 = this.physics.add.sprite(center_width - 520 , center_height - 310, 'cora_sprite')
        this.anims.create({
            key: 'corazon_1',
            frames: this.anims.generateFrameNumbers('cora_sprite', {
                frames: [0, 1, 2, 3, 4]
            }),
            repeat: 0,
            frameRate: 6
        })
        this.corazon_2 = this.physics.add.sprite(center_width - 460 , center_height - 310, 'cora_sprite')
        this.anims.create({
            key: 'corazon_2',
            frames: this.anims.generateFrameNumbers('cora_sprite', {
                frames: [0, 1, 2, 3, 4]
            }),
            repeat: 0,
            frameRate: 6
        })
        this.corazon_3 = this.physics.add.sprite(center_width - 400 , center_height - 310, 'cora_sprite')
        this.anims.create({
            key: 'corazon_3',
            frames: this.anims.generateFrameNumbers('cora_sprite', {
                frames: [0, 1, 2, 3, 4]
            }),
            repeat: 0,
            frameRate: 6
        })

        // Tabla de puntajes y contenedores
        this.puntosTemp = this.add.image(center_width , center_height + 30, "punt_add")
        this.textProblema = this.add.text(center_width - 250, center_height - 50, "Kalh ha recolectado: ", {
            fontFamily: 'Berlin_Sans',
            fontSize: '25px',
            color: 'black'
        })
        this.carneProblema = this.add.text(center_width - 160, center_height +65 , '', {
            fontFamily: 'Berlin_Sans',
            fontSize: '40px',
            color: 'black'
        })
        this.pescadoProblema = this.add.text(center_width - 160, center_height  , '', {
            fontFamily: 'Berlin_Sans',
            fontSize: '40px',
            color: 'black'
        })
        this.carneFigProblema = this.add.image(center_width - 200, center_height + 85, 'carne' )
        this.pescadoFigProblema = this.add.image(center_width - 200, center_height + 20, 'pescado' )

        this.preguntaProblema01 = this.add.text(center_width + 30, center_height - 50, "¿Cuánta comida ha ", {
            fontFamily: 'Berlin_Sans',
            fontSize: '25px',
            color: 'black'
        })
        this.preguntaProblema02 = this.add.text(center_width + 45, center_height - 25, "recolectado Kalh ", {
            fontFamily: 'Berlin_Sans',
            fontSize: '25px',
            color: 'black'
        })
        this.preguntaProblema03 = this.add.text(center_width + 85, center_height , "en total? ", {
            fontFamily: 'Berlin_Sans',
            fontSize: '25px',
            color: 'black'
        })

        //Contenedor
        this.contPuntajeTemp = this.add.container(0, -700, [
            this.puntosTemp,
            this.textProblema,
            this.carneProblema,
            this.pescadoProblema,
            this.carneFigProblema,
            this.pescadoFigProblema,
            this.preguntaProblema01,
            this.preguntaProblema02,
            this.preguntaProblema03
        ])
        
        this.tweenPuntaje = this.tweens.createTimeline()
        this.tweenPuntaje.add({
            targets: this.contPuntajeTemp,
            duration: 1500,
            ease: 'Power1',
            y: 0,
        })
        //this.tweenPuntaje.play()
        

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
        
        //Puntaje Carnes
        this.data.setValue('puntajeCarnes', this.data.get('puntajeCarnes')+1)
        this.scoreCarnes.setText(' ' + this.data.get('puntajeCarnes'))
        this.carneProblema.setText('= '+ this.data.get('puntajeCarnes'))

        //Puntaje total
        this.data.setValue('puntaje', this.data.get('puntaje')+1)
        console.log('Puntaje: ' + this.data.get('puntaje'))
        
    }

    puntoPescado(dragon, pescado){
        pescado.disableBody(true,true)

        //Puntaje Pescados
        this.data.setValue('puntajePescados', this.data.get('puntajePescados')+1)
        this.scorePescados.setText(' ' + this.data.get('puntajePescados'))
        this.pescadoProblema.setText('= ' + this.data.get('puntajePescados'))

        //Puntaje total
        this.data.setValue('puntaje', this.data.get('puntaje')+1)
        console.log('Puntaje: ' + this.data.get('puntaje'))
    }

    puntoBomba(dragon, bomba){
        bomba.disableBody(true,true)

        //Contador de vidas
        this.data.setValue('vida', this.data.get('vida')-1)
        this.dragon.anims.play('dragon_dan', true)
        this.contVidas()
    }

    funTemporizador(){
        if(this.data.get('vida') > 0){
            if(this.temporizador > 0){
                this.temporizador = this.temporizador - 1
                this.scoreTemporizador.setText(this.temporizador)
                this.time.delayedCall(1000, this.funTemporizador, [], this);
                if (this.temporizador <= 0){
                    this.dragon.body.setEnable(false)
                    this.tweenPuntaje.play()
                }
            }
        }
        
    }

    contVidas(){
        if (this.data.get('vida') === 2){
            this.corazon_3.anims.play('corazon_3', true)
        } else if (this.data.get('vida') === 1){
            this.corazon_2.anims.play('corazon_2', true)
        } else if (this.data.get('vida') === 0){
            this.corazon_1.anims.play('corazon_1', true)
            this.dragon.anims.play('dragon_muer', true)
            this.dragon.body.setEnable(false)
            this.tweenPuntaje.play()
            
        }
        
    }

    nuevaCarne() {
        if(this.data.get('vida') > 0 && this.temporizador > 0){
            this.carne.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,570), 'carne');
            this.carne.setVelocityX(-200);
            this.carne.checkWorldBounds = true;
            this.carne.outOfBoundsKill = true;
            this.time.delayedCall(1000, this.nuevaCarne, [], this);
            this.physics.add.overlap(this.dragon, this.carne, this.puntoCarne, null, this);
        }
        
    }

    nuevaPescado() {
        if(this.data.get('vida')> 0 && this.temporizador > 0) {
            this.pescado.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,570), 'pescado');
            this.pescado.setVelocityX(-200);
            this.pescado.checkWorldBounds = true;
            this.pescado.outOfBoundsKill = true;
            this.time.delayedCall(2500, this.nuevaPescado, [], this);
            this.physics.add.overlap(this.dragon, this.pescado, this.puntoPescado, null, this);
        }
    }

    nuevaBomba() {
        if(this.data.get('vida')> 0 && this.temporizador > 0){
            this.bomba.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,570), 'bomba');
            this.bomba.setVelocityX(-200);
            this.bomba.checkWorldBounds = true;
            this.bomba.outOfBoundsKill = true;
            this.time.delayedCall(4000, this.nuevaBomba, [], this);
            this.physics.add.overlap(this.dragon, this.bomba, this.puntoBomba, null, this);
        }
        
    }

    danoComplete(animation, frame, sprite){
        if (animation.key === 'dragon_dan') {
            this.dragon.play('dragon_mov');
        }
    }


}

export default Add_scene