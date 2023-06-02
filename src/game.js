class SplashScreen extends Phaser.Scene
{
    constructor()
    {
        super('splash_screen');
    }

    preload()
    {
        this.load.path = '../assets/';
        this.load.image('studioArt', 'TurkeuBaconGames.png');
    }

    create()
    {
        this.displayTime = 4000;
        this.fadeTime = 1000;
        this.artSizes = {'start': 0.7, 'end': 0.8};
        this.cam = this.cameras.main.setBackgroundColor(0x4a58a6);
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;
        let imageSize = this.artSizes.start * (this.canvasHeight < this.canvasWidth ? this.canvasHeight : this.canvasWidth);
        this.studioArt = this.add.image(this.canvasWidth/2, this.canvasHeight/2, 'studioArt');
        this.studioArt.setDisplaySize(imageSize, imageSize);

        this.time.delayedCall(this.displayTime, () => {
            this.scene.start('intro');
        });

        this.fadeRectangle = this.add.rectangle(0, 0, this.canvasWidth, this.canvasHeight, 0x000000, 1).setOrigin(0, 0).setAlpha(0);

        this.sceneStartTime = this.game.getTime();
    }

    update()
    {
        let currentTime = (this.game.getTime() - this.sceneStartTime);
        let artScale = this.artSizes.start + (this.artSizes.end - this.artSizes.start) * (currentTime / this.displayTime);
        let imageSize = artScale * (this.canvasHeight < this.canvasWidth ? this.canvasHeight : this.canvasWidth);
        this.studioArt.setDisplaySize(imageSize, imageSize);

        if(currentTime > this.displayTime - this.fadeTime)
        {
            let percent = 1 - (this.displayTime - currentTime) / this.fadeTime;
            console.log(percent);
            this.fadeRectangle.setAlpha(percent);
        }
    }
}

class Intro extends Phaser.Scene
{
    constructor()
    {
        super('intro');
    }

    preload()
    {

    }

    create()
    {

    }

    update()
    {
        
    }
}

class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super('main_menu');
    }

    preload()
    {

    }

    create()
    {

    }

    update()
    {
        
    }
}

let config = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    type: Phaser.WEBGL,
    pixelArt: true,
    backgroundColor: 0x000000,
    scene: [SplashScreen, Intro, MainMenu],
}

let game = new Phaser.Game(config);