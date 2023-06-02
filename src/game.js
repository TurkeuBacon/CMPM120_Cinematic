class SplashScreen extends Phaser.scene
{
    constructor()
    {
        super('splash_screen');
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

class Intro extends Phaser.scene
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

class MainMenu extends Phaser.scene
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