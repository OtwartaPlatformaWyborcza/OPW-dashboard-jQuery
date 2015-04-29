google.load('visualization', '1.1', {'packages': ['corechart', 'gauge', 'table','geochart']});

function procent(x, max, digit) {
    digit = digit || 1
    var pow = Math.pow(10, digit);
    return Math.round((x * 100 / max) * pow) / pow;
}

function getWojId(okreg) {
    for (var i = 0; i < okrInWoj.length; i++) {
        if (okrInWoj[i].indexOf(okreg) >= 0)
            return i;
    }
}

//Rysowanie map
function wojewodztwa(data) {
    var woj = {
        0: [0, 0, 0, 0], 1: [0, 0, 0, 0], 2: [0, 0, 0, 0], 3: [0, 0, 0, 0],
        4: [0, 0, 0, 0], 5: [0, 0, 0, 0], 6: [0, 0, 0, 0], 7: [0, 0, 0, 0],
        8: [0, 0, 0, 0], 9: [0, 0, 0, 0], 10: [0, 0, 0, 0], 11: [0, 0, 0, 0],
        12: [0, 0, 0, 0], 13: [0, 0, 0, 0], 14: [0, 0, 0, 0], 15: [0, 0, 0, 0]
    }

    var idOkr, idWoj;
    for (var i in data) {
        idOkr = parseInt((data[i].okregowaName.match(/\d{1, 2}/)));
        idWoj = getWojId(idOkr);

        woj[idWoj][0] += data[i].frekwencja;
        woj[idWoj][1] += data[i].frekwencjaAll;
        woj[idWoj][2] += data[i].obwodowa;
        woj[idWoj][3] += data[i].obwodowaAll;
    }

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Województwo');
    chartData.addColumn('number', 'Frekwencja (procentowo)');
    chartData.addColumn('number', 'Otrzymane protokoły (procentowo)');

    var frekw, prot;
    for (var i in woj) {
        frekw = procent(woj[i][0], woj[i][1], 2);
        prot = procent(woj[i][2], woj[i][3], 2);
        chartData.addRows([[wojName[i], frekw, prot]]);
    }

    var chart = new google.visualization.GeoChart(document.getElementById('wykres4'));
    chart.draw(chartData, cfg.map);

    function popInfo() {
        var selectedItem = chart.getSelection()[0];
        var wojewodztwo = chartData.getValue(selectedItem.row, 0);
        oknoModal(data, wojewodztwo);
    }

    google.visualization.events.addListener(chart, 'select', popInfo);
}

function oknoModal(data, wojewodztwo) {
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Okręg');
    chartData.addColumn('number', 'Frekwencja (procentowo)');
    chartData.addColumn('number', 'Otrzymane protokoły (procentowo)');

    var idOkr, nameOkr;
    for (var i in data) {
        nameOkr = data[i].okregowaName;
        idOkr = parseInt((nameOkr.match(/\d{1,2}/)));
        if (wojName[getWojId(idOkr)] === wojewodztwo) {
            chartData.addRows([[nameOkr, procent(data[i].frekwencja, data[i].frekwencjaAll), procent(data[i].obwodowa, data[i].obwodowaAll)]]);
        }
    }

    var tabela = new google.visualization.Table(document.getElementById('tabela'));
    tabela.draw(chartData, {style: 'font-family:Open Sans'});

    $('.modal-title').text('Dane z województwa: ' + wojewodztwo);
    $('.modal').modal('show');
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
        suma += data[i].glosow;

    var procenty, nazwisko, etykieta, opis, imieNazwisko;
    for (i in data) {
        procenty =  procent(data[i].glosow, suma) / 100;
        imieNazwisko = data[i].firstname + '&nbsp' + data[i].lastname.toUpperCase();
        nazwisko = data[i].lastname.toUpperCase();
        opis = '<b>' + imieNazwisko + ' </b>Głosów:&nbsp;' + data[i].glosow.toString() +  '</b>';
        etykieta =  Math.round(procenty * 100) + '%';
        dataChart.addRows([[nazwisko, procenty, etykieta, opis]]);
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

$(document).ready(function() {
    $.ajax ({
        beforeSend: function(request) {
            request.setRequestHeader('X-OPW-API-token', token);
            if (debug === true) {
                request.setRequestHeader('X-OPW-debug-500', '500');
            };
        },

        dataType: 'json',
        url: jsonURL,
        statusCode: {
            500: function() {
                console.log('Error: 500');
            }
        },
        success: function(data) {
            prezydent(data.kandydatList);
            gauge(procent(data.obwodowa, data.obwodowaAll), 'canvProto');
            gauge(procent(data.frekwencja, data.frekwencjaAll), 'canvFrekw');
            wojewodztwa(data.okregowaList);
            var aktualizacja = data.exportDate.substring(11, 19);
            $('#aktualizacja').append('<span>' + aktualizacja + '</span>');
        }
    });
});
