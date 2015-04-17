var debug = false;
var token = "d171794c5c1f7a50aeb8f7056ab84a4fbcd6fbd594b1999bddaefdd03efc0591";
var jsonURL = "http://91.250.114.134:8080/opw/service/wynik/complete";

var cfg = {
    vertical: {
        title: 'Wyniki kandydatów',
        tooltip: {isHtml: true},
        legend: 'none',
        hAxis: { slantedText:true, slantedTextAngle:20 },
        vAxes: {
            0: {format: '#%', title: 'Wynik procentowy', titleTextStyle: {italic: false}},
            1: {title: 'Liczba głosów', titleTextStyle: {italic: false}},
            2: {textPosition: 'none'}
        },
        seriesType: "bars",
        series: {
            0: {type: "bars", targetAxisIndex: 0},
            1: {type: "line", targetAxisIndex: 1, color: "none", enableInteractivity: false},
            2: {type: "line", targetAxisIndex: 2, enableInteractivity: false}
        }
    }
};
