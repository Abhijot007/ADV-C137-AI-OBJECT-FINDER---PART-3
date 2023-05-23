status= "";
input= "";
objects= [];

function setup() {
    canvas= createCanvas(620,390);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(620,390);
    video.hide();
}

function start() {
    object_Detector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
}

function draw(){
    image(video,0,0,300,290);
    if(status != ""){
        object_Detector.detect(video, gotresults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input){
                video.stop();
                object_Detector.detect(gotresults);
                document.getElementById("object_found").innerHTML = input +" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input + " Not Found";
            }
        }
    }
}

function gotresults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}