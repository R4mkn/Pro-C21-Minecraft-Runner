var PLAY = 1;
var END = 0;
var gameState = PLAY;
var steveImg, Steve;
var stevejumpImg, Stevejump;
var backgroundImg, Background;
var igroundImg, Iground
var score = 0
var creeperImg, Creeper;
var rockImg;
var stevediedImg,Stevedied;
var restartImg,Restart
var diedImg, Died;
var loseImg, Lose;
var hitSound;
var rockGroup



function preload(){
 steveImg = loadAnimation("SteveRunning.png","SteveRunning1.png","SteveRunning3.png","SteveRunning4.png");
 stevejumpImg = loadImage("SteveJumping.png") 
 backgroundImg = loadImage("Background.png");
 igroundImg = loadImage("iground.png")
 creeperImg = loadAnimation("CreeperRunning3-1.png", "CreeperRunning4-1.png");
 rockImg = loadImage("Rock.png")
 restartImg = loadImage("Restart.png")
 stevediedImg = loadImage("SteveDied.png")
 diedImg = loadImage("DiedScreen.png")
 loseImg = loadImage("You-lose.png")
 hitSound = loadSound("Hit.mp3")

}

function setup(){
  createCanvas(windowWidth,windowHeight);

   Background = createSprite(width-545, height-250)
   Background.addAnimation("Background", backgroundImg)
   Background.scale = 6
   Background.velocityX = (4 + 20*score/50);   
   Steve = createSprite(width-540, height-190);
   Steve.addAnimation("steverunning", steveImg);
   Iground = createSprite(width-100,height-120)
   Iground.addImage("Ground", igroundImg)
   Iground.scale = 1.5
   Steve.debug = false
   Steve.addAnimation("Jumping", stevejumpImg)
   Creeper = createSprite(width-80, height-190)
   Creeper.addAnimation("CreeperRunning", creeperImg)
  
   Died = createSprite(width-530,height-220)
   Died.addImage("DiedScreen", diedImg)  
   Died.scale = 3 
   Died.visible = false
   Restart = createSprite(width-530,height-200)
   Restart.addImage("Restart", restartImg)
   Restart.visible = false
   Steve.addImage("SteveDied", stevediedImg);
   Lose = createSprite(width-520,height-340)
   Lose.addImage("YouLose", loseImg)
   Lose.scale = 0.5
   Lose.visible = false

   rockGroup = new Group();



}

function draw() {
  background("blue");

if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);

  Background.velocityX = (6 + 3*score/150);


  if(Background.x > 1400 ){
    Background.x = height/2;
  }  
  if((touches.length > 0 || keyDown("SPACE")) && Steve.y  >= height-240) {
    Steve.velocityY = -10;
    Steve.changeAnimation("Jumping", stevejumpImg)
    touches = [];
    
  }
    Steve.velocityY = Steve.velocityY + 0.8
   
   
    spawnRock()

    if(Steve.isTouching(rockGroup)){
      gameState = END

    }
    if(Creeper.isTouching(rockGroup)){
      Creeper.velocityY = -15;
    }
     Creeper.velocityY = Creeper.velocityY + 0.8

  
}


  
else if (gameState === END) {
   
  rockGroup.velocityX = 0     
  Background.velocityX = 0
  steveImg.velocityY = 0
  Restart.visible = true
  Steve.changeAnimation("SteveDied", stevediedImg)
  Died.visible = true
  Lose.visible = true
  rockGroup.setLifetimeEach(0)

  if(mousePressedOver(Restart)) {      
    reset();
  }



}



Creeper.velocityY = Creeper.velocityY + 0.8



  drawSprites();

  textSize(23)
  fill(255);
  textFont('Minecraft');
  text("score: "+score,width-130,height-20);


    
    Steve.setCollider("rectangle", 0, 20, 200, 0, 0);
    Creeper.setCollider("rectangle", 0, 20, 200, 0, 0);
    Steve.collide(Iground);
    Creeper.collide(Iground);


    Creeper.debug = false
    








    
    Iground.visible = false

}

function keyReleased(){
  Steve.changeAnimation("steverunning", steveImg)
}

function spawnRock(){
  if (frameCount % 60 === 0) {
    var Rock = createSprite(width-1640,height-90)  
    Rock.x = Math.round(random(width-10000,height-900));
    Rock.addImage("Rock", rockImg)
    Rock.scale = 0.5  
    Rock.velocityX = (6 + 3*score/150)
    Rock.lifetime = 550    
    Rock.depth = Steve.depth;
    Steve.depth = Steve.depth+1;
    Rock.setCollider("circle", 0,0,0)
    Rock.debug = false


    rockGroup.add(Rock);
  }
}

function reset(){
  gameState = PLAY;
  Lose.visible = false;
  Restart.visible = false;
  Died.visible = false
  
  rockGroup.destroyEach();

  
  Steve.changeAnimation("steverunning", steveImg);
  
  score = 0;
}