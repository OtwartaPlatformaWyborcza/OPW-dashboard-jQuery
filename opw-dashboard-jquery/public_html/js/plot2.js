google.load('visualization', '1.0', {'packages':['corechart', 'bar']});
//google.setOnLoadCallback(prezydent);

function prezydent(data) {
    var dataChart = new google.visualization.DataTable();
    dataChart.addColumn('string', 'kandydat');
    dataChart.addColumn('number', 'wynik procentowy');
    dataChart.addColumn({type: 'string', role: 'tooltip', 'p': {'html':true}});
    dataChart.addColumn({type: 'string', role: 'annotation'});

    var suma = 0;
    for (i in data)
        suma+=data[i].glosow;

    for (i in data) {
        var procent = Math.round ( ( data[i].glosow * 100 ) / suma );
        dataChart.addRows( [ [ data[i].lastname, procent, "Głosów: <b>" + data[i].glosow.toString() + "</b>", procent.toString() + '%' ] ] );
    }

    dataChart.sort([{column: 0}, {column: 1}]);

    wrapper = new google.visualization.ChartWrapper({
        chartType: 'ColumnChart',
        dataTable: dataChart,
        options: {'tooltip': {isHtml: true}},
        containerId: 'wykres2',
    wrapper.draw();
}

$( document ).ready( function() { 
    $.ajax ( {
            beforeSend: function( request ) {
                request.setRequestHeader( "X-OPW-API-token", token );
                if ( debug === true ) {
                    request.setRequestHeader( "X-OPW-debug-500", "500" );
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
                prezydent(data.kandydatList);
            }
    });
});
