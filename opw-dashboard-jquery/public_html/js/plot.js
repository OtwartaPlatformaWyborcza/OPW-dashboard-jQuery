function tmp( data ) {
    var procent = Math.round( data.obwodowa * 100 / data.obwodowaAll );
    var bar = "<div class='progress-bar progress-bar-success' role='progressbar' style='width:" + procent + "%'>" + data.obwodowa + "/" + data.obwodowaAll + "</div>";
    return "<div class='progress'>" + bar + "</div>";
}

//Połączyć z komisje
function prezydent( data ) {
    var chartData = [];
    for ( i in data ) {
        var person = [];
        person.push( data[i].fullname, data[i].glosow );
        chartData.push( person );
    }
    return [ chartData ];
}

//Połączyć z prezydent
function komisje( data ) {
    var chartData = [];
    var procent = 0;
    for ( i in data ) {
        var el = [];
        procent = Math.round( data[i].frekwencja * 100 / data[i].frekwencjaAll );
        el.push( data[i].okregowaName.replace( "Okręgowa Komisja Wyborcza Nr", "OKW" ), procent );
        chartData.push( el );
    }
    return [ chartData ];
}

function frekwencja( data ) {
    var chartData = [];
    var procent = 0;
    for ( i in data ) {
        var el = [];
        procent = Math.round( data[i].obwodowa * 100 / data[i].obwodowaAll );
        el.push( procent, data[i].okregowaName.replace( /Okręgowa .* Nr/, "Nr" ) );
        chartData.push( el );
    }
    return [ chartData ]
}

//Etykiety nad słupkami
function addLabels( data ) {
    $.each( data.getData()[0].data, function( i, el ) {
        var o = data.pointOffset( { x: i, y: el[1] } );
        $( '<div class="data-point-label">' + el[1] + "</div>" ).css( {
            left: o.left - 10,
            top: o.top - 22
        } ).appendTo( data.getPlaceholder() ).slideToggle();
    } );
}

function updateFrekwencja( now, all ) {
    var data = Math.round( ( 100 * now ) / all );
    $( "#progress-frekwencja" ).css( { width: data + "%" } ).append( data + "%" );
}

$( document ).ready( function() {
    $.ajax ( {
        beforeSend: function( request ) {
            request.setRequestHeader( "X-OPW-API-token", token );
            if ( debug === true ) {
                request.setRequestHeader( "X-OPW-debug-500", '500');
            };
        },
        dataType: "json",
        url: jsonURL,
        statusCode: {
            500: function() {
                console.log( "Error: 500" );
            }
        },
        success: function( data ) {
            var chartData = [];
            chartData[0] = {
                label: "Tak",
                data: ( ( data.obwodowa * 100 ) / data.obwodowaAll )
            };
            chartData[1] = {
                label: "Nie",
                data: ( ( ( data.obwodowaAll - data.obwodowa ) * 100 ) / data.obwodowaAll )
            };
            gauge( ( data.obwodowa * 100 ) / data.obwodowaAll );
            //console.log( chartData[0] );
            $.plot( "#pie-chart", chartData, chartConfig.cake );

            chartData = prezydent( data.kandydatList );
            var myPlot = $.plot( "#wykres2", chartData, chartConfig.verticalBar );
            addLabels( myPlot );

            //chartData = komisje(data.okregowaList)
            //myPlot = $.plot("#wykres3", chartData, verticalBarOptions);
            //addLabels(myPlot);

            var aktualizacja = data.exportDate.substring( 11, 19 );
            $( "#aktualizacja" ).append( "<span>" + aktualizacja + "</span>" );

            updateFrekwencja( data.frekwencja, data.frekwencjaAll );

            chartData = frekwencja( data.okregowaList );
            var myPlot = $.plot( "#wykres4", chartData, chartConfig.horizontalBar );

            for ( i in data.okregowaList ) {
                var el = data.okregowaList[i];
                $( "#test3" ).append( "<li>" + el.okregowaName.replace( /.* Nr/, "OKW" ) + "</li>" );
                $( "#test3" ).append( "<li>" + tmp( data.okregowaList[i] ) + "</li>" );
            }
        }
    } );
} );
/*
$("<div class='tooltip'></div>").css({
    position: "absolute",
    display: "none",
    opacity: 1
}).appendTo("body");

$("#wykres2").bind("plothover", function (event, pos, item) {
    if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);
        $(".tooltip").html(Math.round(y)).css({top: item.pageY+5, left: item.pageX-13}).fadeIn(200);
    } else {
        $(".tooltip").hide();
    }
});
*/