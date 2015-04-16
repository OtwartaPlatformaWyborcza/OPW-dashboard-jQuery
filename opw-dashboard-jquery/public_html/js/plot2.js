google.load('visualization', '1.0', {'packages':['corechart', 'bar', 'gauge']});

function prezydent(data) {
    var dataChart = new google.visualization.DataTable();
    dataChart.addColumn('string', 'kandydat');
    dataChart.addColumn('number', 'wynik procentowy');
    dataChart.addColumn({type: 'string', role: 'tooltip', 'p': {'html':true}});
    dataChart.addColumn({type: 'string', role: 'annotation'});

    var suma = 0;
    for (i in data)
        suma+=data[i].glosow;

    var procent, nazwisko, etykieta, opis, imieNazwisko;
    for (i in data) {
        procent =  ( ( data[i].glosow * 100 ) / suma ) / 100;
        imieNazwisko = data[i].firstname + '&nbsp' + data[i].lastname.toUpperCase();
        nazwisko = data[i].lastname.toUpperCase();
        opis = "<b>" + imieNazwisko + "</b> " + data[i].glosow.toString() +  "</b>";
        etykieta =  Math.round(procent*100) + '%';
        dataChart.addRows( [ [ nazwisko, procent, opis, etykieta ] ] );
    }

    dataChart.sort([{column: 0}, {column: 1}]);

    prezydentChar = new google.visualization.ChartWrapper({
        chartType: 'ColumnChart',
        dataTable: dataChart,
        options: cfg.vertical,
        containerId: 'wykres2'
    });

    prezydentChar.draw();

}


function gauge(a, b) {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'value'],
        ['gauge', Math.round(b/a*100) ]
    ]);

    var options = {
          width: 400, height: 120,
          redFrom: 0, redTo: 33,
          yellowFrom: 33, yellowTo: 66,
          greenFrom: 66, greenTo: 100,
          minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('gauge'));

    chart.draw(data, options);

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
                gauge(data.obwodowaAll, data.obwodowa);
            }
    });
});
