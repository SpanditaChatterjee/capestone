var water,frog,seaweeds,coin,shark;
var waterImg,frogImg,seaweedsImg,coinImg,sharkImg;
var Collection = 0;
var seaweedsG,coinG,sharkGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

//to load the images
function preload(){
  waterImg = loadImage("water.jpg");
  //to load the animation
  frogImg = loadImage("frog.png");
  seaweedsImg = loadImage("seaweed.png");
  coinImg = loadImage("coin.png");
  sharkImg = loadImage("shark1.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,700);
  //create moving path
  water=createSprite(200,200);
  water.addImage(waterImg);
  water.scale=2;
  water.velocityY = 5;



  //creating frog
  frog = createSprite(70,580,20,20);
  frog.addAnimation("SahilRunning",frogImg);
  frog.scale=0.2;
  //frog.debug = true
  frog.setCollider("rectangle", 0, 10,50,80)
    
  // creating groups 
  seaweedsG=new Group();
  coinG=new Group();
  sharkGroup=new Group();

}

function draw() {
  //When gamestate is play
  if(gameState===PLAY){
  background(0);
  frog.velocityY=5;
  if (keyDown("up")){
    frog.velocityY=-10;
  }
  if (keyWentDown("left")){
    frog.velocityX=-3;
  }
  if (keyWentDown("right")){
    frog.velocityX=3;
  }
  
  //code to reset the background and give the effect of infinite background
  if(water.y > 500 ){
    water.y = height/2;
  }

  //Calling the user defined functions
    createSeaweeds();
    createCoin();
    createShark();

    if (seaweedsG.isTouching(frog)) {
      seaweedsG.destroyEach();
      Collection=Collection+5;
    }
    if (coinG.isTouching(frog)) {
      coinG.destroyEach();
      Collection=Collection+10;
      
    }
      if(sharkGroup.isTouching(frog)) {
        gameState=END;
        //end state has started
      }
  }
  
    if(gameState=== END){
        frog.addAnimation("SahilRunning",endImg);
        frog.x=200;
        frog.y=300;
        frog.scale=0.6;
        water.velocityY = 0;
        //all groups are getting destroyed
        seaweedsG.destroyEach();
        coinG.destroyEach();
        sharkGroup.destroyEach();
    }
  
  
  drawSprites();

  textSize(20);
  fill("red");
  text("Score: "+ Collection,150,30);
  

}

function createSeaweeds() {
  if (frameCount % 200 == 0) {
  var seaweeds = createSprite(Math.round(random(50, 350)),40, 10, 10);
  seaweeds.addImage(seaweedsImg);
  seaweeds.scale=0.5;
    seaweeds.velocityY = 3;
  seaweeds.lifetime = 200;
  seaweedsG.add(seaweeds);
  }
}

function createCoin() {
  if (World.frameCount % 320 == 0) {
  var coin = createSprite(Math.round(random(50, 350)),40, 10, 10);
  coin.addImage(coinImg);
  coin.scale=0.09;
  coin.velocityY = 3;
  coin.lifetime = 600;
  coinG.add(coin);
}
}


function createShark(){
  if (World.frameCount % 400 == 0) {
  var shark = createSprite(Math.round(random(50, 350)),40, 10, 10);
  shark.addImage(sharkImg);
  shark.scale=0.3;
  shark.velocityY = 7;
  shark.lifetime = 200;
  sharkGroup.add(shark);
  }
}
