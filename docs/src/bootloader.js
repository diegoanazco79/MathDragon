class Bootloader extends Phaser.Scene {
    constructor () {
        super ({key: "Bootloader"})
    }
    preload(){
        this.load.on("complete", () => {
            this.scene.start("Add_scene") //Llamamos a la escena que queremos.
        })

        //Fondo
        this.load.image("fondov3", "./assets/fondov3.png")
        this.load.image("marco", "./assets/marcov3.png")
        
        //Dragon
        this.load.image("dragon", "./assets/dragon.png")
        this.load.spritesheet("mov_dragon", "./assets/mov_sprite.png", { frameWidth: 120, frameHeight: 120})
        this.load.spritesheet("dan_dragon", "./assets/dan_sprite.png", { frameWidth: 120, frameHeight: 120})
        this.load.spritesheet("muer_dragon", "./assets/muerte_sprite.png", { frameWidth: 120, frameHeight: 120})
        this.load.spritesheet("cora_sprite", "./assets/cora_sprite.png", { frameWidth: 56, frameHeight: 56})
        
        //Obstaculos
        this.load.image("carne", "./assets/carne.png")
        this.load.image("pescado", "./assets/pescado.png")
        this.load.image("bomba", "./assets/bomba.png")
        
        //Puntuaciones
        this.load.image("punt_add", "./assets/puntos_add.png")
    }
    
}

export default Bootloader
//Bootloader sirve para cargar todo lo necesario