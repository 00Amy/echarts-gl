var echarts = require('echarts');
var ecConfig = require('echarts/config');
var mapParams = require('echarts/util/mapData/params').params;

myChart.setOption({
    series: [{
        name: 'Map 3D',
        type: 'map3d',
        mapType: 'world',
        baseLayer: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
        },
        itemStyle: {
            normal: {
                areaStyle: {
                    color: '#396696' 
                }
            }
        },
        data: [{}],
        mapLocation: {
            width: '80%'
        }
    }]
});

$.ajax({
    url: 'data/gdp.json',
    success: function (data) {

        if (! window.barChart) {
            var $chart2 = $('<div></div>').css({
                width: '50%',
                position: 'absolute',
                right: "0px",
                top: '0px',
                bottom: '0px',
                opacity: 0.7
            }).appendTo($('#main'));

            window.barChart = echarts.init($chart2[0]);
        }
        barChart.setOption({
            title: {
                text: 'World GDP',
                subtext: 'Data from Geohive',
                sublink: 'http://www.geohive.com/charts/ec_gdp1.aspx',
                x: 'center',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                borderWidth: 0
            },
            xAxis: {
                type: 'category',
                data: data.years.map(function (year) { return year + '年'; }),
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    }
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    }
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                position: 'right'
            },
            series: [{
                name: 'gdp',
                type: 'bar',
                data: [1400532, 2898133, 11027922, 22000729, 32346738, 63508421, 70441599, 71918394],
                itemStyle: {
                    normal: {
                        color: '#396696'
                    }
                }
            }]
        });

        var currentName = null;
        myChart.on(ecConfig.EVENT.CLICK, function (param) {
            if (data.data[param.name] && param.name !== currentName) {
                currentName = param.name;
                barChart.setOption({
                    title: {
                        text: currentName + ' GDP'
                    },
                    series: [{
                        name: 'gdp',
                        type: 'bar',
                        data: data.data[param.name]
                    }]
                });
            } 
        });
    }
});