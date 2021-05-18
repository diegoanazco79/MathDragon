class Bootloader extends Phaser.Scene {
    constructor () {
        super ({key: "Bootloader"})
    }
    preload(){
        this.load.on("complete", () => {
            this.scene.start("Main_menu")
            this.scene.start("Niveles_scene")
            this.scene.start("Tutorial_add_scene")
            this.scene.start("Add_scene") //Llamamos a la escena que queremos.
        })

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


        //Tutorial



        //Main_menu
        this.load.image("btn_play", "./assets/boton_play.png")
        this.load.image("btn_full", "./assets/full_screen.png")


        //Niveles
        this.load.image("nivel_add", "./assets/nivel_add.png")
        this.load.image("nivel_sus", "./assets/nivel_sus.png")
        this.load.spritesheet("add_dragon", "./assets/add_sprite.png", { frameWidth: 240, frameHeight: 222})
        this.load.spritesheet("sus_dragon", "./assets/sus_sprite.png", { frameWidth: 385, frameHeight: 192})

    }
    
}

export default Bootloader
//Bootloader sirve para cargar todo lo necesario