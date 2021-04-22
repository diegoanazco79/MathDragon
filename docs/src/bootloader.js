class Bootloader extends Phaser.Scene {
    constructor () {
        super ({key: "Bootloader"})
    }
    preload(){
        this.load.on("complete", () => {
            this.scene.start("Add_scene") //Llamamos a la escena que queremos.
        })

        this.load.image("fondo", "./assets/fondo.png")
        this.load.image("dragon", "./assets/dragon.png")
        this.load.image("carne", "./assets/carne.png")
        this.load.image("bomba", "./assets/bomba.png")
        
    }
    
}

export default Bootloader
//Bootloader sirve para cargar todo lo necesario