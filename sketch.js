var gameState, START = 1,
  PLAY = 2,
  END = 0

var iornMan, iornMan_Image;
var missle, missle_Image, missleGroup;
var coin, coin_Image, coinsGroup;
var side1, side2;
var cloudsGroup, cloud, cloudImage, land;
var score = 0;

gameState = START;

function preload() {
  iornMan_Image = loadImage("iorn man.gif");
  missile_Image = loadImage("missile.png");
  coins_Image = loadImage("coin.png");
  cloudImage = loadImage("cloud.png");
}

function setup() {
  createCanvas(400, 400, 10, 10);

  land = createSprite(200, 399, 400, 100);
  land.shapeColor = rgb(99, 16, 10)

  iornMan = createSprite(200, 360, 10, 10);
  iornMan.addImage(iornMan_Image);
  iornMan.scale = 0.3;

  side1 = createSprite(0, 200, 10, 400);
  side1.visible = false;
  side2 = createSprite(400, 200, 10, 400);
  side2.visible = false;


  coinsGroup = new Group();
  missileGroup = new Group();
  cloudsGroup = new Group();
}
n = 0

function draw() {
  background(168, 182, 255);

  if (gameState === START) {
    if (keyWentUp("space")) {
      gameState = PLAY;
    }
  } else if (gameState === PLAY) {


    camera.position.y = iornMan.y - 167
    iornMan.velocityY = -10
    side1.y = iornMan.y - 200
    side2.y = iornMan.y - 200


    if (frameCount % 80 === 0) {
      spawnMissile();
    }


    if (frameCount % 40 === 0) {
      spawnCoins();
    }


    spawnClouds();


    if (keyDown(RIGHT_ARROW)) {
      iornMan.x += 5
    }

    if (keyDown(LEFT_ARROW)) {
      iornMan.x -= 5
    }

    iornMan.collide(side1);
    iornMan.collide(side2);
    iornMan.setCollider("rectangle", 0, 0, 170, 250);


    if (iornMan.isTouching(coinsGroup)) {
      score += 1;
      coinsGroup.destroyEach();
    }
    if (iornMan.isTouching(missileGroup) || keyDown("k") /*k=kill*/) {
      iornMan.visible = false;
      missileGroup.destroyEach();
      coinsGroup.destroyEach();
      cloudsGroup.destroyEach();
      gameState = END;
    }
  } else if (gameState === END) {
    if (keyWentUp("r")) {
      gameState = PLAY
      score = 0;
      iornMan.visible = true;
    }
  }

  drawSprites();

  if (gameState === START) {
    noStroke();
    fill(1);
    textSize(20);
    text("Press Space To Start", 110, 200);
    text("Note:Use right & left arrow keys to move", 0, 20)
    text("press k to kill I don't know why you'll do but", 0, 40);
    text("you can", 0, 60)
  }
  if (gameState === PLAY || gameState === END) {
    noStroke();
    fill(1);
    textSize(20);
    text("score:" + score, 150, iornMan.y - 330)
  }
  if (gameState === END) {
    noStroke();
    fill(1);
    textSize(50);
    text("GAME OVER!☠", 20, camera.y);
    textSize(20);
    text("Press R To Restart", 120, camera.y + 50)
  }
}

function spawnMissile() {
  missile = createSprite(0, iornMan.y - 400, 10, 10);
  missile.addImage("missile", missile_Image);
  missile.x = random(80, 320);
  missile.scale = 0.3;
  missile.lifetime = 45
  missile.setCollider("rectangle", 27, 0, 200, 400);
  missileGroup.add(missile)
}

function spawnCoins() {
  coin = createSprite(0, iornMan.y - 400, 10, 10);
  coin.addImage("coin", coins_Image);
  coin.x = random(80, 320);
  coin.scale = 0.1;
  coin.bounce(missileGroup)
  coin.setCollider("circle", 0, 0, 269);
  coin.lifetime = 45

  coinsGroup.add(coin)
}

function spawnClouds() {
  if (frameCount % 15 === 0) {
    cloud = createSprite(600, iornMan.y - 400, 40, 10);
    cloud.x = Math.round(random(10, 390));
    cloud.addImage(cloudImage);
    cloud.scale = random(0.2, 0.1);

    cloud.lifetime = 200;

    cloud.depth = iornMan.depth;
    iornMan.depth += 1;

    cloudsGroup.add(cloud);
  }
}

