var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var skull,skullImg, skullGroup;
var score
var spooky;
var end;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  skullImg=loadImage("skull.png")
  spooky=loadSound("spooky.wav")
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.35;

  climbersGroup= createGroup();
  doorsGroup= createGroup();
  invisibleBlockGroup= createGroup();
  skullGroup= createGroup();
  score=0;
  
  
}

function draw() {
  background("black");
  drawSprites()
  if(gameState=="play"){
    spooky.play();
    spooky.setVolume(0.03);
    if(tower.y > 400){
      tower.y = 300
    }

   

    //to jump
    if(keyDown("space")){
      ghost.velocityY= -10;
    
    }
    //gravity
    ghost.velocityY+=0.7;

    //left and right movement
    if(keyDown(RIGHT_ARROW) && ghost.x < 550){
      ghost.x=ghost.x +8;
    }
    
    if(keyDown(LEFT_ARROW) && ghost.x >50){
      ghost.x=ghost.x -5

    }
    for(var i=0 ; i<skullGroup.length; i++){
      if(ghost.isTouching(skullGroup[i])){
        score=score+10;
        skullGroup[i].destroy();
      
      }
      
    }
   

    textSize(30)
    stroke("white")
    fill("red")
    text ("SCORE : " + score,20,40  )

    ghost.collide(climbersGroup)
    if(ghost.isTouching(invisibleBlockGroup) || ghost.y> 600){
      gameState="end"
    }
    spawnClimbers();

  }
  
 

  
  if(gameState=="end"){
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    skullGroup.destroyEach();
    tower.velocityY=0;
    textSize(60);
    fill(rgb(random(0,255),random(0,255),random(0,255)))
    text("Game Over !!", 130, 300);
    end= createSprite(300,100);
    end.addImage(skullImg);
    end.scale=0.3;
    ghost.destroy()
  }
}


function spawnClimbers(){

  if(frameCount%100 ==0){
    door=createSprite(random(100,500), 0);
    door.addImage(doorImg)
    door.velocityY= 4;
    doorsGroup.add(door);

    climber=createSprite(door.x,door.y+65)
    climber.addImage(climberImg);
    climber.velocityY= 4;
    climbersGroup.add(climber)

    ghost.depth= door.depth+1;

    invisibleBlock=createSprite(climber.x,climber.y+15, climber.width-20,3)   
    invisibleBlock.velocityY=4; 
    invisibleBlock.visible=false;
    invisibleBlockGroup.add(invisibleBlock)

    skull=createSprite(door.x,door.y)
    skull.velocityY=4;
    skull.addImage(skullImg)
    skull.scale=0.1
    skullGroup.add(skull)
  }
  
  
}