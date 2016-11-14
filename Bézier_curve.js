var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
ctx.fillStyle = "red";
ctx.strokeStyle = "black";


var line = function(x0,y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.stroke();
};

var circle = function(x, y){
    var circle = new Path2D();
    circle.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill(circle);
};
var circleArray = [];
var points;
var choosePoint = 0;


document.getElementById('tutorial').onclick = function(e) {
    if(!choosePoint){
        var x, y;
        x = e.offsetX;
        y = e.offsetY;
        circle(x, y);
        circleArray.push([x, y]);
        if(circleArray.length > 2) {
            points = bezier(0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (j = 0; j < circleArray.length; j++) {
                circle(circleArray[j][0], circleArray[j][1]);
            }
            for (var i = 1; i < points.length; i++) {
                line(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
            }
        }
    }
    choosePoint = 0;
};

document.getElementById('tutorial').onmousedown = function(e) {
    for (var i = 0; i < circleArray.length; i++) {
        for(var j = 0; j < 5; j++){
            for(var k = 0; k < 5; k++){
                if((circleArray[i][0]+j)== e.offsetX && circleArray[i][1]+k == e.offsetY){
                    choosePoint = 1;
                    var i1 = i;
                    document.getElementById('tutorial').onmousemove = function(e){
                        circleArray[i1] = [e.offsetX, e.offsetY];
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        for (var j = 0; j < circleArray.length; j++) {
                            circle(circleArray[j][0], circleArray[j][1]);
                        }
                        points = bezier(0);
                        for (var p = 1; p < points.length; p++) {
                            line(points[p - 1][0], points[p - 1][1], points[p][0], points[p][1]);
                        }
                    };
                    document.getElementById('tutorial').onmouseup = function(){
                        document.getElementById('tutorial').onmousemove = null;
                        document.getElementById('tutorial').onmouseup = null;
                    };
                }
            }
        }
    }
};




var f = function(l){
    if(l > 1){
        return l*f(l-1);
    }
    return 1;
};
var b = function(i, n, t){
    return (f(n)/(f(i)*f(n-i)))* Math.pow(t, i) * Math.pow(1-t, n-i);
};


var bezier = function(t){
    var x = 0, y = 0;
    if(t < 1){
        for(var i = 0; i < circleArray.length; i++){
            x += circleArray[i][0] * b(i, circleArray.length-1, t);
            y += circleArray[i][1] * b(i, circleArray.length-1, t);
        }

        return [[x, y]].concat(bezier(t+0.001));
    }
    return [];
};



