

// https://github.com/ShaneSP/hack110/tree/master/src/hack110


/* 
   This import statement is pulling in the 
   classes we need from the pixi.js API
*/

import {
    Sprite,
    Application,
    DisplayObject,
    Rectangle,
    Graphics,
    Text
} from "pixi.js";

class Pillow {
    sprite: Sprite;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}
class Kanye {
    yVelocity: number = 0;
    sprite: Sprite;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

alert("THE FLOOR IS LAVA!!! Press the Spacebar to help Kanye stay on the pillows and avoid Crazy Kim.");
let init = () => {
    const app: Application = new Application(700, 500);
    document.body.appendChild(app.view); // <-- this appends the app's view property to the HTML document element

    let background: Sprite = Sprite.fromImage("./simpsons.png");
    app.stage.addChild(background);


    let lava: Sprite = Sprite.fromImage("./lava.png");
    app.stage.addChild(lava);
    lava.y = 430;

    let kanye2: Sprite = Sprite.fromImage("./kanye2.png");
    app.stage.addChild(kanye2);
    kanye2.scale.x = 0.18;
    kanye2.scale.y = 0.18;
    kanye2.x = 50;
    kanye2.y = 300;

    let kanye: Kanye = new Kanye(kanye2);
    

    let pillows: Pillow[] = [];
    for (let i: number = 1; i <= 1000; i++) {
    let sprite: Sprite = Sprite.fromImage("./pillow2.png");
    sprite.scale.x = 0.038;
    sprite.scale.y = 0.038;

    sprite.x = Math.random() * 8000 / 4 * i - 5;
    sprite.y = 400;
    let pillow: Pillow = new Pillow(sprite);
    pillows.push(pillow);
    app.stage.addChild(pillow.sprite);
    }

    let kim: Pillow[] = [];
    for (let i: number = 1; i <= 1000; i++) {
        let sprite: Sprite = Sprite.fromImage("./kim-Head.png");
        sprite.scale.x = 0.1;
        sprite.scale.y = 0.1;
        sprite.x = Math.random() * 9000 / 4 * i - 5;
        sprite.y = 80;
        let krazyKim: Pillow = new Pillow(sprite);
        kim.push(krazyKim);
        app.stage.addChild(krazyKim.sprite);
    }


  

    window.onkeydown = (e: KeyboardEvent): void => {
        const SPACE: number = 32;

        const STEP: number = 100;
        if (e.keyCode === SPACE) {
            kanye.sprite.y -= STEP ;
            kanye.yVelocity = 2;
        }

    };
    let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
        let ab: Rectangle = a.getBounds();
        let bb: Rectangle = b.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    };

    
    let gameOver: boolean = false;
    let message: Text = new Text("I miss the Old Kanye");
    let messageBox: Graphics = new Graphics();

    let lost = (): void => {
 message.x = 216;
 message.y = 90;
 message.style.fill = 0xffffff;
 messageBox.beginFill(0x4444aa, 0.4);
 messageBox.drawRect(0, 0, 250, 50);
 messageBox.x = 256 - 45;
 messageBox.y = 100 - 25;
 app.stage.addChild(messageBox);
 app.stage.addChild(message);
 gameOver = true;

};
 
    app.ticker.add((delta: number): void => {
        kanye.sprite.y += kanye.yVelocity;
        for (let i: number = 0; i < pillows.length; i++) {

            
              const pillow: Pillow = pillows[i];
              pillow.sprite.x -= 2.2 * pillow.direction;

              const krazyKim: Pillow = kim[i];
              krazyKim.sprite.x -= 2.2 * pillow.direction;
          
            }
        if (isColliding(kanye2, lava)) {
          let background: Sprite = Sprite.fromImage("./kim-full.png");
          app.stage.addChild(background);
          background.scale.x = 0.4;
          background.scale.y = 0.4;
          lost();
        } 
        for (let i = 0; i < pillows.length; i++) {
            if (isColliding(kanye2, pillows[i].sprite)) {
                kanye2.y = 315;
            }
        }
        for (let i = 0; i < kim.length; i++) {
            if (isColliding(kanye2, kim[i].sprite)) {
            let background: Sprite = Sprite.fromImage("./kim-full.png");
            app.stage.addChild(background);
            background.scale.x = 0.4;
            background.scale.y = 0.4;
            lost();
            }
        }

        });

  
    
};
init();