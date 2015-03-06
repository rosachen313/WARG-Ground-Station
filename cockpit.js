// Data object contains values read from data-relay
// Accessed with Data.state.______
//
// updateCockpit() is called whenever data is recieved

var Cockpit = (function ($, Data, Log, Network) {

    $(document).ready(function () {
        //Initialize instruments
        drawArtificalHorizon(0, 0);
        drawPitch(0);
        drawRoll(0);
        drawYaw(0);
        drawBattery(0);
        drawScale(0,300,"altimeter","Altitude");
        drawScale(0,300,"speed","Speed");
        displayControlStatus(0);
        displayGPSStatus(0);

        //Buttons
        $('#goHome').on('click', function () {
            command = "return_home\r\n";
            Network.write(command);
            Log.write(command);
        });
    });

    function drawYaw(yaw) {
        //Initialize canvas
        var canvas = document.getElementById("yaw");
        canvas.height = 200;
        canvas.width = 200;
        canvas.title = yaw*180/Math.PI + "°";
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Ground
        context.fillStyle = "#8bc34a";
        context.beginPath();
        context.arc(100, 100, 100, 0, Math.PI * 2);
        context.fill();

        //Border
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(100, 100, 99, 0, 2 * Math.PI);
        context.stroke();

        //Text
        var yawText = (parseFloat(yaw) * (180/Math.PI)).toFixed(2);
        yawText = yawText.toString() + "°";
        context.fillStyle = "black";
        context.font = "20px Calibri";
        context.textAlign="center";
        context.fillText(yawText, 100, 30);

        //Indicator
        image = document.createElement('img');
        image.src = "yaw.png";
        context.translate(36, 36);
        context.translate(64, 64);
        context.rotate(yaw);
        context.drawImage(image, -64, -64);
    }

    function drawRoll(roll) {
        //Initialize canvas
        var canvas = document.getElementById("roll");
        canvas.height = 200;
        canvas.width = 200;
        canvas.title = roll*180/Math.PI + "°";
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Sky
        context.fillStyle = "#03a9f4";
        context.beginPath();
        context.arc(100, 100, 100, Math.PI, 2 * Math.PI);
        context.fill();

        //Ground
        context.fillStyle = "#8bc34a";
        context.beginPath();
        context.arc(100, 100, 100, 0, Math.PI);
        context.fill();

        //Border
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(100, 100, 99, 0, 2 * Math.PI);
        context.stroke();

        //Text
        var rollText = (parseFloat(roll) * (180/Math.PI)).toFixed(2);
        rollText = rollText.toString() + "°";
        context.fillStyle = "black";
        context.font = "20px Calibri";
        context.textAlign="center";
        context.fillText(rollText, 100, 30);

        //Indicator
        image = document.createElement('img');
        image.src = "roll.png";
        context.translate(36, 36);
        context.translate(64, 64);
        context.rotate(roll);
        context.drawImage(image, -64, -64);
    }

    function drawPitch(pitch) {
        //Initialize canvas
        var canvas = document.getElementById("pitch");
        canvas.height = 200;
        canvas.width = 200;
        canvas.title = pitch*180/Math.PI + "°";
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Sky
        context.fillStyle = "#03a9f4";
        context.beginPath();
        context.arc(100, 100, 100, Math.PI, 2 * Math.PI);
        context.fill();

        //Ground
        context.fillStyle = "#8bc34a";
        context.beginPath();
        context.arc(100, 100, 100, 0, Math.PI);
        context.fill();

        //Border
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(100, 100, 99, 0, 2 * Math.PI);
        context.stroke();

        //Text
        var pitchText = (parseFloat(pitch) * (180/Math.PI)).toFixed(2);
        pitchText = pitchText.toString() + "°";
        context.fillStyle = "black";
        context.font = "20px Calibri";
        context.textAlign="center";
        context.fillText(pitchText, 100, 30);

        //Indicator
        image = document.createElement('img');
        image.src = "pitch.png";
        context.translate(36, 36);
        context.translate(64, 64);
        context.rotate(pitch);
        context.drawImage(image, -64, -64);
    }

    function drawArtificalHorizon(roll, pitch) {
        //Initialize canvas
        var canvas = document.getElementById("horizon");
        canvas.height = 200;
        canvas.width = 200;
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Sky
        context.fillStyle = "#03a9f4";
        context.beginPath();
        context.arc(100, 100, 100, Math.PI + roll - pitch, 2 * Math.PI + roll + pitch);
        context.fill();

        //Ground
        context.fillStyle = "#795548";
        context.beginPath();
        context.arc(100, 100, 100, 0 + roll + pitch, Math.PI + roll - pitch);
        context.fill();

        //Border
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(100, 100, 99, 0, 2 * Math.PI);
        context.stroke();

        //Center
        context.fillStyle = "black";
        context.beginPath();
        context.lineWidth = 2;
        context.arc(100, 100, 2, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.moveTo(120, 100);
        context.lineTo(110, 100);
        context.stroke();
        context.arc(100, 100, 10, 0, Math.PI);
        context.stroke();
        context.lineTo(80, 100);
        context.stroke();
    }

    function drawBattery(batteryLevel) {
        //Initialize canvas
        var canvas = document.getElementById("battery");
        canvas.height = 60;
        canvas.width = 100;
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Outline
        context.fillStyle = "black";
        context.lineWidth = 5;
        context.rect(10,5,80,50);
        context.stroke();
        context.fillRect(0,20,10,20);
        context.stroke();

        //Fill
        if (batteryLevel <= 100 && batteryLevel >= 80) {
            context.fillStyle = "green";
        }
        else if (batteryLevel >= 20 && batteryLevel < 80) {
            context.fillStyle = "yellow";
        }
        else {
            context.fillStyle = "red";
        }
        context.fillRect(13,8,batteryLevel*0.75,44);

        //Text
        context.fillStyle = "black";
        context.font = "20px Calibri";
        context.textAlign="center";
        context.fillText(batteryLevel + "%", 50, 35);
    }

    function drawScale(value, height, canvasName, title) {
        value = value.toFixed(2);
        var canvas = document.getElementById(canvasName);
        var context = canvas.getContext("2d");
        canvas.width = 120;
        canvas.height = height;
        width = canvas.width;
        context.clearRect(0, 0, canvas.width, canvas.height);

        //draw the values
        context.font = '15pt Calibri';
        context.fillText(title,50,20);

        //constants
        BOX_HEIGHT = 30;
        BOX_WIDTH = 80;
        OFFSET = 40;

        //draw the meter
        context.beginPath();
        context.rect(OFFSET,height/2-BOX_HEIGHT/2, BOX_WIDTH, BOX_HEIGHT);
        context.rect(0,0,OFFSET,height);
        context.lineWidth = 2;
        context.strokeStyle = 'white';
        context.stroke();

        //draw the values
        context.font = '20pt Calibri';
        mid = height/2+BOX_HEIGHT/2-5;

        //draw the scaling
        context.fillText(value, OFFSET+2, mid);
        context.textAlign="end";
        context.font = '10pt Calibri';
        A = 20;
        B= 0.1;

        for (i = mid; i<height; i+=B){
            if ((value-(i-mid)).toFixed(1) % 1 == 0) {
                context.fillText((value-(i-mid)).toFixed(1),OFFSET-2,i*A-(A-1)*mid-2);
            }
        }
        for (i = mid; i>0; i-=B){
            if ((value-(i-mid)).toFixed(1) % 1 == 0) {
                context.fillText((value-(i-mid)).toFixed(1),OFFSET-2,i*A-(A-1)*mid-2);
            }
        }
    }

    function displayControlStatus(editing_gain) {
        var canvas = document.getElementById("control_status");
        canvas.height = 30;
        canvas.width = 100;
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.font='20px Calibri';
        context.textAlign="center";
        context.fillStyle = "white";

        var text;
        if (editing_gain === 0) {
            text = "MANUAL";
        }
        else {
            text = "AUTOPILOT";
        }

        context.fillText(text,50,20);
    }

    function displayGPSStatus(gpsStatus) {
        var canvas = document.getElementById("gps_status");
        canvas.height = 30;
        canvas.width = 50;
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        gpsStatus = parseInt(gpsStatus);

        if (checkBit(gpsStatus,1)) {
            context.fillStyle ="green";
        }
        else {
            context.fillStyle ="red";
        }
        context.fillRect(0,0,canvas.width,canvas.height);

        context.font='20px Calibri';
        context.textAlign="center";
        context.fillStyle = "white";

        gpsStatus = gpsStatus & 15;
        context.fillText(gpsStatus,25,20);
    }

    Network.on('data', updateCockpit);

    //Checks nth bit for x
    function checkBit(x, n) {
        return (x >> (n-1)) & 1;
    }

    function updateCockpit() {
        var flightData = Data.state;
        var roll = flightData.roll * (Math.PI / 180);
        var pitch = flightData.pitch * (Math.PI / 180);
        var yaw = flightData.yaw * (Math.PI / 180);
        var altitude = parseFloat(flightData.altitude);
        var heading = flightData.heading;
        var ground_speed = parseFloat(flightData.ground_speed);
        var batteryLevel = Math.round(parseFloat(flightData.batteryLevel));
        var editing_gain = parseInt(flightData.editing_gain);
        var gpsStatus = flightData.gpsStatus;

        //Used in path.js for some reason
        lat = flightData.lat;
        lon = flightData.lon;

        drawArtificalHorizon(roll, pitch);
        drawPitch(pitch);
        drawRoll(roll);
        drawYaw(yaw);
        drawBattery(batteryLevel);
        displayControlStatus(editing_gain);
        displayGPSStatus(gpsStatus);
        drawScale(altitude,300,"altimeter","Altitude");
        drawScale(ground_speed,300,"speed","Speed");
    }
    // Don't export anything
    return {};

})($, Data, Log, Network);
