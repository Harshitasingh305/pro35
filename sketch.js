var balloon,balloonImg;
var backIm,background;
var  database, position,balloonImg2;

function setup() {
  createCanvas(1000,600);
  balloon=createSprite(100, 400, 50, 50);
  database=firebase.database()
  console.log(database)
  var balloonPosition=database.ref('balloon/height')
  balloonPosition.on("value",readPosition,showError)
}

function preload(){
backIm=loadImage("Hot Air Ballon-01.png")
balloonImg=loadImage("Hot Air Ballon-04.png")
balloonImg2=loadAnimation("Hot Air Ballon-04.png","Hot Air Ballon-03.png","Hot Air Ballon-02.png")

}

function draw() {
  background(backIm); 

balloon.addImage(balloonImg)

fill("blue")
stroke(2)
text("USE ARROWS TO CONTROL THE BALLOON",10,30)

if(keyDown(LEFT_ARROW)){
	updateHeight(-10,0);

}
else if(keyDown(RIGHT_ARROW)){
		updateHeight(10,0);

}

if(keyDown(UP_ARROW)){
	updateHeight(0,-10);
balloon.addAnimation("hotAirBalloon",balloonImg2)
balloon.scale=balloon.scale-0.01;
}
else if(keyDown(DOWN_ARROW)){
	updateHeight(0,10);
balloon.addAnimation("hotAirBalloon",balloonImg2)
balloon.scale=balloon.scale+0.01;
}
  drawSprites();
}

function updateHeight(x,y){
database.ref('balloon/height').set({
'x':height.x+x,
'y':height.y+y

})
}

function readPosition(data){
height=data.val();
balloon.x=height.x;
balloon.y=height.y;

}
function showError(){
console.log("Error")


}