
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,500);
  monkey=createSprite(100,450,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addImage("collided", monkey_collided)
 monkey.scale=0.15
 ground=createSprite(300,500,1200,20)
  
bananaGroup= createGroup();
  obstacleGroup= createGroup();
  
}


function draw() {
background("white");
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Surivial Time:"+survivalTime,100,50);
  
  spawnbanana();
   ground.velocityX = -6; 
  if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
  if(keyDown("space")&& monkey.y >=443.95){
    monkey.velocityY = -18.5;
     
     }
  monkey.velocityY = monkey.velocityY + 0.6  
  monkey.collide(ground);
 console.log(monkey.y);
  
if(monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach();
  
   }
  if(monkey.isTouching(obstacleGroup)){
   monkey.velocityY=0;
   obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
  monkey.changeImage("collided",monkey_collided);
   bananaGroup.destroyEach();
 
  }

  
  
  
  
  
  
  
  
  
  
  spawnObstacles();
  
  drawSprites();
  
}
function spawnbanana() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 100, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   banana.velocityX = -3;

    //assign lifetime to the variable
   banana.lifetime = 200;

    bananaGroup.add(banana);
   
   
  }
}
function spawnObstacles() {
  
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,500, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
  obstacle.scale=0.35
  // obstacle.debug=true;
    obstacle.setCollider("circle", 0, 0,190 );
    obstacle.lifetime = 200;
    obstacle.collide(ground);
      obstacleGroup.add(obstacle)
  }
}



