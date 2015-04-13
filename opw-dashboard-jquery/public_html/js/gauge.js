function gauge( procent ) {

    //canvas initialization
    var canvas = document.getElementById( "canvas" );
    var ctx = canvas.getContext( "2d" );

    //dimensions
    var W = canvas.width;
    var H = canvas.height;

    //Variables
    var newDegrees = 0;
    var difference = 0;
    var color = "#D9534F";
    var bgcolor = "#EEE";
    var wow = "hsl(" + procent * 1.17 + ", 56.4%, 45.9%)";
    var gradient = ctx.createLinearGradient( 0, 0, W, 0 );
    gradient.addColorStop( 0, "hsl(0, 56.4%, 45.9%)" );
    gradient.addColorStop( 0.5, "#F0AD4E" );
    gradient.addColorStop( 1, "green" );
    var text;
    var animationLoop, redrawLoop;

    //Background arc
    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 30;
    ctx.arc( W / 2, H / 2, 100, Math.PI, 0, false );
    ctx.stroke();

    //Main arc
    if ( procent === 100 ) {
        var radians = 0;
    } else {
        var radians = Math.PI + ( procent * Math.PI / 100 );
    }
    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.arc( W / 2, H / 2, 100, 0, radians, true );
    ctx.stroke();
}
