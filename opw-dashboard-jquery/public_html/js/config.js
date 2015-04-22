var debug = false;
var token = "d171794c5c1f7a50aeb8f7056ab84a4fbcd6fbd594b1999bddaefdd03efc0591";
var jsonURL = "http://91.250.114.134:8080/opw/service/wynik/complete";

var cfg = {
    vertical: {
        title: 'Wyniki kandydatów',
        tooltip: {isHtml: true},
        legend: 'none',
        hAxis: { slantedText:true, slantedTextAngle:20 },
        vAxis: {format: '#%'},
        //chartArea: {width: '85%'},
        seriesType: "bars",
    }
};

var okrInWoj = [
    [1,2,3,4], [5,6,7], [8,9,10,11],
    [12,13], [14,15,16,17], [18,19,20],
    [21,22,23,24,25,26], [27], [28,29,30,31],
    [32,33,34], [35,36,37,38], [39,40,41],
    [42], [43,44], [45,46,47,48,49], [50,51]
];