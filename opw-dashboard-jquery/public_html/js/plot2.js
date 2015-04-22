google.load('visualization', '1.0', {'packages':['corechart', 'gauge', 'controls', 'table', 'geochart']});


function wojewodztwa(data) {
    var woj = {
        0: [0,0,0,0], 1: [0,0,0,0], 2: [0,0,0,0], 3: [0,0,0,0],
        4: [0,0,0,0], 5: [0,0,0,0], 6: [0,0,0,0], 7: [0,0,0,0],
        8: [0,0,0,0], 9: [0,0,0,0], 10: [0,0,0,0], 11: [0,0,0,0],
        12: [0,0,0,0], 13: [0,0,0,0], 14: [0,0,0,0], 15: [0,0,0,0]
    }

    var wojName = ['dolnośląskie','kujawsko-pomorskie','lubelskie','lubuskie',
    'łódzkie','małopolskie','mazowieckie','opolskie',
    'podkarpackie','podlaskie','pomorskie','śląskie',
    'świętokrzyskie','warmińsko-mazurskie','wielkopolskie','zachodniopomorskie'];

    var idOkr, idWoj=0;
    for (var i in data)
    {
        idOkr = parseInt( (data[i].okregowaName.match(/\d{1,2}/)) );
        for (var j = 0; j < okrInWoj.length; j++) {
            if (okrInWoj[j].indexOf(idOkr) >= 0) {
                idWoj = j;
                break;
            }
        }
        woj[idWoj][0]+=data[i].frekwencja;
        woj[idWoj][1]+=data[i].frekwencjaAll;
        woj[idWoj][2]+=data[i].obwodowa;
        woj[idWoj][3]+=data[i].obwodowaAll;
    }

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Województwo');
    data.addColumn('number', 'Frekwencja (procentowo)');
    data.addColumn('number', 'Otrzymane protokoły (procentowo)');

    var frekw, prot;
    for (var i in woj) {
        frekw = Math.round( woj[i][0] *100/ woj[i][1]);
        prot = Math.round(( woj[i][2] * 100 ) / woj[i][3]);
        data.addRows([[ wojName[i], frekw, prot ]]);
    }

    var options = {
        region: 'PL',
        resolution: 'provinces',
        colorAxis: {colors: ['#B0D794', '#4C6472']},
        backgroundColor: '#337AB7',
        legend: {
            numberFormat: "#.#'%"
        }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('wykres4'));

    chart.draw(data, options);
}

// Rysowanie wykresu dla kandydatow
function prezydent(data) {
    var dataChart = new google.visualization.DataTable();
    dataChart.addColumn('string', 'kandydat');
    dataChart.addColumn('number', 'wynik procentowy');
    dataChart.addColumn({type: 'string', role: 'annotation'});
    dataChart.addColumn({type: 'string', role: 'tooltip', 'p': {'html':true}});
    var suma = 0;
    for (i in data)
        suma+=data[i].glosow;

    var procent, nazwisko, etykieta, opis, imieNazwisko;
    for (i in data) {
        procent =  ( ( data[i].glosow * 100 ) / suma ) / 100;
        imieNazwisko = data[i].firstname + '&nbsp' + data[i].lastname.toUpperCase();
        nazwisko = data[i].lastname.toUpperCase();
        opis = "<b>" + imieNazwisko + " </b>Głosów:&nbsp;" + data[i].glosow.toString() +  "</b>";
        etykieta =  Math.round(procent*100) + '%';
        dataChart.addRows( [ [ nazwisko, procent, etykieta, opis ] ] );
    }

    dataChart.sort([{column: 0}]);

    prezydentChar = new google.visualization.ChartWrapper({
        chartType: 'ComboChart',
        dataTable: dataChart,
        options: cfg.vertical,
        containerId: 'wykres2'
    });

    prezydentChar.draw();

}

// Rysowanie gauge
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
                wojewodztwa(data.okregowaList);
                var aktualizacja = data.exportDate.substring( 11, 19 );
                $( "#aktualizacja" ).append( "<span>" + aktualizacja + "</span>" );
            }
    });
});
