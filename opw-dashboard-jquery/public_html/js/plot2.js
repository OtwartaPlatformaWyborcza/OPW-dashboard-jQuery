google.load('visualization', '1.0', {'packages':['corechart', 'gauge', 'controls', 'table', 'geochart']});


function wojewodztwa() {
    var data = google.visualization.arrayToDataTable([
        ['Województwo', 'Frekwencja', 'Otrzymane protokoły'],
        ['Dolnośląskie', 2761477, 131],
        ['Kujawsko-pomorskie', 1324110, 176],
        ['Lubelskie', 959574, 127],
        ['Lubuskie', 907563, 117],
        ['Łódzkie', 655875, 19],
        ['Małopolskie', 607906, 260],
        ['Mazowieckie', 380181, 17],
        ['Opolskie', 371282, 141],
        ['Podkarpackie', 67370, 244],
        ['Podlaskie', 52192, 43],
        ['Pomorskie', 52192, 43],
        ['śląskie', 38262, 11],
        ['świętokrzyskie', 48262, 145],
        ['warmińsko-mazurskie', 38262, 211],
        ['wielkopolskie', 37262, 111],
        ['zachodniopomorskie', 78262, 80]
      ]);

      var options = {
        region: 'PL',
        resolution: 'provinces',
        colorAxis: {colors: ['#B0D794', '#4C6472']},
        backgroundColor: '#337AB7'
      };

      var chart = new google.visualization.GeoChart(document.getElementById('wykres4'));


      chart.draw(data, options);
}

function prezydent(data) {
    var dataChart = new google.visualization.DataTable();
    dataChart.addColumn('string', 'kandydat');
    dataChart.addColumn('number', 'wynik procentowy');
    dataChart.addColumn({type: 'string', role: 'tooltip', 'p': {'html':true}});
    dataChart.addColumn({type: 'string', role: 'annotation'});
    dataChart.addColumn('number', 'linia');

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
        dataChart.addRows( [ [ nazwisko, procent, opis, etykieta, 0.1 ] ] );
    }

    dataChart.sort([{column: 0}, {column: 1}, {column: 2}, {column: 3}, {column: 4}]);

    prezydentChar = new google.visualization.ChartWrapper({
        chartType: 'ComboChart',
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
                wojewodztwa();
            }
    });
});
