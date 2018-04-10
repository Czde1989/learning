var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;


// 构造小球模型
// x 和 y 坐标 — 小球在屏幕上最开始时候的坐标。
// velX 和 velY — 水平和竖直速度。
// color — 每一个小球会有自己的颜色。
// size — 每一个小球会有自己的大小 — 也就是小球的半径，以像素为单位。

function Ball(x, y, vx, vy, color, size) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.color = color;
	this.size = size;
}

// 绘制小球方法：
Ball.prototype.draw = function() {
	// 声明开始绘制图形
	ctx.beginPath(); 
	// 定义小球的颜色
	ctx.fillStyle = this.color; 
	// 绘制圆弧
	// x 和 y 是 arc 中心的坐标 — 也就是小球的中心坐标。
	// size — 小球的半径
	// 最后两个参数是开始和结束的角度，也就是圆弧对应的夹角。
	// 这里我们用的是 0 和 2 * PI，也就是 360 度。
	// 如果你设置成 0 和 1 * PI，则只会出现一个半圆，也就是 180 度。
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	// 声明我们结束了以 beginPath()开始的绘画,并且使用我们之前设置的颜色进行填充。 
	ctx.fill();
}

// 更新小球数据
Ball.prototype.update = function() {
	// 检查小球的x坐标是否大于画布的宽度
	if ((this.x + this.size) >= width) {
		this.vx = -this.vx;
	}
	// 检查小球的x坐标是否小于0
	if ((this.x - this.size) <= 0) {
		this.vx = -this.vx;
	}
	// 检查小球的y坐标是否大于画布的高度
	if ((this.y + this.size) >= height) {
		this.vy = -this.vy;
	}
	// 检查小球的y坐标是否小于0
	if ((this.y - this.size) <= 0) {
		this.vy = -this.vy;
	}

	// 改变小球的坐标
	this.x += this.vx;
	this.y += this.vy;
}

// 撞击侦查
// 对于每个小球，我们都要检查其他的小球是否和当前这个小球相撞了。
// 为了达到此目的，我们构造另外一个循环来遍历数组中的小球。
Ball.prototype.collisionDetect = function() {
	for (var j = 0; j < balls.length; j++) {
		var ball = balls[j];
		// 剔除自己
		if (!(this === ball)) {
			var dx = this.x - ball.x;
			var dy = this.y - ball.y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			// 检测两个小球中心的距离是否小于两个小球的半径之和。
			if (distance < this.size + ball.size) {
				// ball.color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
				// 反弹
				this.vx = -this.vx;
				this.vy = -this.vy;
				ball.vx = -ball.vx;
				ball.vy = -ball.vy;
			}
		}
	}
}

// 存储小球
var balls = [];

// 返回指定两个数字之间的一个随机数
function random(min, max) {
	var num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

// 运动循环函数
function loop() {
	// 设置画布颜色
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
	// 填充区域
	ctx.fillRect(0, 0, width, height);
	// 创建25个小球, 并放入到数组存储起来
	while(balls.length < 25) {
		var ball = new Ball(
			random(0, width), // 小球的x坐标
			random(0, height), // 小球的y坐标
			random(-7, 7),  // 小球的水平速度
			random(-7, 7),  // 小球的垂直速度
			'rgb('+ random(0, 255) +','+ random(0, 255) +','+ random(0, 255) + ')',  // 小球的颜色
			random(10, 20)  // 小球的半径
		);

		balls.push(ball);
	}

	for (var i = 0; i < balls.length; i++) {
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}

	// 使用 requestAnimationFrame() 方法再运行一次函数
	requestAnimationFrame(loop);
}


loop();

