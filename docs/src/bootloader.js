class Bootloader extends Phaser.Scene {
    constructor () {
        super ({key: "Bootloader"})
    }
    preload(){
        this.load.on("complete", () => {
            this.scene.start("Add_scene") //Llamamos a la escena que queremos.
        })

        this.load.image("fondo", "./assets/fondo_add_v1.png")
        
    }
    
}

export default Bootloader
//Bootloader sirve para cargar todo lo necesario