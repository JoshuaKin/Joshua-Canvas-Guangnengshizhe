window.onload = function() {
	var canvas = document.getElementById('canvas1');
	var ctx = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	var c = {
		x: width / 2,
		y: height / 2,
	};
	//basicStyle
	var linewidth = 5;
	var shadowBlur = 30;
	var strokeStyle = 'white'
	var shadowColor = 'white';
	//outCircle
	var moveAng = 1 * (Math.PI / 60);
	var outCircle = {
		r: 200,
		startAng: 0,
		endAng: 0 + 2 * Math.PI,
		tmpAng: 0,
	};
	//innerCircle
	var innerCircle = {
		r: 160,
		startAng: -(1 / 4 * Math.PI),
		endAng: -(1 / 4 * Math.PI) + 2 * Math.PI,
		tmpAng: -(1 / 4 * Math.PI),
	};
	//topTriangle
	var TriMoveLen = 12;
	var upTriOne = {
		startX: c.x + Math.cos(Math.PI / 6) * innerCircle.r,
		startY: c.y - Math.sin(Math.PI / 6) * innerCircle.r,
		endX: c.x - Math.cos(Math.PI / 6) * innerCircle.r,
		tmpX: c.y + Math.cos(Math.PI / 6) * innerCircle.r,
	};
	var upTriTwo = {
		startX: upTriOne.endX,
		startY: upTriOne.startY,
		endX: c.x,
		endY: c.y + innerCircle.r,
		tmpX: upTriOne.endX,
		tmpY: upTriOne.startY,
	};
	var upTriThi = {
		startX: upTriTwo.endX,
		startY: upTriTwo.endY,
		endX: upTriOne.startX,
		endY: upTriOne.startY,
		tmpX: upTriTwo.endX,
		tmpY: upTriTwo.endY,
	};
	var downTriOne = {
		startX: c.x - Math.cos(Math.PI / 6) * innerCircle.r,
		startY: c.y + Math.sin(Math.PI / 6) * innerCircle.r,
		endX: c.x + Math.cos(Math.PI / 6) * innerCircle.r,
		tmpX: c.y - Math.cos(Math.PI / 6) * innerCircle.r,
	};
	var downTriTwo = {
		startX: downTriOne.endX,
		startY: downTriOne.startY,
		endX: c.x,
		endY: c.y - innerCircle.r,
		tmpX: downTriOne.endX,
		tmpY: downTriOne.startY,
	};
	var downTriThi = {
		startX: downTriTwo.endX,
		startY: downTriTwo.endY,
		endX: downTriOne.startX,
		endY: downTriOne.startY,
		tmpX: downTriTwo.endX,
		tmpY: downTriTwo.endY,
	};

	function styleSet() {
		ctx.lineWidth = linewidth;
		ctx.strokeStyle = strokeStyle;
		ctx.shadowBlur = shadowBlur;
		ctx.shadowColor = shadowColor;
	};

	function upTriOneLoop() {
		if(upTriOne.tmpX <= upTriOne.endX) {
			upTriTwoLoop();
		} else if(upTriOne.tmpX - TriMoveLen <= upTriOne.endX) {
			upTriOne.tmpX = upTriOne.endX;
		} else {
			upTriOne.tmpX -= TriMoveLen;
		};
		ctx.beginPath();
		styleSet();
		ctx.moveTo(upTriOne.startX, upTriOne.startY);
		ctx.lineTo(upTriOne.tmpX, upTriOne.startY)
		ctx.stroke();
		ctx.closePath();
	};

	function upTriTwoLoop() {
		if(upTriTwo.tmpX >= upTriTwo.endX ||
			upTriTwo.tmpY >= upTriTwo.endY) {
			upTriThiLoop();
		} else if(upTriTwo.tmpX + TriMoveLen * Math.sin(1 / 6 * Math.PI) >= upTriTwo.endX ||
			upTriTwo.tmpY + TriMoveLen * Math.cos(1 / 6 * Math.PI) >= upTriTwo.endY) {
			upTriTwo.tmpX = upTriTwo.endX;
			upTriTwo.tmpY = upTriTwo.endY;
		} else {
			upTriTwo.tmpX += TriMoveLen * Math.sin(1 / 6 * Math.PI);
			upTriTwo.tmpY += TriMoveLen * Math.cos(1 / 6 * Math.PI);
		};
		ctx.beginPath();
		styleSet();
		ctx.moveTo(upTriTwo.startX, upTriTwo.startY);
		ctx.lineTo(upTriTwo.tmpX, upTriTwo.tmpY)
		ctx.stroke();
		ctx.closePath();
	};

	function upTriThiLoop() {
		if(upTriThi.tmpX >= upTriThi.endX ||
			upTriThi.tmpY <= upTriThi.endY) {
//			console.log('upTriangleFinished')
		} else if(upTriThi.tmpX + TriMoveLen * Math.sin(1 / 6 * Math.PI) >= upTriThi.endX ||
			upTriThi.tmpY - TriMoveLen * Math.cos(1 / 6 * Math.PI) <= upTriThi.endY) {
			upTriThi.tmpX = upTriThi.endX;
			upTriThi.tmpY = upTriThi.endY;
		} else {
			upTriThi.tmpX += TriMoveLen * Math.sin(1 / 6 * Math.PI);
			upTriThi.tmpY -= TriMoveLen * Math.cos(1 / 6 * Math.PI);
		};
		ctx.beginPath();
		styleSet();
		ctx.moveTo(upTriThi.startX, upTriThi.startY);
		ctx.lineTo(upTriThi.tmpX, upTriThi.tmpY)
		ctx.stroke();
		ctx.closePath();
	};
	//
	function downTriOneLoop() {
		if(downTriOne.tmpX >= downTriOne.endX) {
			downTriTwoLoop();
		} else if(downTriOne.tmpX + TriMoveLen >= downTriOne.endX) {
			downTriOne.tmpX = downTriOne.endX;
		} else {
			downTriOne.tmpX += TriMoveLen;
		};
		ctx.beginPath();
		styleSet();
		ctx.moveTo(downTriOne.startX, downTriOne.startY);
		ctx.lineTo(downTriOne.tmpX, downTriOne.startY)
		ctx.stroke();
		ctx.closePath();
	};

	function downTriTwoLoop() {
		if(downTriTwo.tmpX <= downTriTwo.endX ||
			downTriTwo.tmpY <= downTriTwo.endY) {
			downTriThiLoop();
		} else if(downTriTwo.tmpX - TriMoveLen * Math.sin(1 / 6 * Math.PI) <= downTriTwo.endX ||
			downTriTwo.tmpY - TriMoveLen * Math.cos(1 / 6 * Math.PI) <= downTriTwo.endY) {
			downTriTwo.tmpX = downTriTwo.endX;
			downTriTwo.tmpY = downTriTwo.endY;
		} else {
			downTriTwo.tmpX -= TriMoveLen * Math.sin(1 / 6 * Math.PI);
			downTriTwo.tmpY -= TriMoveLen * Math.cos(1 / 6 * Math.PI);
		};
		ctx.beginPath();
		styleSet();
		ctx.moveTo(downTriTwo.startX, downTriTwo.startY);
		ctx.lineTo(downTriTwo.tmpX, downTriTwo.tmpY)
		ctx.stroke();
		ctx.closePath();
	};

	function downTriThiLoop() {
		if(downTriThi.tmpX <= downTriThi.endX ||
			downTriThi.tmpY >= downTriThi.endY) {
//			console.log('downTriangleFinished')
			console.log('designed by Joshua')
		} else if(downTriThi.tmpX - TriMoveLen * Math.sin(1 / 6 * Math.PI) <= downTriThi.endX ||
			downTriThi.tmpY + TriMoveLen * Math.cos(1 / 6 * Math.PI) >= downTriThi.endY) {
			downTriThi.tmpX = downTriThi.endX;
			downTriThi.tmpY = downTriThi.endY;
		} else {
			downTriThi.tmpX -= TriMoveLen * Math.sin(1 / 6 * Math.PI);
			downTriThi.tmpY += TriMoveLen * Math.cos(1 / 6 * Math.PI);
		};
		ctx.beginPath();
		styleSet();
		ctx.moveTo(downTriThi.startX, downTriThi.startY);
		ctx.lineTo(downTriThi.tmpX, downTriThi.tmpY)
		ctx.stroke();
		ctx.closePath();
	};

	function loop() {
		ctx.clearRect(0, 0, width, height);
		if(outCircle.tmpAng >= outCircle.endAng) {
//			console.log('outerCircleFinished');
		} else if(outCircle.tmpAng + moveAng > outCircle.endAng) {
			outCircle.tmpAng = outCircle.endAng;
		} else {
			outCircle.tmpAng += moveAng;
		}
		if(innerCircle.tmpAng >= innerCircle.endAng) {
//			console.log('outerCircleFinished');
			downTriOneLoop();
			upTriOneLoop();
		} else if(innerCircle.tmpAng + moveAng > innerCircle.endAng) {
			innerCircle.tmpAng = innerCircle.endAng;
		} else {
			innerCircle.tmpAng += moveAng;
		};
		ctx.beginPath();
		styleSet();
		ctx.arc(c.x, c.y, outCircle.r, outCircle.startAng, outCircle.tmpAng);
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		styleSet();
		ctx.arc(c.x, c.y, innerCircle.r, innerCircle.startAng, innerCircle.tmpAng);
		ctx.stroke();
		ctx.closePath();
		requestAnimationFrame(loop);
	};
	loop();
}