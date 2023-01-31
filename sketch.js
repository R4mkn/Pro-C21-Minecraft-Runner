//variaveis chatasassasasasa
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
   // Background
   Background = createSprite(width-545, height-250)
   Background.addAnimation("Background", backgroundImg)
   Background.scale = 6
   //SteveRunning
   Steve = createSprite(width-540, height-190);
   Steve.addAnimation("steverunning", steveImg);
   //InvisibleGround
   Iground = createSprite(width-100,height-120)
   Iground.addImage("Ground", igroundImg)
   Iground.scale = 1.5
   //SteveJumping
   Steve.debug = false
   Steve.addAnimation("Jumping", stevejumpImg)
   //Creeper
   Creeper = createSprite(width-80, height-190)
   Creeper.addAnimation("CreeperRunning", creeperImg)
   //Died
   Died = createSprite(width-530,height-220)
   Died.addImage("DiedScreen", diedImg)  
   Died.scale = 3 
   Died.visible = false
   //Restart
   Restart = createSprite(width-530,height-200)
   Restart.addImage("Restart", restartImg)
   Restart.visible = false
   //SteveDied
   Steve.addImage("SteveDied", stevediedImg);
   //You Lose
   Lose = createSprite(width-520,height-340)
   Lose.addImage("YouLose", loseImg)
   Lose.scale = 0.5
   Lose.visible = false
   //RockGroup
   rockGroup = new Group();



}

function draw() {
  background("blue");
// Gamestate Play
if (gameState===PLAY){
  //SISTEMA DE SCORE
  score = score + Math.round(getFrameRate()/60);
  //MOVENDO O BACKGROUND
  Background.velocityX = (6 + 3*score/150);

  //BACKGROUND SE DIVIDINDO
  if(Background.x > 1400 ){
    Background.x = height/2;
  }  
  //SISTEMA DE PULO
  if((touches.length > 0 || keyDown("SPACE")) && Steve.y  >= height-240) {
    Steve.velocityY = -10;
    Steve.changeAnimation("Jumping", stevejumpImg)
    touches = [];
    
  }

   //GRAVIDADE DO STEVE 
    Steve.velocityY = Steve.velocityY + 0.8
   
   //SPAWNAR ROCHAS
    spawnRock()

   //STEVE MORRENDO 
    if(Steve.isTouching(rockGroup)){
      hitSound.play()
      gameState = END

    }
   //CREEPER PULANDO AS ROCHAS 
    if(Creeper.isTouching(rockGroup)){
      Creeper.velocityY = -20;
    }
     Creeper.velocityY = Creeper.velocityY + 0.8

  
}

//ESTADO DO JOGO NO FINAL  
else if (gameState === END) {
  //VELOCIDADES PARADAS 
  rockGroup.velocityX = 0     
  Background.velocityX = 0
  steveImg.velocityY = 0

  //TROCAR A ANIMAÇAO PARA MORTEEEEEEEE
  Steve.changeAnimation("SteveDied", stevediedImg)

  //VISIBILIDADE 
  Restart.visible = true
  Died.visible = true
  Lose.visible = true
  rockGroup.setLifetimeEach(0)
  
  // BOTAO RESTART
  if(mousePressedOver(Restart)) {      
    reset();
  }
}


  drawSprites();


  //TEXTO DO SCORE
  textSize(23)
  fill(255);
  textFont('Minecraft');
  text("score: "+score,width-130,height-20);


    //COLLISAO DOS PERSONAGENSSSSSSSSSSSSSSSSSSSSSSS
    Steve.setCollider("rectangle", 0, 20, 200, 0, 0);
    Creeper.setCollider("rectangle", 0, 20, 200, 0, 0);
    Steve.collide(Iground);
    Creeper.collide(Iground);


    //SOLO INVISIVEL
    Iground.visible = false

}
//QUANDO O BOTAO FOR SOLTADO
function keyReleased(){
  Steve.changeAnimation("steverunning", steveImg)
}

//SISTEMA DE ROCHASSS
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


//RENICIAR O JOGO
function reset(){
  gameState = PLAY;
  Lose.visible = false;
  Restart.visible = false;
  Died.visible = false
  
  rockGroup.destroyEach();

  
  Steve.changeAnimation("steverunning", steveImg);
  
  score = 0;
}