var debug = false;
var token = "d171794c5c1f7a50aeb8f7056ab84a4fbcd6fbd594b1999bddaefdd03efc0591";
var baseUrl = window.location.href;
var serviceUrl = "dash/service/dashboard/complete"
var jsonURL = baseUrl.concat(serviceUrl);

var cfg = {
    vertical: {
        tooltip: {isHtml: true},
        legend: 'none',
        hAxis: { slantedText:true, slantedTextAngle:20 },
        vAxis: {format: '#%'},
        chartArea: {width: '90%', top: 10, height: '80%'},
        seriesType: "bars",
        colors: ['#5CB85C']
    },

    map: {
        region: 'PL',
        resolution: 'provinces',
        colorAxis: {colors: ['#5CB85C', '#F0AD4E','#D9534F']},
        backgroundColor: '#337AB7',
        legend: {
            numberFormat: "#.#'%"
        }
    }
};

var okrInWoj = [
    [1,2,3,4], [5,6,7], [8,9,10,11],
    [12,13], [14,15,16,17], [18,19,20],
    [21,22,23,24,25,26], [27], [28,29,30,31],
    [32,33,34], [35,36,37,38], [39,40,41],
    [42], [43,44], [45,46,47,48,49], [50,51]
];

 var wojName = ['dolnośląskie','kujawsko-pomorskie','lubelskie','lubuskie',
    'łódzkie','małopolskie','mazowieckie','opolskie',
    'podkarpackie','podlaskie','pomorskie','śląskie',
    'świętokrzyskie','warmińsko-mazurskie','wielkopolskie','zachodniopomorskie'];
