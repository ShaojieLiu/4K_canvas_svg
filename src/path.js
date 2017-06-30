/**
 * Created by liushaojie on 2017/6/5.
 */

var svgPath = function() {
    let svg = e('#svg9'),
        rect = svg.getBoundingClientRect(),
        w = rect.width,
        h = rect.height,
        p = `M${w/2},${r} L${w-r},${h/2} L${w/2},${h-r} L${r},${h/2} L${w/2},${r}`
        // p = `M50,20 L280,75`
        // path = "M150,20 L280,75 L150,130 L20,75 L150,20"
    let ball = function(count) {return `
        <circle cx="0" cy="0" r="${r}" stroke=#${Math.floor(Math.random()*(2 << 23)).toString(16)} stroke-width="2" fill="transparent">
            <animateMotion class="path" begin="${0}s" dur="${3-0.001*count}s" repeatCount="indefinite" 
            path="${p}"/>
        </circle>
    `}

    let balls = function(count) {
        let result = []
        for(let i = 0; i < count; i++) {
            result.push(i)
        }
        return result.map(ball).join('')
    }

    // let ballNum = 2000
    svg.insertAdjacentHTML('beforeend', balls(ballNum))

    let paused = true

    let bind = function() {
        animationButton.addEventListener('click', function() {
            let svg = e('#svg9')
            let ele = e('.path')
            let eles = document.querySelectorAll('.path')
            // log('click', ele, ele.animationsPaused)

            if(paused) {
                svg.unpauseAnimations()
                window.requestAnimationFrame(ani)
                svg.style.display = 'inline-block'

            } else {
                svg.pauseAnimations()
                svg.style.display = 'none'
            }
            paused = !paused
        })
    }
    svg.pauseAnimations()

    function ani(time){
        if (!paused) {
            let fps = 0;
            if (time == undefined) {
                time = +new Date;//+new Date()是一个东西;  +相当于.valueOf();
            };
            if (1) {

                var now = + new Date();
                //console.log(now);
                fps = calculateFps();

                if (now - lastFpsUpdateTime > 1000) {
                    lastFpsUpdateTime = now;
                    lastFpsUpdate = fps;

                    if (1) {
                        let ans = `svg ${ballNum}个圆 帧率约为 ${Math.round(lastFpsUpdate)}`,
                            sel = `.${dadClass} .ans2`
                        e(sel).innerText = ans
                    }
                };
                window.requestAnimationFrame(ani);
            }
        }

    }
    window.requestAnimationFrame(ani)
    bind()

    // console.log(svg.__proto__)
    // console.log(svg.getBoundingClientRect())
    // console.log(e('#svg9 animateMotion').attributes.path)
}
svgPath()
