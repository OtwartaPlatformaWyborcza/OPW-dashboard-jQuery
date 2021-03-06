google.load('visualization', '1.1', {'packages': ['corechart', 'gauge', 'table', 'geochart']});

//Wyliczanie procentu z liczby
function procent(x, max, digit) {
    digit = digit || 1
    var pow = Math.pow(10, digit);
    return Math.round((x * 100 / max) * pow) / pow;
}

//Zwraca id okregu wyborczego
function getWojId(okreg) {
    for (var i = 0; max = okrInWoj.length, i < max; i++) {
        if (okrInWoj[i].indexOf(okreg) >= 0)
            return i;
    }
}

//Rysowanie mapy
function wojewodztwa(data) {
    if (data.length === 0) {
        $("#wykres4").append( "<div class='alert alert-warning' role='alert'>Przepraszamy. Mapa tymczasowo niedostępna</div>" );
        return;
    }
    var woj = {
        0: [0, 0, 0, 0], 1: [0, 0, 0, 0], 2: [0, 0, 0, 0], 3: [0, 0, 0, 0],
        4: [0, 0, 0, 0], 5: [0, 0, 0, 0], 6: [0, 0, 0, 0], 7: [0, 0, 0, 0],
        8: [0, 0, 0, 0], 9: [0, 0, 0, 0], 10: [0, 0, 0, 0], 11: [0, 0, 0, 0],
        12: [0, 0, 0, 0], 13: [0, 0, 0, 0], 14: [0, 0, 0, 0], 15: [0, 0, 0, 0]
    }

    var idOkr, idWoj;
    for (var i in data) {
        idOkr = parseInt((data[i].okregowaName.match(/\d{1,2}/)));
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

    //Dane do tabel
    function popInfo() {
        var selectedItem = chart.getSelection()[0];
        var wojewodztwo = chartData.getValue(selectedItem.row, 0);
        oknoModal(data, wojewodztwo);
    }

    google.visualization.events.addListener(chart, 'select', popInfo);
}

//Pop-up do mapy
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
    dataChart.addColumn({type: 'string', role: 'tooltip', p: {html:true}});
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

//Konwertuj timestamp na czytelna godzine
function timeConvert(timestamp) {
    var date = new Date(parseInt(timestamp));
    var hours = date.getUTCHours();
    var minutes = "0" + date.getUTCMinutes();
    var seconds = "0" + date.getUTCSeconds();
    var offset = date.getTimezoneOffset() / 60;
    return $("#aktualizacja").append( hours-offset + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2) ); 
}

function tooltip(data) {
    $("#canvProto").mousemove(function(event){
        $("#protoTooltip").css({left: event.clientX+15, top: event.clientY+15});
    });
    
    $('#canvProto').on('mouseover', function(event){
        $("#protoTooltip").stop().fadeIn();
    });

    $('#canvProto').on('mouseout', function(event){
        $("#protoTooltip").stop().fadeOut();
    });

    $("#protoTooltip").append(data);
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
                window.location.href = "err500.html";
            }
        },
        success: function(data) {
            prezydent(data.kandydatList);
            gauge(procent(data.obwodowa, data.obwodowaAll), 'canvProto');
            gauge(procent(data.frekwencja, data.frekwencjaAll), 'canvFrekw');
            wojewodztwa(data.okregowaList);
            tooltip(data.obwodowa);
            timeConvert(data.exportDate);
        }
    });
});
