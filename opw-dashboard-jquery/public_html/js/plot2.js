google.load('visualization', '1.0', {'packages':['corechart', 'gauge', 'controls', 'table', 'geochart']});


function wojewodztwa(data) {

    var woj = {
        0: [0,0,0,0],
        1: [0,0,0,0],
        2: [0,0,0,0],
        3: [0,0,0,0],
        4: [0,0,0,0],
        5: [0,0,0,0],
        6: [0,0,0,0],
        7: [0,0,0,0],
        8: [0,0,0,0],
        9: [0,0,0,0],
        10: [0,0,0,0],
        11: [0,0,0,0],
        12: [0,0,0,0],
        13: [0,0,0,0],
        14: [0,0,0,0],
        15: [0,0,0,0]
    }

    var name = ['dolnośląskie','kujawsko-pomorskie','lubelskie','lubuskie','łódzkie','małopolskie','mazowieckie','opolskie','podkarpackie','podlaskie','pomorskie','śląskie','świętokrzyskie','warmińsko-mazurskie','wielkopolskie','zachodniopomorskie']

    var id,z;
    for (var i in data)
    {
        id = parseInt( (data[i].okregowaName.match(/\d{1,2}/)) );
        switch(true) {
            case (id<5):
                z=0;
                break;
            case (id<8):
                z=1;
                break;
            case (id<12):
                z=2;
                break;
            case (id<14):
                z=3;
                break;
            case (id<18):
                z=4;
                break;
            case (id<21):
                z=5;
                break;
            case (id<27):
                z=6;
                break;
            case (id<28):
                z=7;
                break;
            case (id<32):
                z=8;
                break;
            case (id<35):
                z=9;
                break;
            case (id<39):
                z=10;
                break;
            case (id<42):
                z=11;
                break;
            case (id<43):
                z=12;
                break;
            case (id<45):
                z=13;
                break;
            case (id<50):
                z=14;
                break;
            case (id<52):
                z=15;
                break;
        }
        woj[z][0]+=data[i].frekwencja;
        woj[z][1]+=data[i].frekwencjaAll;
        woj[z][2]+=data[i].obwodowa;
        woj[z][3]+=data[i].obwodowaAll;
    }

    console.log(woj);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Województwo');
    data.addColumn('number', 'Frekwencja');
    data.addColumn('number', 'Otrzymane protokoły');

    for (var i in woj) {
        data.addRows( [ [ name[i], Math.round( woj[i][0] * 10000 / woj[i][1] )/100, Math.round(( woj[i][2] * 10000 ) / woj[i][3])/100 ] ] );
    }

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
    dataChart.addColumn({type: 'string', role: 'annotation'});
    dataChart.addColumn({type: 'string', role: 'tooltip', 'p': {'html':true}});
    dataChart.addColumn('number', 'glosow');
    dataChart.addColumn('number', 'linia');

    var suma = 0;
    for (i in data)
        suma+=data[i].glosow;
    console.log(suma);
    var procent, nazwisko, etykieta, opis, imieNazwisko;
    for (i in data) {
        procent =  ( ( data[i].glosow * 100 ) / suma ) / 100;
        imieNazwisko = data[i].firstname + '&nbsp' + data[i].lastname.toUpperCase();
        nazwisko = data[i].lastname.toUpperCase();
        opis = "<b>" + imieNazwisko + " </b>Głosów:&nbsp;" + data[i].glosow.toString() +  "</b>";
        etykieta =  Math.round(procent*100) + '%';
        dataChart.addRows( [ [ nazwisko, procent, etykieta, opis, data[i].glosow, suma/2 ] ] );
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
            }
    });
});
