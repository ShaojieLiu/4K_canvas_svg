/**
 * Created by liushaojie on 2017/6/5.
 */
var btn = `<button id="animationButton">SVG</button>
            <input id="ballNum-input" type="text"><button id="ballNum-enter">确定输入 并 刷新</button>`,
    dadClass = 'game9'

insert('压力动画帧率', dadClass, 9, btn)

var h = window.innerHeight * 0.85
var w = document.body.clientWidth * 0.95

es('.grandson').forEach(function(ele) {
    ele.height = h
    ele.width = w
    ele.style.height = h + 'px'
    ele.style.width = w + 'px'
   // ele.style.display = 'none'
//     console.log(document, window, window.innerHeight)
})

var ball = function(f) {
    return{
        x: w/2,
        y: h/2,
        lastX: w/2,
        lastY: h/2,
        velorityX: 0.0473*f,
        velorityY: 0.0473*f,
        radius: r,
        strokeStyle:`#${Math.floor(Math.random()*(2 << 23)).toString(16)}`

    }
}

var ballNum = Number(window.localStorage.getItem("ballNum")) || 500;
var r = 100
var refresh = function() {
    var num = e('#ballNum-input').value || 2000
    window.localStorage.setItem("ballNum", num)
    location.reload(true)
}
{
    e('#ballNum-enter').addEventListener('click', refresh)
    e('#ballNum-enter').addEventListener('touchend', refresh)
}

var balls = function(num) {
    var result = [], factor = 1
    for(var i = 0; i < num; i++) {
        result.push(i*factor)
    }
    return result.map(ball)
}

var canvas = document.getElementById('canvas9'),
    ctx = canvas.getContext('2d'),
    canvasPause = false,
    discs = balls(ballNum),
    numDiscs = discs.length,
    animationButton = document.getElementById('animationButton');


function update(){
    var disc = null;

    for (var i =0; i < numDiscs; i++) {
        disc = discs[i];
        if (disc.x + disc.velorityX + disc.radius >
            canvas.width ||
            disc.x + disc.velorityX - disc.radius < 0)
            disc.velorityX = -disc.velorityX;
        if (disc.y + disc.velorityY + disc.radius >
            canvas.height ||
            disc.y + disc.velorityY - disc.radius < 0)
            disc.velorityY = -disc.velorityY;
        disc.x += disc.velorityX;
        disc.y += disc.velorityY;
    }
}

function draw(){
    var disc = discs[i];
    for (var i = 0; i < numDiscs; i++) {
        disc = discs[i];
        // gradient = ctx.createRadialGradient(disc.x,disc.y,0,
        //     disc.x,disc.y,disc.radius);//放射渐变
        // gradient.addColorStop(0.3,disc.innerColor);
        // gradient.addColorStop(0.5,disc.middleColor);
        // gradient.addColorStop(1.0,disc.outerColor);

        ctx.save();
        ctx.beginPath();
        ctx.arc(disc.x,disc.y,disc.radius,0,Math.PI*2,false);
        ctx.fillStyle = 'transparent';
        ctx.strokeStyle = disc.strokeStyle;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

//calculate frame rate
var lastTime = 0;
function calculateFps(){
    var now = (+new Date),
        fps = 1000/(now - lastTime);
    lastTime = now;
    return fps;
}

//以不同的帧速率来执行不同的任务
var lastFpsUpdateTime = 0,
    lastFpsUpdate = 0;

//Animation
function animate(time){
    var fps = 0;
    if (time == undefined) {
        time = +new Date;//+new Date()是一个东西;  +相当于.valueOf();
    };
    if (!canvasPause) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //drawBackground();
        update();
        draw();
        var now = + new Date();
        //console.log(now);
        fps = calculateFps();

        if (now - lastFpsUpdateTime > 1000) {
            lastFpsUpdateTime = now;
            lastFpsUpdate = fps;

            if (1) {
                var ans = `canvas ${ballNum}个圆 帧率约为 ${Math.round(lastFpsUpdate.toFixed())}`,
                    sel = `.${dadClass} .ans1`
                e(sel).innerText = ans
            }
        };
        ctx.fillStyle = 'cornflowerblue';
        ctx.fillText(lastFpsUpdate.toFixed() + ' fps',20,60);
        window.requestAnimationFrame(animate);
    }
}

//event handlers


// animationButton.click()
//Initialization
ctx.font = '48px Helvetica';