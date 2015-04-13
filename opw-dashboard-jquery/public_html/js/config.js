var debug = false;
var token = "d171794c5c1f7a50aeb8f7056ab84a4fbcd6fbd594b1999bddaefdd03efc0591"
var jsonURL = "http://91.250.114.134:8080/opw/service/wynik/complete"

var chartConfig = {
    verticalBar: {
        series: {
            bars: {
                show: true,
                barWidth: 0.9,
                align: "center",
                lineWidth: 0,
                fill: 1,
                fillColor: {
                    colors: [ "#F0AD4E", "#EB9316" ]
                }
            }
        },
        xaxis: {
            mode: "categories",
            tickLength: 0
        },
        /*grid: {
            hoverable: true,
        }*/
    },


    horizontalBar: {
        series: {
            bars: {
                show: true,
                horizontal: true,
                align: "center",
                lineWidth: 0,
                fill: 1,
                fillColor: {
                    colors: [ "#5BC0DE", "#2AABD2" ]
                }
            }
        },
        yaxis: {
            mode: "categories",
            tickLength: 0,
            autoscaleMargin: 0
        },
        colors: [ "#337AB7" ]
    }
};
