var cuboImg,enemy1,bomb,bombG,cubo,bombImg,enemiesImg,enemyG,sliminhoImg;
var BIGWALL;
var slimeG,score = 0,lives = 5,slm = 100;
var bg;
var gamestate = 1

function preload(){
cuboImg = loadImage("1.png")
enemiesImg = loadImage("5.png")
bombImg = loadImage("72.png")
bg = loadImage("bg.png")
sliminhoImg = loadImage("Sliminho.png")
}

function setup() {
  var h = windowHeight, w = windowWidth;
  createCanvas(w,h);
  console.log(w)
  console.log(h)

  cubo = createSprite(153.6,74.5,10,10)
  cubo.addImage(cuboImg);
  cubo.scale = 0.8

  BIGWALL = createSprite(-5,248.5,15,1024)

  bombG = new Group()
  enemyG = new Group()
  slimeG = new Group();

}

function draw() {

  push();
  imageMode(CENTER);
  image(bg,windowWidth/2,windowHeight/2,windowWidth,windowHeight)
  pop();

  fill("Blue")
  textSize(12)
  text("Pontos: "+ score,10,15)

  fill("Blue")
  textSize(12)
  text("Slime Bombs: "+ slm,10,40)

  fill("Blue")
  textSize(14)
  text("Vidas: "+ lives,10,65)

  cubeWalk();

  if(bombG.isTouching(slimeG)){
  for(var i = 0; i < bombG.length; i++){
    console.log("i")
  if(bombG[i].isTouching(slimeG)){
    bombG[i].destroy();
    console.log("o")
   score += 5
   slm += 1
  }
  }
  }

  if(enemyG.isTouching(slimeG)){
    for(var i = 0;i<enemyG.length;i++){
    if(enemyG[i].isTouching(slimeG)){
      enemyG[i].destroy();
      score += 10
      slm += 1
    }
    }
    }

 

  if(enemyG.isTouching(BIGWALL)){
    enemyG.destroyEach();
    lives -= 1
  }

  if(bombG.isTouching(BIGWALL)){
    bombG.destroyEach();
    lives -= 1
  }

  if(gamestate === 2){
    textSize(50)
    fill("White")
    text("Você Perdeu!",windowWidth/2-200,windowHeight/2)
    BIGWALL.visible = false
  }

  if(gamestate === 3){
    textSize(50)
    fill("Yellow")
    text("Você Ganhou!!!!!!",windowWidth/2-200,windowHeight/2)
    lives = 1000;
    score = 100000000
    BIGWALL.visible = false
  }

  if(gamestate === 1){
    enemies();

  if(keyDown("SPACE")){
    atirar();
  }

  if(score > 500){
    enemyG.destroyEach()
    bombG.destroyEach()
    gamestate = 3
  }

  if(lives < 1){
    gamestate = 2
    cubo.destroy();
    enemyG.destroyEach();
    bombG.destroyEach()
   }

   if(frameCount <= 1000){
    if(frameCount%60 === 0)
    bomb();
   }
  }


  drawSprites();
}

function cubeWalk(){
  if(keyIsDown(UP_ARROW) && cubo.y > 20){
   cubo.y -= 8
  }

  if(keyIsDown(DOWN_ARROW) && cubo.y < windowHeight-20){
  cubo.y += 8
  }

}

function atirar(){
  if(frameCount%2 === 0 && slm > 0){
  var slime;
  slime = createSprite(cubo.x+30,cubo.y,5,5)
  slime.velocityX = 5
  slime.lifetime = 350
  slime.addImage(sliminhoImg)
  slimeG.add(slime)
  slm -= 1
  }
}

function enemies(){
  if(frameCount%60 === 0){
    enemy1 = createSprite(windowWidth,Math.round(random(30,windowHeight-30)),10,10)
    enemy1.velocityX = -1.5
    enemy1.lifetime = 1500
    enemy1.addImage(enemiesImg)
    enemyG.add(enemy1)

  }
}

function bomb(){
  var bomb;
  var i = Math.round(random(1,2))
  bomb = createSprite(enemy1.x -10,10,5,5)
  if(i === 1){
    bomb.y = enemy1.y -30
  }
  if(i === 2){
    bomb.y = enemy1.y +30
  }
  bomb.velocityX = -3
  bomb.lifetime = 1000
  bomb.addImage(bombImg)
  bomb.scale = 0.5
  bombG.add(bomb)
}