class Bootloader extends Phaser.Scene {
    constructor () {
        super ({key: "Bootloader"})
    }
    preload(){
        this.load.on("complete", () => {
            this.scene.start("Scene_play") //Llamamos a la escena que queremos.
        })

        
    }
    
}

export default Bootloader
//Bootloader sirve para cargar todo lo necesario