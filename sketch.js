var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3
  spookySound.loop();
}

function draw() {
  background(200);
  if (gameState === "play"){

  
  if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown("left_arrow")){
      ghost.x = ghost.x -3;
    }

    if (keyDown("right_arrow")){
      ghost.x = ghost.x +3;
    }

    if (keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY +0.8

    if (ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }
    if (ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
      ghost.destroy();
      gameState = "end"
    }
    spawnDoors();
    drawSprites();
  }
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("game over", 230,250)
  }
}

function spawnDoors(){
  if (frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage("Door",doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorsGroup.add(door);

    climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.velocityY = 1;
    climber.x = door.x
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth += 1

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    invisibleBlock.x = door.x
    invisibleBlock.lifetime = 800;
    // invisibleBlock.visible = false;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
    
    
  }
}