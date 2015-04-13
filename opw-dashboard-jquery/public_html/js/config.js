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
                    colors: [ { opacity: 0.7 }, { opacity: 1 } ]
                }
            }
        },
        xaxis: {
            mode: "categories",
            tickLength: 0
        },
        /*grid: {
            hoverable: true,
        },*/
        colors: [ "#449D44" ]
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
                    colors: [ { opacity: 0.7 }, { opacity: 1 } ]
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
