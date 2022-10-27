var song="";
var leftWristx=0;
var leftWristy=0;
var rightWristx=0;
var rightWristy=0;
var score_left_wrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('Model is Loaded');
}
function draw(){
    image(video,0,0,600,500);
    fill('#ff0013');
    stroke('#001dff');
    if(score_left_wrist>0.2){
        circle(leftWristx,leftWristy,20);
        leftwristYnumber=Number(leftWristy);
        remove_decimals=floor(leftwristYnumber);
        volume=remove_decimals/500;
        document.getElementById("volume_title").innerHTML="Volume= "+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
if (results.length>0) {
    console.log(results);
    score_left_wrist=results[0].pose.keypoints[9].score;
    console.log("Left Wrist Score= "+score_left_wrist);
    leftWristx=results[0].pose.leftWrist.x;
    leftWristy=results[0].pose.leftWrist.y;
    console.log("left wrist x= "+leftWristx);
    console.log("right wrist y= "+leftWristy);
    rightWristx=results[0].pose.rightWrist.x;
    rightWristy=results[0].pose.rightWrist.y;
    console.log("right wrist x="+rightWristx+"  right wrist y= "+rightWristy)
}
}