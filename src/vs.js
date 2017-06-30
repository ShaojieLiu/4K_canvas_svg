/**
 * Created by liushaojie on 2017/6/5.
 */

// 随机整数生产: 数量, 范围的数组
var rand = function(num, rangeArr) {
    var result = []
    for(var i = 0; i < num; i++) {
        var r = Math.floor(Math.random() * rangeArr[i])
        result.push(r)
    }
    return result
}

// 重复次数, 调用方法, 结果反馈选择器
var test = function(num, fun, sel) {

    var t0 = new Date()
    for(var i = 0; i < num; i++) {
        fun(...rand(4, [150, 50, 100, 80]))
        // fun(10, 10, 50, 30)
    }
    var t1 = new Date()

    var ans = ` 用时 ${t1 - t0} ms`
    e(sel).innerText = e(sel).innerText.replace('{{result}}', ans)
}

var game1 = function(num, cb) {
    var dadClass = `game1`, gameNum = 1
    insert('依次绘制9999个矩形', dadClass, gameNum)


    var canvas = e(`#canvas${gameNum}`),
        ctx = canvas.getContext("2d"),
        svg = e(`#svg${gameNum}`)
    // log(canvas, svg)

    var drawRectCanvas = function(x, y, w, h) {
        ctx.strokeStyle = 'red'
        ctx.strokeRect(x, y, w, h)
    }

    var drawRectSvg = function(x, y, w, h) {
        var rect = `<rect x="${x}" y="${y}" width="${w}" height="${h}" stroke="blue" fill="transparent" stroke-width="1"/>`
        svg.insertAdjacentHTML('beforeend', rect)
    }

    test(num, drawRectCanvas, `.${dadClass} .ans1`)
    test(num, drawRectSvg, `.${dadClass} .ans2`)
    cb(num)
}

var game2 = function(num) {
    var rects = []
    var dadClass = `game2`, gameNum = 2
    insert('同时绘制9999个矩形', dadClass, gameNum)


    var canvas = e(`#canvas${gameNum}`),
        ctx = canvas.getContext("2d"),
        svg = e(`#svg${gameNum}`)
    // log(canvas, svg)

    var drawRectCanvas = function(x, y, w, h) {
        ctx.strokeStyle = 'red'
        ctx.strokeRect(x, y, w, h)
    }


    var drawRectSvg = function(x, y, w, h) {
        var rect = `<rect x="${x}" y="${y}" width="${w}" height="${h}" stroke="blue" fill="transparent" stroke-width="1"/>`
        rects.push(rect)
    }

    test(num, drawRectCanvas, `.${dadClass} .ans1`)
    test(num, drawRectSvg, `.${dadClass} .ans2`)
    svg.insertAdjacentHTML('beforeend', rects.join(''))

}

var __main = function() {
    game1(9999, game2)
    // game2(9999)
    // game2(9999)
}

// setTimeout(() => {
//     __main()
// }, 1000)
__main()
