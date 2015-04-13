var debug = false;
var token = "d171794c5c1f7a50aeb8f7056ab84a4fbcd6fbd594b1999bddaefdd03efc0591"
var jsonURL = "http://91.250.114.134:8080/opw/service/wynik/complete"

//Dodawanie etykiet na kole
function labelFormatter( label, series ) {
    if ( label === "Tak" ) {
        return "<div style='color:#FFF;'>" + Math.round( series.percent ) + "%</div>";
    }
    return ""
}

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
    },


    cake: {
        series: {
            pie: {
                show: true,
                radius: 1,
                    label: {
                    show: true,
                    radius: 2 / 3,
                    formatter: labelFormatter,
                    threshold: 0.01
                }
            }
        },
        legend: {
            show: false
        }
    }
};
