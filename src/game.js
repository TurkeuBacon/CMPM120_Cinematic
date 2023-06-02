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
        this.load.audio('studioJingle', 'Studio Intro.wav');
    }

    create()
    {
        this.studioJingle = this.sound.add('studioJingle', {loop: false});
        this.displayTime = 3000;
        this.fadeTime = 1000;
        this.artSizes = {'start': 0.7, 'end': 0.8};
        this.cam = this.cameras.main.setBackgroundColor(0x4a58a6);
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;
        let imageSize = this.artSizes.start * (this.canvasHeight < this.canvasWidth ? this.canvasHeight : this.canvasWidth);
        this.studioArt = this.add.image(this.canvasWidth/2, this.canvasHeight/2, 'studioArt');
        this.studioArt.setDisplaySize(imageSize, imageSize);

        this.fadeRectangle = this.add.rectangle(0, 0, this.canvasWidth, this.canvasHeight, 0x000000, 1).setOrigin(0, 0).setAlpha(1);
        this.clickText = this.add.text(this.canvasWidth/2, this.canvasHeight-20, "Click to continue", {
            'fontSize': '30px',
            'color': '#ffffff',
            'align': 'center',
            'fontStyle': 'bold'
        }).setOrigin(0.5, 1).setScale(1);
        this.input.once('pointerdown', () => {
            this.time.delayedCall(this.displayTime, () => {
                this.scene.start('intro');
            });
            this.notStarted = false;
            this.fadeRectangle.setAlpha(0);
            this.clickText.setVisible(false);
            this.sceneStartTime = this.game.getTime();
            this.studioJingle.play();
        });
    }

    update()
    {
        if(this.notStarted) return;
        let currentTime = (this.game.getTime() - this.sceneStartTime);
        let artScale = this.artSizes.start + (this.artSizes.end - this.artSizes.start) * (currentTime / this.displayTime);
        let imageSize = artScale * (this.canvasHeight < this.canvasWidth ? this.canvasHeight : this.canvasWidth);
        this.studioArt.setDisplaySize(imageSize, imageSize);

        if(currentTime > this.displayTime - this.fadeTime && currentTime < this.displayTime)
        {
            let percent = 1 - (this.displayTime - currentTime) / this.fadeTime;
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
        this.load.path = '../assets/';
        this.load.image('richard', 'Richard.png');
        this.load.image('background', 'CinematicBackground.png');
        this.load.audio('music', 'Cinematic Music.wav');
    }

    create()
    {
        this.music = this.sound.add('music', {loop: false});
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;
        this.richardScale = 3;
        this.richardSpins = 5;
        this.richardYs = {'top': -60, 'bottom': this.canvasHeight - 140};
        this.backgroundScale = this.canvasWidth/360;

        this.backgroundImage = this.add.image(this.canvasWidth/2, 0, 'background').setScale(this.backgroundScale).setOrigin(0.5, 0);
        this.richard = this.add.image(this.canvasWidth/2, this.richardYs.top, 'richard').setScale(this.richardScale);

        this.isAFrog = this.add.text(this.canvasWidth/2, this.richardYs.bottom - this.richard.displayHeight/2 - 20, "Richard is a frog!!!", {
            'fontSize': '30px',
            'color': '#ffffff',
            'align': 'center',
            'fontStyle': 'bold'
        }).setOrigin(0.5, 1).setScale(0);
        this.startTime = this.game.getTime();

        this.notAFrog = this.add.text(-300, this.richardYs.bottom - this.richard.displayHeight/2 - 20, "But he doesn't look like\nany of the other frogs\n):", {
            'fontSize': '30px',
            'color': '#ffffff',
            'align': 'center',
            'fontStyle': 'bold'
        }).setOrigin(.5, 1).setScale(1);
        this.startTime = this.game.getTime();
        
        this.adventure = this.add.text(this.canvasWidth/2, 0, "He's on an adventure\nto find his people", {
            'fontSize': '30px',
            'color': '#ffffff',
            'align': 'center',
            'fontStyle': 'bold'
        }).setOrigin(.5, 1).setScale(1);
        this.startTime = this.game.getTime();

        this.secret = this.add.text(this.canvasWidth/2, this.canvasHeight/2, "In their\nSECRET MOUNTAIN HIDEOUT!!!!", {
            'fontSize': '50px',
            'color': '#ffffff',
            'align': 'center',
            'fontStyle': 'bold'
        }).setOrigin(.5, 1).setScale(0);

        this.time.delayedCall(10000, () => {
            this.music.stop();
            this.scene.start('main_menu');
        });

        this.music.play();
        this.startTime = this.game.getTime();
    }

    update()
    {
        let timeFromStart = this.game.getTime() - this.startTime;
        if(this.isAFrog.scale < 1)
        {
            this.isAFrog.setScale(Math.pow(timeFromStart / 500, 3));
        }
        else
        {
            this.isAFrog.scale = 1;
        }
        if(timeFromStart > 1500)
        {
            this.isAFrog.x += 20;
        }

        if(timeFromStart > 1000)
        {
            if(this.richard.y < this.richardYs.bottom)
            {
                this.richard.y += 10;
                let richardFallPercent = (this.richard.y - this.richardYs.top) / (this.richardYs.bottom - this.richardYs.top);
                this.richard.setRotation(2 * Math.PI * Math.sqrt(richardFallPercent) * this.richardSpins);
            }
            else
            {
                this.richard.y = this.richardYs.bottom;
                this.richard.setRotation(0);
            }
        }

        if(timeFromStart > 1500)
        {
            if(this.notAFrog.x < this.canvasWidth/2)
            {
                this.notAFrog.x += 15;
            }
            else
            {
                this.notAFrog.setX(this.canvasWidth/2);
            }
        }
        if(timeFromStart > 4000)
        {
            this.notAFrog.y += 20;
        }

        if(timeFromStart > 4000)
        {
            if(this.adventure.y < this.richardYs.bottom - this.richard.displayHeight/2 - 20)
            {
                this.adventure.y += 20;
            }
        }

        if(timeFromStart > 6200)
        {
            this.adventure.x += 10;
            this.richard.setRotation(0.25-0.5*Math.pow(Math.sin(timeFromStart/50), 2));
            this.richard.x += 10;
            if(this.secret.scale < 1)
            {
                this.secret.setScale(Math.pow((timeFromStart - 6300) / 1000, 3));
            }
            else
            {
                this.secret.setScale(1);
            }
        }
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