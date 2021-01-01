var START=0;
var PLAY=1;
var END=2;

var gameState = START;

var box;
var virus,virusImg,virusGroup;

var backGround,backgroundImg;
var welcomeAnim, welcomeSprite,welcomeMessage,msg;
var user,useImg;
var inj,injImg, shootInjGroup;
var shield,shieldImg,shielGroup;

var lifeSpan;


function preload(){
  virusImg = loadImage("images/virus.png");
  backgroundImg = loadImage("images/coroBG.jpg");
  welcomeAnim = loadImage ("images/welcome_img.jpg");
  welcomeMessage = loadImage("images/MESSAGE.jpg");
  
  userImg = loadAnimation("images/1.png","images/2.png");
  injImg = loadImage("images/injection.png");
  shieldImg = loadImage("images/shield.png");
}
function setup() {
  createCanvas(windowWidth-30,windowHeight-100);
  console.log(windowWidth);
  
   welcomeSprite = createSprite(width/2-70,height/2);
    welcomeSprite.addImage("welcome", welcomeAnim);
    
    // msg = createSprite(windowWidth/2,windowHeight/2);
    
    // msg.addImage("coronaMessage",welcomeMessage);
    // msg.scale = 0.8;
  
  
  bgSprite = createSprite(0, 0, windowWidth+100, windowHeight);
  
  bgSprite.addImage("backGround",backgroundImg);
  bgSprite.scale = 3.5;
  bgSprite.x = bgSprite.width/2;
  bgSprite.visible = false;
  
  user =createSprite(50,windowHeight-200,20,70);
  user.addAnimation("walking",userImg);
  user.visible = false;
  
  lifeSpan = 0;
  
  virusGroup = new Group();
  shieldGroup = new Group();
  shootInjGroup = new Group();
}

function draw() {
  background(0);

  drawSprites();

  if(gameState!== START){
    textSize(30);
    strokeWeight(7);
    fill("yellow");
    text("Life line : " + lifeSpan, width-250, 150);
  }
  
 

  if(gameState === START){
    textSize(20);
    fill("white");
    text("Press SPACE to start the game", windowWidth/2, windowHeight-150);
   
    if(keyDown("space")){
      fill("green");
       gameState = PLAY;
       
      }
  }
  else if(gameState === PLAY){
    welcomeSprite.visible = false;
    
    bgSprite.visible = true;
    bgSprite.velocityX = -1;

    if(bgSprite.x<0){
      bgSprite.x = bgSprite.width/2;
    }

    // Score board
    lifeSpan = lifeSpan + Math.round((getFrameRate()/60));
    user.visible = true;
    spawnVirus();
    spawnShield();
    if(keyDown(UP_ARROW)){
      user.y = user.y -5;
    }
    if(keyDown(DOWN_ARROW)){
      user.y = user.y +5;
    }
    
    if(keyDown(LEFT_ARROW)){
      user.x = user.x -5;
    }
    
    if(keyDown(RIGHT_ARROW)){
      user.x = user.x + 5;
    }
    if(keyDown("space")){
      shootVirus();
    }
    
    if(virusGroup.isTouching(user)){
      gameState = END;
    }
    if(virusGroup.isTouching(shootInjGroup)){
      //gameState = END;
      console.log(virusGroup.length);
      for(var i=0; i <virusGroup.length;i++){
        virusGroup.get(i).destroy();
      }
      
    }
    
    
  }
  else{
    textSize(30);
    text("GAME OVER", width/2,height/2);
    virusGroup.setVelocityXEach(0);
    bgSprite.velocityX = 0;
  }
  
  
}

function spawnVirus(){
  if (frameCount % 200 === 0){
    var yPos = windowHeight - 150;
    
    var randomNum = Math.round(random(yPos-500,yPos));
    
    virus = createSprite(windowWidth-30, randomNum );
    virus.addImage("corona",virusImg);
    virus.scale = 0.1;
    
    virus.velocityX = -10;
    virus.lifetime = width/4;
    
    virusGroup.add(virus);
  }
}

function spawnShield(){
  
  if(frameCount % 500 === 0){
    var yPos = windowHeight - 150;
    
    var randomNum = Math.round(random(yPos-500,yPos));
    
    shield = createSprite(windowWidth-30, randomNum );
    shield.addImage("shield",shieldImg);
    shield.scale = 0.1;
    
    shield.velocityX = -4;
    shield.lifetime = width/4;
    
    shieldGroup.add(shield);
    
  }
 
}

function shootVirus(){
  var shootInj = createSprite(user.x,user.y);
  shootInj.addImage(injImg);
  //shootInj.x = 360;
  //shootInj.y=user.y;
  shootInj.velocityX = 4;
  //shootInj.lifetime = width/4;
  shootInj.scale = 0.05;
  shootInjGroup.add(shootInj);
  
}
