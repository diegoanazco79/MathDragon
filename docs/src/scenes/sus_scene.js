class Sus_scene extends Phaser.Scene{
    constructor(){
        super({key: "Sus_scene"})
    }

    preload(){
          //Fondo
          this.load.image("fondov3_sus", "./assets/fondov3.png")
          this.load.image("marco_sus", "./assets/marco-sus.png")
          this.load.image("barra_sus", "./assets/barra.png")
  
          //Formulario
          this.load.html('form', "./assets/respuesta.html")
          
          //Dragon
          this.load.image("dragon", "./assets/dragon.png")
          this.load.spritesheet("mov_dragon", "./assets/mov_sprite.png", { frameWidth: 120, frameHeight: 120})
          this.load.spritesheet("mov_fuego_dragon", "./assets/mov_fuego_sprite.png", { frameWidth: 250, frameHeight: 125})
          this.load.spritesheet("dan_dragon", "./assets/dan_sprite.png", { frameWidth: 120, frameHeight: 120})
          this.load.spritesheet("muer_dragon", "./assets/muerte_sprite.png", { frameWidth: 120, frameHeight: 120})
          this.load.spritesheet("cora_sprite", "./assets/cora_sprite.png", { frameWidth: 56, frameHeight: 56})
          
          //Vidas
          this.load.image("corazon", "./assets/corazon.png")
  
          //Tiempo
          this.load.image("tiempo", "./assets/tiempo.png")
  
          //Pistas
          this.load.image("pistas", "./assets/pistas-marco.png")
  
          //Ganador
          this.load.image("msj_ganador", "./assets/marco-ganador.png")
  
          //Obstaculos
          this.load.image("veneno", "./assets/veneno.png")
          this.load.image("pescado", "./assets/pescado.png")
          this.load.image("bomba", "./assets/bomba.png")
          
          //Puntuaciones
          this.load.image("punt_add", "./assets/puntuaciones-marco.png")
          this.load.image("punt_razon", "./assets/puntuaciones-marco-razon.png")
          this.load.image("btn_menu", "./assets/btn_menu.png")
          this.load.image("btn_reset", "./assets/btn_reset.png")
    }

    create(){

        //Dimensiones
        let center_width = this.sys.game.config.width/2
        let center_height = this.sys.game.config.height/2        
        
        //Fondo
        this.barra = this.physics.add.image(center_width + 300, center_height, "barra_sus").setImmovable(true)
        this.fondo = this.add.image(center_width, center_height, "fondov3_sus")
        this.marco = this.physics.add.image(center_width, center_height-305, "marco_sus").setImmovable(true)
        
        //Datos del videojuego
        this.data.set('puntaje', 0)
        this.data.set('puntajeVenenos', 0)
        this.data.set('vida', 3)
        this.data.set('temporizador', Phaser.Math.Between(20,30))
        this.data.set('venenosMaximo', Phaser.Math.Between(30,60))
        this.data.set('pistas', 0)
        this.data.set('puntajeGanadorTemp', this.data.get('venenosMaximo'))

        //Datos del tablero
        this.scoreVenenosMax = this.add.text(center_width + 310, center_height - 338, `${this.data.get('venenosMaximo')} /`, { 
            fontFamily: 'Berlin_Sans',
            fontSize: '50px',
            color: 'white' }
            )

        this.scoreVenenos = this.add.text(center_width + 380, center_height - 338, ' 0', { 
            fontFamily: 'Berlin_Sans',
            fontSize: '50px',
            color: 'white' }
            )

        //Tiempo
        this.scoreTemporizador = this.add.text(center_width , center_height - 355, this.data.get('temporizador') , { 
            fontFamily: 'Berlin_Sans',
            fontSize: '90px',
            color: 'white' }
            )
        this.funTemporizador()

        //Dragon
        this.dragon = this.physics.add.sprite(200 ,center_height, 'mov_fuego_dragon')
        this.physics.add.collider(this.dragon, this.marco)
        this.physics.add.collider(this.dragon, this.barra)

        //Dragon: Animación vuelo
        this.anims.create({
            key: 'mov_fuego_dragon',
            frames: this.anims.generateFrameNumbers('mov_fuego_dragon', {
                frames: [0, 1, 2]
            }),
            repeat: -1,
            frameRate: 8
        })
        this.dragon.setCollideWorldBounds(true)
        this.dragon.anims.play('mov_fuego_dragon')
        this.anims.create({
            key: 'dragon_mov',
            frames: this.anims.generateFrameNumbers('mov_dragon', {
                frames: [0, 1, 2, 3]
            }),
            repeat: -1,
            frameRate: 8
        })

        //Dragon: Animación daño
        this.anims.create({
            key: 'dragon_dan',
            frames: this.anims.generateFrameNumbers('dan_dragon', {
                frames: [0, 1, 2]
            }),
            repeat: 1,
            frameRate: 8
        })

        //Dragon: Animación muerte
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

        //Bombas
        this.bomba = this.physics.add.group()
        this.nuevaBomba()

        //Venenos
        this.veneno = this.physics.add.group()
        this.nuevaVeneno()

        //Controles
        this.cursor = this.input.keyboard.createCursorKeys()
        this.Wkey = this.input.keyboard.addKey('W')
        this.Akey = this.input.keyboard.addKey('A')
        this.Skey = this.input.keyboard.addKey('S')
        this.Dkey = this.input.keyboard.addKey('D')

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

        // Tabla de puntajes (tweens, y contenedores)
        this.puntosTemp = this.add.image(center_width , center_height + 30, "punt_add")
        this.textProblema01 = this.add.text(center_width - 240, center_height - 50, "Kalh debía destrozar: ", {
            fontFamily: 'Berlin_Sans',
            fontSize: '25px',
            color: '#311D0F'
        })
        this.textProblema02 = this.add.text(center_width - 240, center_height + 40, "Kalh destrozó: ", {
            fontFamily: 'Berlin_Sans',
            fontSize: '25px',
            color: '#311D0F'
        })
        this.venenoProblemaMax = this.add.text(center_width - 150, center_height - 10 , `= ${this.data.get('venenosMaximo')}`, {
            fontFamily: 'Berlin_Sans',
            fontSize: '40px',
            color: '#311D0F'
        })
        this.venenoProblema = this.add.text(center_width - 150, center_height + 75  , `= 0`, {
            fontFamily: 'Berlin_Sans',
            fontSize: '40px',
            color: '#311D0F'
        })
        this.venenoFigProblema01 = this.add.image(center_width - 180, center_height + 5, 'veneno' )
        this.venenoFigProblema02 = this.add.image(center_width - 180, center_height + 90, 'veneno' )
        
        const configTextProblema = {
            x: center_width + 30,
            y: center_height - 50, 
            text: "¿Cuántas botellas de\nveneno le faltó\ndestrozar a Kalh?",
            style:{
                fontFamily: 'Berlin_Sans',
                fontSize: '25px',
                align: 'center',
                color: '#311D0F'
            }
        }

        this.preguntaProblema = this.make.text(configTextProblema)
        this.respuestaFinal = this.add.dom(center_width + 135,center_height + 55 ).createFromCache('form')

        this.contPuntajeTemp = this.add.container(0, -700, [
            this.puntosTemp,
            this.textProblema01,
            this.textProblema02,
            this.venenoProblema,
            this.venenoProblemaMax,
            this.venenoFigProblema01,
            this.venenoFigProblema02,
            this.preguntaProblema,
            this.respuestaFinal,

        ])
        
        this.tweenPuntaje = this.tweens.createTimeline()
        this.tweenPuntaje.add({
            targets: this.contPuntajeTemp,
            duration: 1500,
            ease: 'Power1',
            y: 0,
        })

        this.tweenPuntajeRetirada = this.tweens.createTimeline()
        this.tweenPuntajeRetirada.add({
            targets: this.contPuntajeTemp,
            duration: 1500,
            ease: 'Power1',
            x: -1000,
        })

        //Tabla de razón de juego - Vidas (tweens y contenedores)
        this.puntosRazonVidas = this.add.image(center_width , center_height - 120, "punt_razon")
        this.corazonRazon01 = this.add.image(center_width - 130, center_height - 130, "corazon").setScale(0.4)
        this.corazonRazon02 = this.add.image(center_width + 133, center_height - 130, "corazon").setScale(0.4)
        this.textRazonVidas = this.add.text(center_width - 115 , center_height - 130, "¡Kalh no tiene vidas!", {
            fontFamily: 'Berlin_Sans',
            fontSize: '28px',
            color: '#311D0F'
        })

        this.contRazonVidas = this.add.container(0, -700, [
            this.puntosRazonVidas,
            this.corazonRazon01,
            this.corazonRazon02,
            this.textRazonVidas
        ])

        this.tweenVidas = this.tweens.createTimeline()
        this.tweenVidas.add({
            targets: this.contRazonVidas,
            duration: 1500,
            ease: 'Power1',
            y: 0,
        })

        this.tweenVidasRetirada = this.tweens.createTimeline()
        this.tweenVidasRetirada.add({
            targets: this.contRazonVidas,
            duration: 1500,
            ease: 'Power1',
            x: -1000,
        })


        //Tabla de razon de juego - Tiempo (tweens y contenedores)
        this.puntosRazonTiempo = this.add.image(center_width , center_height - 120, "punt_razon")
        this.tiempoRazon01 = this.add.image(center_width - 130, center_height - 130, "tiempo")
        this.tiempoRazon02 = this.add.image(center_width + 130, center_height - 130, "tiempo")
        this.textRazonTiempo = this.add.text(center_width - 118 , center_height - 130, "¡Se acabó el tiempo!", {
            fontFamily: 'Berlin_Sans',
            fontSize: '28px',
            color: '#311D0F'
        })

        this.contRazonTiempo = this.add.container(0, -700 , [
            this.puntosRazonTiempo,
            this.tiempoRazon01,
            this.tiempoRazon02,
            this.textRazonTiempo
        ])

        this.tweenTiempo = this.tweens.createTimeline()
        this.tweenTiempo.add({
            targets: this.contRazonTiempo,
            duration: 1500,
            ease: 'Power1',
            y:0
        })

        this.tweenTiempoRetirada = this.tweens.createTimeline()
        this.tweenTiempoRetirada.add({
            targets: this.contRazonTiempo,
            duration: 1500,
            ease: 'Power1',
            x: -1000
        })

        // Pista N°1 (objetos, contenedores, tweens)
        this.marcoPistas01 = this.add.image(center_width, center_height + 180, "pistas")
        this.textPista01 = this.add.text(center_width - 185, center_height + 167, " Pista 01 - Pista 01 - Pista01- Pista", {
                fontFamily: 'Berlin_Sans',
                fontSize: '26px',
                color: '#311D0F'
            })
        // this.textPista01b = this.add.text(center_width + 140, center_height + 167, "y", {
        //     fontFamily: 'Berlin_Sans',
        //     fontSize: '22px',
        //     color: '#311D0F'
        // })
        // this.pescadoPïsta01 = this.add.image(center_width + 120, center_height + 180, 'pescado').setScale(0.75)
        // this.carnePista01 = this.add.image(center_width + 170, center_height + 180, 'carne' ).setScale(0.75)
    
        this.contPista01 = this.add.container(1000, 0, [
            this.marcoPistas01,
            this.textPista01,
            // this.textPista01b,
            // this.pescadoPïsta01,
            // this.carnePista01
        ])

        this.tweenPista01 = this.tweens.createTimeline()
        this.tweenPista01.add({
            targets: this.contPista01,
            duration: 1500,
            ease: 'Power1',
            x:0
        })

        this.tweenPista01Retirada = this.tweens.createTimeline()
        this.tweenPista01Retirada.add({
            targets: this.contPista01,
            duration: 1500,
            ease: 'Power1',
            x:-1000
        })

        // Pista N°2 (objetos, contenedores, tweens)
        this.marcoPistas02 = this.add.image(center_width, center_height + 245, "pistas")
        this.textPista02 = this.add.text(center_width - 165, center_height + 220, "¿Verificaste la resta que\n hiciste?", {
            fontFamily: 'Berlin_Sans',
            fontSize: '24px',
            color: '#311D0F',
            align: 'center'
        })
        this.pistaVenenoMax = this.add.text(center_width + 90, center_height + 225 ,this.data.get('venenosMaximo') , {
            fontFamily: 'Berlin_Sans',
            fontSize: '35px',
            color: '#311D0F'
        })
        this.pistaVeneno = this.add.text(center_width + 150, center_height + 225 , '', {
            fontFamily: 'Berlin_Sans',
            fontSize: '35px',
            color: '#311D0F'
        })
        this.pistaOperación = this.add.text(center_width + 130, center_height + 225 , '-', {
            fontFamily: 'Berlin_Sans',
            fontSize: '35px',
            color: '#311D0F'
        })

        this.contPista02 = this.add.container(1000, 0, [
            this.marcoPistas02,
            this.textPista02,
            this.pistaVenenoMax,
            this.pistaVeneno,
            this.pistaOperación
        ])

        this.tweenPista02 = this.tweens.createTimeline()
        this.tweenPista02.add({
            targets: this.contPista02,
            duration: 1500,
            ease: 'Power1',
            x:0
        })
        this.tweenPista02Retirada = this.tweens.createTimeline()
        this.tweenPista02Retirada.add({
            targets: this.contPista02,
            duration: 1500,
            ease: 'Power1',
            x:-1000
        })

        //Marco del mensaje ganador (objetos, contenedores, tweens)
        this.marcoGanador = this.add.image(center_width, center_height, "msj_ganador")
        this.dragonGanador = this.physics.add.sprite(center_width - 180 ,center_height, 'mov_dragon')
       
        this.msjGanaste = this.add.text(center_width - 100, center_height - 60, "¡LO LOGRASTE!", {
            fontFamily: 'Berlin_Sans',
            fontSize: '50px',
            color: '#311D0F'
        })

        this.btn_menu = this.add.sprite( center_width + 20 , center_height + 40, 'btn_menu')
        .setInteractive()
        .on('pointerover', () =>  this.btn_menu.setScale(1.1))
        .on('pointerout', () => this.btn_menu.setScale( 1 ))
        .on('pointerdown', () => this.scene.start("Niveles_scene"))

        this.btn_reset = this.add.sprite( center_width + 110 , center_height + 40, 'btn_reset')
        .setInteractive()
        .on('pointerover', () =>  this.btn_reset.setScale(1.1))
        .on('pointerout', () => this.btn_reset.setScale( 1 ))
        .on('pointerdown', () => this.scene.restart())
    
        this.contMarcoGanador = this.add.container(1000, 0, [
            this.marcoGanador,
            this.dragonGanador,
            this.msjGanaste,
            this.btn_menu,
            this.btn_reset
        ])

        this.tweenGanador = this.tweens.createTimeline()
        this.tweenGanador.add({
            targets: this.contMarcoGanador,
            duration: 1500,
            ease: 'Power1',
            x:0
        })

        //Marco del mensaje perdedor (objetos, contenedores, tweens)
        this.marcoReset = this.add.image(center_width, center_height, "msj_ganador")
        this.dragonReset = this.physics.add.sprite(center_width - 160 ,center_height, 'mov_dragon')

        const configTextMsjReset = {
            x: center_width -50,
            y: center_height -80,
            text: "¡Volvamos a\n intentarlo! ",
            style:{
                fontFamily: 'Berlin_Sans',
                fontSize: '45px',
                align: 'center',
                color: '#311D0F'
            }
        }

        this.msjReset = this.make.text(configTextMsjReset)
        this.btn_menuReset = this.add.sprite( center_width + 20 , center_height + 55, 'btn_menu')
        .setInteractive()
        .on('pointerover', () =>  this.btn_menuReset.setScale(1.1))
        .on('pointerout', () => this.btn_menuReset.setScale( 1 ))
        .on('pointerdown', () => this.scene.start("Niveles_scene"))

        this.btn_resetReset = this.add.sprite( center_width + 110 , center_height + 55, 'btn_reset')
        .setInteractive()
        .on('pointerover', () =>  this.btn_resetReset.setScale(1.1))
        .on('pointerout', () => this.btn_resetReset.setScale( 1 ))
        .on('pointerdown', () => this.scene.restart())
      
        this.contMarcoReset = this.add.container(1000,0, [
            this.marcoReset,
            this.dragonReset,
            this.msjReset,
            this.btn_resetReset,
            this.btn_menuReset
        ])

        this.tweenReset = this.tweens.createTimeline()
        this.tweenReset.add({
            targets:this.contMarcoReset,
            duration:1500,
            ease: 'Power1',
            x:0
        })       
    }

    update(){
        //Movimiento del Dragon
        if(this.cursor.down.isDown || this.Skey.isDown){
            this.dragon.body.setVelocityY(150)
        } else if (this.cursor.up.isDown || this.Wkey.isDown) {
            this.dragon.body.setVelocityY(-150)
        } else if (this.cursor.left.isDown || this.Akey.isDown){
            this.dragon.body.setVelocityX(-250)
        } else if (this.cursor.right.isDown || this.Dkey.isDown){
            this.dragon.body.setVelocityX(250)
        } else{
            this.dragon.body.setVelocityX(0)
            this.dragon.body.setVelocityY(0)
        }
    }

    funTemporizador(){
        var puntaje_temp = this.data.get('puntajeGanadorTemp')
        var respuesta_temp
        var cartelPista01Retirada = this.tweenPista01Retirada
        var cartelPista02Retirada = this.tweenPista02Retirada
        var retirada_puntaje = this.tweenPuntajeRetirada
        var retirada_tiempo = this.tweenTiempoRetirada
        var dragonGanador = this.dragonGanador
        var marcoGanador = this.tweenGanador
        var dragon = this.dragon
        var cartelPista01 = this.tweenPista01
        var cartelPista02 = this.tweenPista02
        var marcoReset = this.tweenReset
        var dragonReset = this.dragonReset
        var temp_pistas = 0
        if(this.data.get('vida') > 0){
            if(this.data.get('temporizador') > 0){
                this.data.setValue('temporizador', this.data.get('temporizador') - 1) 
                this.scoreTemporizador.setText(this.data.get('temporizador'))
                this.time.delayedCall(1000, this.funTemporizador, [], this);
                if (this.data.get('temporizador') <= 0){
                    this.dragon.body.setEnable(false)
                    this.tweenPuntaje.play()
                    this.tweenTiempo.play()
                    this.respuestaFinal.addListener('keypress')
                    this.respuestaFinal.addListener('click')
                    this.respuestaFinal.on('click', function (event) {
                        if(event.target.name === 'enviar'){
                            respuesta_temp = this.getChildByName('respuesta').value
                            if(puntaje_temp == respuesta_temp){
                                retirada_puntaje.play()
                                retirada_tiempo.play()
                                cartelPista01Retirada.play()
                                cartelPista02Retirada.play()
                                marcoGanador.play()
                                dragonGanador.anims.play('dragon_mov')
                                dragon.body.reset(1400,400)
                            } else {
                                cartelPista01.play()
                                if(event.target.name === 'enviar'){
                                    temp_pistas ++ 
                                    respuesta_temp = this.getChildByName('respuesta').value
                                    if (temp_pistas == 1)
                                    {
                                        console.log("VUELVE A INTENTARLO")
                                    } else if ( temp_pistas == 2) {
                                        cartelPista02.play()
                                        console.log("VUELVE A INTENTARLO")
                                    } else {
                                        retirada_puntaje.play()
                                        retirada_tiempo.play()
                                        cartelPista01Retirada.play()
                                        cartelPista02Retirada.play()
                                        dragon.body.reset(1400,400)
                                        marcoReset.play()
                                        dragonReset.anims.play('dragon_mov')
                                    }
                                }
                            }
                        }
                    })
                    this.respuestaFinal.on('keypress', function (event) {
                        if(event.key === 'Enter'){
                            respuesta_temp = this.getChildByName('respuesta').value
                            if(puntaje_temp == respuesta_temp){
                                retirada_puntaje.play()
                                retirada_tiempo.play()
                                cartelPista01Retirada.play()
                                cartelPista02Retirada.play()
                                marcoGanador.play()
                                dragonGanador.anims.play('dragon_mov')
                                dragon.body.reset(1400,400)
                            } else {
                                cartelPista01.play()
                                if(event.key === 'Enter'){
                                    temp_pistas ++ 
                                    respuesta_temp = this.getChildByName('respuesta').value
                                    if (temp_pistas == 1)
                                    {
                                        console.log("VUELVE A INTENTARLO")
                                    } else if ( temp_pistas == 2) {
                                        cartelPista02.play()
                                        console.log("VUELVE A INTENTARLO")
                                    } else {
                                        retirada_puntaje.play()
                                        retirada_tiempo.play()
                                        cartelPista01Retirada.play()
                                        cartelPista02Retirada.play()
                                        dragon.body.reset(1400,400)
                                        marcoReset.play()
                                        dragonReset.anims.play('dragon_mov')
                                    }
                                }
                            }
                        }
                    })

                }
            }
        }
        
    }

    contVidas(){
        var puntaje_temp = this.data.get('puntajeGanadorTemp')
        var respuesta_temp
        var temp_pistas = 0
        var cartelPista01 = this.tweenPista01
        var cartelPista02 = this.tweenPista02
        var retirada_puntaje = this.tweenPuntajeRetirada
        var retirada_vida = this.tweenVidasRetirada 
        var cartelPista01Retirada = this.tweenPista01Retirada
        var cartelPista02Retirada = this.tweenPista02Retirada
        var dragonGanador = this.dragonGanador
        var marcoGanador = this.tweenGanador
        var dragonReset = this.dragonReset
        var marcoReset = this.tweenReset
        var dragon = this.dragon
        if (this.data.get('vida') === 2){
            this.corazon_3.anims.play('corazon_3', true)
        } else if (this.data.get('vida') === 1){
            this.corazon_2.anims.play('corazon_2', true)
        } else if (this.data.get('vida') === 0){
            this.corazon_1.anims.play('corazon_1', true)
            this.dragon.anims.play('dragon_muer', true)
            this.dragon.body.setEnable(false)
            this.tweenPuntaje.play()
            this.tweenVidas.play()
            this.respuestaFinal.addListener('keypress')
            this.respuestaFinal.addListener('click')
            this.respuestaFinal.on('click', function (event) {
                if(event.target.name === 'enviar'){
                    respuesta_temp = this.getChildByName('respuesta').value
                    if(puntaje_temp == respuesta_temp){
                        retirada_puntaje.play()
                        retirada_vida.play()
                        cartelPista01Retirada.play()
                        cartelPista02Retirada.play()
                        marcoGanador.play()
                        dragonGanador.anims.play('dragon_mov')
                        dragon.body.reset(1400,400)
                        console.log("GANASTE")
                    } else {
                        cartelPista01.play()
                        if(event.target.name === 'enviar'){
                            temp_pistas ++ 
                            respuesta_temp = this.getChildByName('respuesta').value
                            if (temp_pistas == 1)
                            {
                                console.log("VUELVE A INTENTARLO")
                            } else if ( temp_pistas == 2) {
                                cartelPista02.play()
                                console.log("VUELVE A INTENTARLO")
                            } else {
                                console.log("JUEGO TERMINADO")
                                retirada_puntaje.play()
                                retirada_vida.play()
                                cartelPista01Retirada.play()
                                cartelPista02Retirada.play()
                                dragon.body.reset(1400,400)
                                marcoReset.play()
                                dragonReset.anims.play('dragon_mov')                               
                            }
                        }
                    }
                }
            })
            this.respuestaFinal.on('keypress', function (event) {
                if(event.key === 'Enter'){
                    respuesta_temp = this.getChildByName('respuesta').value
                    if(puntaje_temp == respuesta_temp){
                        retirada_puntaje.play()
                        retirada_vida.play()
                        cartelPista01Retirada.play()
                        cartelPista02Retirada.play()
                        marcoGanador.play()
                        dragonGanador.anims.play('dragon_mov')
                        dragon.body.reset(1400,400)
                        console.log("GANASTE")
                    } else {
                        cartelPista01.play()
                        if(event.key === 'Enter'){
                            temp_pistas ++ 
                            respuesta_temp = this.getChildByName('respuesta').value
                            if (temp_pistas == 1)
                            {
                                console.log("VUELVE A INTENTARLO")
                            } else if ( temp_pistas == 2) {
                                cartelPista02.play()
                                console.log("VUELVE A INTENTARLO")
                            } else {
                                console.log("JUEGO TERMINADO")
                                retirada_puntaje.play()
                                retirada_vida.play()
                                cartelPista01Retirada.play()
                                cartelPista02Retirada.play()
                                dragon.body.reset(1400,400)
                                marcoReset.play()
                                dragonReset.anims.play('dragon_mov')                               
                            }
                        }
                    }
                }
            })
        }
    }

    danoComplete(animation, frame, sprite){
        if (animation.key === 'dragon_dan') {
            this.dragon.play('mov_fuego_dragon');
        }
    }

    nuevaBomba(){
        if(this.data.get('vida')> 0 && this.data.get('temporizador') > 0){
            this.bomba.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,680), 'bomba');
            this.bomba.setVelocityX(-200);
            this.bomba.checkWorldBounds = true;
            this.bomba.outOfBoundsKill = true;
            this.time.delayedCall(3000, this.nuevaBomba, [], this);
            this.physics.add.overlap(this.dragon, this.bomba, this.puntoBomba, null, this);
        }
    }

    nuevaVeneno(){
        if(this.data.get('vida')> 0 && this.data.get('temporizador') > 0){
            this.veneno.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,680), 'veneno');
            this.veneno.setVelocityX(-200);
            this.veneno.checkWorldBounds = true;
            this.veneno.outOfBoundsKill = true;
            this.time.delayedCall(1000, this.nuevaVeneno, [], this);
            this.physics.add.overlap(this.dragon, this.veneno, this.puntoVeneno, null, this);
        }
    }

    puntoBomba(dragon, bomba) {
        bomba.disableBody(true,true)
        this.data.setValue('vida', this.data.get('vida')-1)
        this.dragon.anims.play('dragon_dan', true)
        this.contVidas()
    }

    puntoVeneno(dragon, veneno){
        veneno.disableBody(true,true)
        this.data.setValue('puntajeVenenos', this.data.get('puntajeVenenos')+1)
        this.data.setValue('puntajeGanadorTemp', this.data.get('puntajeGanadorTemp') - 1)
        this.venenoProblema.setText('= ' + this.data.get('puntajeVenenos'))
        this.scoreVenenos.setText(' ' + this.data.get('puntajeVenenos'))
        this.pistaVeneno.setText(this.data.get('puntajeVenenos'))
    }

}

