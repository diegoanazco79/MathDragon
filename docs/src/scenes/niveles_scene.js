class Niveles_scene extends Phaser.Scene{
    constructor(){
        super({key: "Niveles_scene"})
    }

    preload(){
        this.load.image("fondov3", "./assets/fondov3.png")
        this.load.image("titulo", "./assets/titulo_niveles.png")
        this.load.image("nivel_add", "./assets/nivel_add.png")
        this.load.image("nivel_sus", "./assets/nivel_sus.png")
        this.load.spritesheet("add_dragon", "./assets/add_sprite.png", { frameWidth: 240, frameHeight: 222})
        this.load.spritesheet("sus_dragon", "./assets/sus_sprite.png", { frameWidth: 385, frameHeight: 192})
    }

    create(){

        //Dimensiones
        let center_width = this.sys.game.config.width/2
        let center_height = this.sys.game.config.height/2      
        
        this.fondo = this.add.image(center_width, center_height, "fondov3")
        this.titulo= this.add.image(center_width, -500, "titulo")


        //Titulo

        this.tweenTitulo = this.tweens.createTimeline()
        this.tweenTitulo.add({
            targets: this.titulo,
            duration: 1500,
            ease:'Power1',
            y: 100
        })

        this.tweenTitulo.play()

        //Nivel Adición
        this.btn_add = this.add.sprite( 353, -200, 'nivel_add')
        .setInteractive({cursor: 'pointer'})
        .on('pointerover', () =>  this.btn_add.setScale(1.05))
        .on('pointerout', () => this.btn_add.setScale( 1 ))
        .on('pointerdown', () => this.scene.start("Add_scene"))

        this.tweenAdd = this.tweens.createTimeline()
        this.tweenAdd.add({
            targets: this.btn_add,
            duration: 1500,
            ease: 'Power1',
            y: 400,
        })
        
        this.tweenAdd.play()

        this.dragonAdd = this.physics.add.sprite( 342 , -500, 'add_dragon').setScale(0.85)
        this.anims.create({
            key: 'dragon_add',
            frames: this.anims.generateFrameNumbers('add_dragon', {
                frames: [0, 1, 2, 3]
            }),
            repeat: -1,
            frameRate: 8
        })
        
        this.tweenAddDragon = this.tweens.createTimeline()
        this.tweenAddDragon.add({
            targets: this.dragonAdd,
            duration: 1500,
            ease: 'Power1',
            y: 470,
        })
        this.tweenAddDragon.play()
        this.dragonAdd.anims.play("dragon_add")


        //Nivel Sustracción
        this.btn_sus = this.add.sprite( 937, -200, 'nivel_sus')
        .setInteractive({cursor: 'pointer'})
        .on('pointerover', () =>  this.btn_sus.setScale(1.05))
        .on('pointerout', () => this.btn_sus.setScale( 1 ))
        .on('pointerdown', () => this.scene.start("Sus_scene"))

        this.tweenSus = this.tweens.createTimeline()
        this.tweenSus.add({
            targets: this.btn_sus,
            duration: 1500,
            ease: 'Power1',
            y: 400,
        })
        
        this.tweenSus.play()

        this.dragonSus = this.physics.add.sprite( 920 , -500, 'sus_dragon')
        this.anims.create({
            key: 'dragon_sus',
            frames: this.anims.generateFrameNumbers('sus_dragon', {
                frames: [0, 1, 2]
            }),
            repeat: -1,
            frameRate: 6
        })
        
        this.tweenSusDragon = this.tweens.createTimeline()
        this.tweenSusDragon.add({
            targets: this.dragonSus,
            duration: 1500,
            ease: 'Power1',
            y: 470,
        })
        this.tweenSusDragon.play()
        this.dragonSus.anims.play("dragon_sus")


    }

    update(){
        
       

    }




}
