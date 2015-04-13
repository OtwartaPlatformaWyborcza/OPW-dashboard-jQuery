function gauge( procent ) {

    var canvas = document.getElementById( "canvas" );
    var ctx = canvas.getContext( "2d" );

    var W = canvas.width;
    var H = canvas.height;

    var gradient = ctx.createLinearGradient( 0, 0, W, 0 );
    gradient.addColorStop( 0, "#337AB7" );
    gradient.addColorStop( 0.5, "#5BC0DE" );
    gradient.addColorStop( 1, "#5CB85C" );
    var text;
    var animationLoop, redrawLoop;

    //Background arc
    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 30;
    ctx.arc( W / 2, H - 30, 100, Math.PI, 0, false );
    ctx.stroke();

    //Main arc
    if ( procent === 100 ) {
        var radians = 0;
    } else {
        var radians = Math.PI + ( procent * Math.PI / 100 );
    }

    ctx.beginPath();
    ctx.lineWidth = 32;
    ctx.strokeStyle = "#EEE";
    ctx.arc( W / 2, H - 30, 100, 0, radians, true );
    ctx.stroke();

    ctx.font = "17px arial";
    ctx.fillStyle = "#777"
    ctx.fillText( "0%", 38, H - 10 );
    ctx.fillText( "100%", W - 72, H - 10 );

    ctx.fillStyle = "#333"
    ctx.font = "50px arial";
    var tekst = Math.round( procent ) + "%";
    ctx.fillText( tekst, ( W - ctx.measureText( tekst ).width ) / 2, H - 30 );
}
