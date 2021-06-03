class Add_scene extends Phaser.Scene{
    constructor(){
        super({key: "Add_scene"})
    }

    preload(){
          //Fondo
          this.load.image("fondov3", "./assets/fondov3.png")
          this.load.image("marco", "./assets/marcov3.png")
          this.load.image("barra", "./assets/barra.png")
  
          //Formulario
          this.load.html('form', "./assets/respuesta.html")
          
          //Dragon
          this.load.image("dragon", "./assets/dragon.png")
          this.load.spritesheet("mov_dragon", "./assets/mov_sprite.png", { frameWidth: 120, frameHeight: 120})
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
          this.load.image("carne", "./assets/carne.png")
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
        this.barra = this.physics.add.image(center_width + 300, center_height, "barra").setImmovable(true)
        this.fondo = this.add.image(center_width, center_height, "fondov3")
        this.marco = this.physics.add.image(center_width, center_height-305, "marco").setImmovable(true)
        
        
        //Datos del videojuego
        this.data.set('puntaje', 0)
        this.data.set('puntajeCarnes', 0)
        this.data.set('puntajePescados', 0)
        this.data.set('vida', 3)
        this.data.set('temporizador', Phaser.Math.Between(20,40))
        this.data.set('pistas', 0)
        

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
        this.scoreTemporizador = this.add.text(center_width , center_height - 355, this.data.get('temporizador') , { 
            fontFamily: 'Berlin_Sans',
            fontSize: '90px',
            color: 'white' }
            )
        this.funTemporizador()

        //Dragon
        this.dragon = this.physics.add.sprite(200 ,center_height, 'mov_dragon')
        this.physics.add.collider(this.dragon, this.marco)
        this.physics.add.collider(this.dragon, this.barra)
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
        this.textProblema = this.add.text(center_width - 240, center_height - 50, "Kalh ha recolectado: ", {
            fontFamily: 'Berlin_Sans',
            fontSize: '25px',
            color: '#311D0F'
        })
        this.carneProblema = this.add.text(center_width - 130, center_height +50 , '= 0', {
            fontFamily: 'Berlin_Sans',
            fontSize: '40px',
            color: '#311D0F'
        })
        this.pescadoProblema = this.add.text(center_width - 130, center_height - 10 , '= 0', {
            fontFamily: 'Berlin_Sans',
            fontSize: '40px',
            color: '#311D0F'
        })
        this.carneFigProblema = this.add.image(center_width - 170, center_height + 70, 'carne' )
        this.pescadoFigProblema = this.add.image(center_width - 170, center_height + 15, 'pescado' )
        
        const configTextProblema = {
            x: center_width + 30,
            y: center_height - 55, 
            text: "¿Cuánta comida ha\nrecolectado Kalh\nen total?",
            style:{
                fontFamily: 'Berlin_Sans',
                fontSize: '25px',
                align: 'center',
                color: '#311D0F'
            }
        }

        this.preguntaProblema = this.make.text(configTextProblema)



        //Input: Respuesta
        this.respuestaFinal = this.add.dom(center_width + 135,center_height + 55 ).createFromCache('form')

       
        //Contenedor tabla de puntuaciones
        this.contPuntajeTemp = this.add.container(0, -700, [
            this.puntosTemp,
            this.textProblema,
            this.carneProblema,
            this.pescadoProblema,
            this.carneFigProblema,
            this.pescadoFigProblema,
            this.preguntaProblema,
            this.respuestaFinal,

        ])
        
        //Tween contenedor de puntajes
        this.tweenPuntaje = this.tweens.createTimeline()
        this.tweenPuntaje.add({
            targets: this.contPuntajeTemp,
            duration: 1500,
            ease: 'Power1',
            y: 0,
        })

        //Tween retirada: Contenedor de puntajes
        this.tweenPuntajeRetirada = this.tweens.createTimeline()
        this.tweenPuntajeRetirada.add({
            targets: this.contPuntajeTemp,
            duration: 1500,
            ease: 'Power1',
            x: -1000,
        })


        //Tabla de razón de juego - Vidas
        this.puntosRazonVidas = this.add.image(center_width , center_height - 120, "punt_razon")
        this.corazonRazon01 = this.add.image(center_width - 130, center_height - 130, "corazon").setScale(0.4)
        this.corazonRazon02 = this.add.image(center_width + 133, center_height - 130, "corazon").setScale(0.4)
        this.textRazonVidas = this.add.text(center_width - 115 , center_height - 130, "¡Kalh no tiene vidas!", {
            fontFamily: 'Berlin_Sans',
            fontSize: '28px',
            color: '#311D0F'
        })

        //Contenedor: Tabla razon juego - Vidas
        this.contRazonVidas = this.add.container(0, -700, [
            this.puntosRazonVidas,
            this.corazonRazon01,
            this.corazonRazon02,
            this.textRazonVidas
        ])

        //Tween contenedor razon juego - Vidas
        this.tweenVidas = this.tweens.createTimeline()
        this.tweenVidas.add({
            targets: this.contRazonVidas,
            duration: 1500,
            ease: 'Power1',
            y: 0,
        })

        //Tween retirada: contenedor razon juego - vidas
        this.tweenVidasRetirada = this.tweens.createTimeline()
        this.tweenVidasRetirada.add({
            targets: this.contRazonVidas,
            duration: 1500,
            ease: 'Power1',
            x: -1000,
        })


       
        //Tabla de razon de juego - Tiempo
        this.puntosRazonTiempo = this.add.image(center_width , center_height - 120, "punt_razon")
        this.tiempoRazon01 = this.add.image(center_width - 130, center_height - 130, "tiempo")
        this.tiempoRazon02 = this.add.image(center_width + 130, center_height - 130, "tiempo")
        this.textRazonTiempo = this.add.text(center_width - 118 , center_height - 130, "¡Se acabó el tiempo!", {
            fontFamily: 'Berlin_Sans',
            fontSize: '28px',
            color: '#311D0F'
        })

        //Contenedor: Tabla razon juego - Tiempo
        this.contRazonTiempo = this.add.container(0, -700 , [
            this.puntosRazonTiempo,
            this.tiempoRazon01,
            this.tiempoRazon02,
            this.textRazonTiempo
        ])

        //Tween contenedor razon juego - Tiempo
        this.tweenTiempo = this.tweens.createTimeline()
        this.tweenTiempo.add({
            targets: this.contRazonTiempo,
            duration: 1500,
            ease: 'Power1',
            y:0
        })

        //Tween retirada: contenedor razon juego - Tiempo
        this.tweenTiempoRetirada = this.tweens.createTimeline()
        this.tweenTiempoRetirada.add({
            targets: this.contRazonTiempo,
            duration: 1500,
            ease: 'Power1',
            x: -1000
        })

        // Objetos de Pista 01
        this.marcoPistas01 = this.add.image(center_width, center_height + 180, "pistas")
        this.textPista01 = this.add.text(center_width - 185, center_height + 167, "¿Uniste las dos cantidades?", {
                fontFamily: 'Berlin_Sans',
                fontSize: '26px',
                color: '#311D0F'
            })
        this.textPista01b = this.add.text(center_width + 140, center_height + 167, "y", {
            fontFamily: 'Berlin_Sans',
            fontSize: '22px',
            color: '#311D0F'
        })
        this.pescadoPïsta01 = this.add.image(center_width + 120, center_height + 180, 'pescado').setScale(0.75)
        this.carnePista01 = this.add.image(center_width + 170, center_height + 180, 'carne' ).setScale(0.75)
    

        //Contenedor: Pista01
        this.contPista01 = this.add.container(1000, 0, [
            this.marcoPistas01,
            this.textPista01,
            this.textPista01b,
            this.pescadoPïsta01,
            this.carnePista01
        ])

        //Tween contenedor: Pista 01
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


        // Objetos de Pista 02
        this.marcoPistas02 = this.add.image(center_width, center_height + 245, "pistas")
        this.textPista02 = this.add.text(center_width - 165, center_height + 220, "¿Verificaste la suma que\n hiciste?", {
            fontFamily: 'Berlin_Sans',
            fontSize: '24px',
            color: '#311D0F',
            align: 'center'
        })
        this.pistaPescado = this.add.text(center_width + 95, center_height + 225 , '', {
            fontFamily: 'Berlin_Sans',
            fontSize: '35px',
            color: '#311D0F'
        })
        this.pistaCarne = this.add.text(center_width + 150, center_height + 225 , '', {
            fontFamily: 'Berlin_Sans',
            fontSize: '35px',
            color: '#311D0F'
        })
        this.pistaOperación = this.add.text(center_width + 130, center_height + 225 , '+', {
            fontFamily: 'Berlin_Sans',
            fontSize: '35px',
            color: '#311D0F'
        })
        //Contenedor: Pista02
        this.contPista02 = this.add.container(1000, 0, [
            this.marcoPistas02,
            this.textPista02,
            this.pistaPescado,
            this.pistaCarne,
            this.pistaOperación
        ])
        //Tween contenedor: Pista 02
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


        //Marco Ganador
        this.marcoGanador = this.add.image(center_width, center_height, "msj_ganador")
        //Dragon Ganador
        this.dragonGanador = this.physics.add.sprite(center_width - 180 ,center_height, 'mov_dragon')
       
        //Mensaje de Ganaste
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
    

        //Contenedor: Marco Ganador
        this.contMarcoGanador = this.add.container(1000, 0, [
            this.marcoGanador,
            this.dragonGanador,
            this.msjGanaste,
            this.btn_menu,
            this.btn_reset
        ])

        //Tween contenedor: Marco Ganador
        this.tweenGanador = this.tweens.createTimeline()
        this.tweenGanador.add({
            targets: this.contMarcoGanador,
            duration: 1500,
            ease: 'Power1',
            x:0
        })
        
        //Marco Reset
        this.marcoReset = this.add.image(center_width, center_height, "msj_ganador")
        //Dragon Reset
        this.dragonReset = this.physics.add.sprite(center_width - 160 ,center_height, 'mov_dragon')
        //Mensaje Reset

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
      

        //Contenedor: Marco Reset
        this.contMarcoReset = this.add.container(1000,0, [
            this.marcoReset,
            this.dragonReset,
            this.msjReset,
            this.btn_resetReset,
            this.btn_menuReset
        ])

        //Tween contenedor: Marco Reset
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
        this.pistaCarne.setText(this.data.get('puntajeCarnes'))

        //Puntaje total
        this.data.setValue('puntaje', this.data.get('puntaje')+1)
        
    }

    puntoPescado(dragon, pescado){
        pescado.disableBody(true,true)

        //Puntaje Pescados
        this.data.setValue('puntajePescados', this.data.get('puntajePescados')+1)
        this.scorePescados.setText(' ' + this.data.get('puntajePescados'))
        this.pescadoProblema.setText('= ' + this.data.get('puntajePescados'))
        this.pistaPescado.setText(this.data.get('puntajePescados'))

        //Puntaje total
        this.data.setValue('puntaje', this.data.get('puntaje')+1)
    }

    puntoBomba(dragon, bomba){
        bomba.disableBody(true,true)

        //Contador de vidas
        this.data.setValue('vida', this.data.get('vida')-1)
        this.dragon.anims.play('dragon_dan', true)
        this.contVidas()
    }

    funTemporizador(){
        var puntaje_temp = this.data.get('puntaje')
        var respuesta_temp
        var temp_pistas = 0
        var cartelPista01 = this.tweenPista01
        var cartelPista02 = this.tweenPista02
        var cartelPista01Retirada = this.tweenPista01Retirada
        var cartelPista02Retirada = this.tweenPista02Retirada
        var retirada_puntaje = this.tweenPuntajeRetirada
        var retirada_tiempo = this.tweenTiempoRetirada
        var dragonGanador = this.dragonGanador
        var marcoGanador = this.tweenGanador
        var dragonReset = this.dragonReset
        var marcoReset = this.tweenReset
        var dragon = this.dragon
        if(this.data.get('vida') > 0){
            if(this.data.get('temporizador') > 0){
                this.data.setValue('temporizador', this.data.get('temporizador') - 1) 
                this.scoreTemporizador.setText(this.data.get('temporizador'))
                this.time.delayedCall(1000, this.funTemporizador, [], this);
                if (this.data.get('temporizador') <= 0){
                    this.dragon.body.setEnable(false)
                    this.tweenPuntaje.play()
                    this.tweenTiempo.play()
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
        var puntaje_temp = this.data.get('puntaje')
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
        }
        
         
         
    }

    nuevaCarne() {
        if(this.data.get('vida') > 0 && this.data.get('temporizador')> 0){
            this.carne.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,680), 'carne');
            this.carne.setVelocityX(-200);
            this.carne.checkWorldBounds = true;
            this.carne.outOfBoundsKill = true;
            this.time.delayedCall(2500, this.nuevaCarne, [], this);
            this.physics.add.overlap(this.dragon, this.carne, this.puntoCarne, null, this);
        }
        
    }

    nuevaPescado() {
        if(this.data.get('vida')> 0 && this.data.get('temporizador') > 0) {
            this.pescado.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,680), 'pescado');
            this.pescado.setVelocityX(-200);
            this.pescado.checkWorldBounds = true;
            this.pescado.outOfBoundsKill = true;
            this.time.delayedCall(1000, this.nuevaPescado, [], this);
            this.physics.add.overlap(this.dragon, this.pescado, this.puntoPescado, null, this);
        }
    }

    nuevaBomba() {
        if(this.data.get('vida')> 0 && this.data.get('temporizador') > 0){
            this.bomba.create(Phaser.Math.Between(1200,1280), Phaser.Math.Between(150,680), 'bomba');
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

