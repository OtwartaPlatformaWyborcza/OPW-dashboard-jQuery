function gauge( procent ) {
	//canvas initialization
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	//dimensions
	var W = canvas.width;
	var H = canvas.height;
	//Variables
	var degrees = ( procent * 180) / 100;
	var new_degrees = 0;
	var difference = 0;
	var color = "#D9534F";
	var bgcolor = "#EEE";
	var text;
	var animation_loop, redraw_loop;
	
	//Background arc
	ctx.beginPath();
	ctx.strokeStyle = bgcolor;
	ctx.lineWidth = 40;
	ctx.arc( W / 2, H / 2, 100, Math.PI, 0, false );
	ctx.stroke();

	//Main arc
	//degrees = 90;
	var radians = degrees * Math.PI / 180;
	radians = Math.PI - ( procent * Math.PI / 100 );
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 30;
	//ctx.arc(x,y,radius,start_angle, end_angle, ??);
	ctx.arc( W/2, H/2, 100, Math.PI, -radians, false);
	ctx.stroke();
}