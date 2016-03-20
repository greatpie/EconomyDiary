    /*********************  wfh/start **************************/

// 绘制d3图表
var drawed = 0;
function drawD3Graph(){
    if(drawed == 0){
        drawSVG();
        drawed = 1;
    }
}
function drawSVG() {
    var W = $(window).width(), H = $(window).height();

    $('.graphContainer').css({
        'width': W + 'px',
        'height': H + 'px'
    })
    $('#graphPage1,#graphPage2').css({
        'width': H + 'px',
        'height': W + 'px',
        'margin-left': W + 'px'
    });

    var w = $('#svg-area').width(), h = $('#svg-area').height();

    var w_filter = w * .18, h_filter = h * .175;

    //    graphPage1的svg的过滤器和背景矩形
    var svg = d3.select('#svg-area').append('svg')
        .attr('width', w)
        .attr('height', h);

    var filters = svg.append('g').attr('class', 'filters');
    var graphArea = svg.append('g').attr('class', 'graph_area');

    function drawFilter(filters, y, name, text) {
        var g = filters.append('g')
            .attr('class', 'filter')
            .attr('data-name', name)
            .style({
                'transform': 'translate(' + w * .02 + 'px,' + y + 'px)',
                '-webkit-transform': 'translate(' + w * .02 + 'px,' + y + 'px)'
            });

        g.append('rect')
            .attr('class', 'rect')
            .attr('width', w_filter)
            .attr('height', h_filter)
            .attr('x', 0)
            .attr('y', 0)
            .attr('rx', '5px')
            .attr('ry', '5px')
        if (text) {
            g.append('text')
                .attr('class', 'filter_text')
                .attr('dx', '2.5em')
                .attr('dy', '1.3em')
                .text(text[0]);
            g.append('text')
                .attr('class', 'filter_text')
                .attr('dx', '1.5em')
                .attr('dy', '2.5em')
                .text(text[1]);
        }

        return g;
    }

    var filter_name = ['GDP', 'foreignTrade', 'railway', 'CO2'];
    var filter_text = [['GDP', '增长率'], ['外贸', '依存度'], , ['CO2', '排放量']];
    var rect1 = drawFilter(filters, 0, filter_name[0], filter_text[0]),
        rect2 = drawFilter(filters, h_filter + h * .035, filter_name[1], filter_text[1]),
        rect3 = drawFilter(filters, h_filter * 2 + h * .07, filter_name[2]),
        rect4 = drawFilter(filters, h_filter * 3 + h * .105, filter_name[3], filter_text[3]);

    rect1.select('rect')
        .style({
            'transform': 'translateX(' + (-w * .02) + 'px)',
            '-webkit-transform': 'translateX(' + (-w * .02) + 'px)'
        })
        .classed({'active': true});

    rect3.append('text')
        .attr('class', 'filter_text')
        .attr('dy', '2em')
        .attr('dx', '2.5em')
        .text('铁路');

    var graphRect = graphArea.append('rect')
        .attr('class', 'graph_rect')
        .attr('width', w * .84)
        .attr('height', h)
        .attr('x', w_filter - w * .02)
        .attr('y', 0)
        .attr('rx', '10px')
        .attr('ry', '10px')
        .style('fill', '#b82727');


    //    graphPage2的svg的过滤器和背景矩形
    var svg2 = d3.select('#svg-area2').append('svg')
        .attr('width', w)
        .attr('height', h);

    var filters2 = svg2.append('g').attr('class', 'filters2');
    var graphArea2 = svg2.append('g').attr('class', 'graph_area2');

    var filter_name2 = ['Gini', 'Engel', 'lifeLength', 'literacyRate'];
    var rect5 = drawFilter(filters2, 0, filter_name2[0]),
        rect6 = drawFilter(filters2, h_filter + h * .035, filter_name2[1]),
        rect7 = drawFilter(filters2, h_filter * 2 + h * .07, filter_name2[2]),
        rect8 = drawFilter(filters2, h_filter * 3 + h * .105, filter_name2[3]);

    rect5.select('rect')
        .style({
            'transform': 'translateX(' + (-w * .02) + 'px)',
            '-webkit-transform': 'translateX(' + (-w * .02) + 'px)'
        })
        .classed({'active': true});

    rect5.append('text')
        .attr('class', 'filter_text')
        .attr('dy', '1.9em')
        .attr('dx', '.8em')
        .text('基尼系数');
    rect6.append('text')
        .attr('class', 'filter_text')
        .attr('dy', '1.35em')
        .attr('dx', '1.8em')
        .text('恩格尔');
    rect6.append('text')
        .attr('class', 'filter_text')
        .attr('dy', '2.45em')
        .attr('dx', '2.8em')
        .text('系数');
    rect7.append('text')
        .attr('class', 'filter_text')
        .attr('dy', '1.9em')
        .attr('dx', '.8em')
        .text('预期寿命');
    rect8.append('text')
        .attr('class', 'filter_text')
        .attr('dy', '1.9em')
        .attr('dx', '1.8em')
        .text('识字率');

    var graphRect2 = graphArea2.append('rect')
        .attr('class', 'graph_rect')
        .attr('width', w * .84)
        .attr('height', h)
        .attr('x', w_filter - w * .02)
        .attr('y', 0)
        .attr('rx', '10px')
        .attr('ry', '10px')
        .style('fill', '#b82727');

    //操作数据画图
    d3.csv('./data/streamDATA.csv', function (data) {
        var data1 = data;
        var dataL = data1.length;

        var gdp = [], first = [], second = [], third = [], gdpRate = [];

        for (var i = 0, j = 0; i < dataL; i++) {
            first[i] = {};
            first[i].x = parseInt(data1[i].year);
            first[i].y = parseFloat(data1[i].first) / 10000;

            third[i] = {};
            third[i].x = parseInt(data1[i].year);
            third[i].y = parseFloat(data1[i].third) / 10000;

            second[i] = {};
            second[i].x = parseInt(data1[i].year);
            second[i].y = parseFloat(data1[i].second) / 10000;

            gdp[i] = {};
            gdp[i].x = parseInt(data1[i].year);
            gdp[i].y = parseFloat(data1[i].GDP) / 10000;

            if (data1[i].GDP_rate) {
                gdpRate[j] = {};
                gdpRate[j].x = parseInt(data1[i].year);
                gdpRate[j].y = parseInt(data1[i].GDP_rate);
                j++;
            }
        }

        var l = gdp.length;

        var x = d3.scale.linear()
            .domain([1952, 2015])
            .range([0, w * .65]);

        var y = d3.scale.linear()
//                .domain([0, d3.max(gdp, function(d){return d.y})])
            .domain([0, 70])
            .range([h * .8, 0]);

        //绘制面积图
        var color = ['#a5e054', '#ee6ab5', '#52e0fa', '#f4dfdf'];//gdp,第二产业，第三产业，第一产业

        var area = d3.svg.area()
            .x(function (d) {
                return x(d.x);
            })
            .y0(function (d) {
                return y(0);
            })
            .y1(function (d) {
                return y(d.y);
            });

        function drawArea(arr, arrName, color) {
            var clipID = drawClip(arrName);
            graphArea.append('g')
                .style({
                    'transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)',
                    '-webkit-transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)'
                })
                .append('path')
                .datum(arr)
                .attr('d', area)
                .attr('clip-path', 'url(#' + clipID + ')')
                .style('fill', function () {
                    return color;
                });
        }

        function drawClip(arrName) {
            var clipID = arrName + 'Clip';
            svg.append('clipPath')
                .attr('id', clipID)
                .append('rect')
                .attr('width', 0)
                .attr('height', h);
            return clipID;
        }

        drawArea(gdp, 'gdp', color[3]);
        drawArea(second, 'second', color[2]);
        drawArea(third, 'third', color[1]);
        drawArea(first, 'first', color[0]);

        function draw(){
            d3.select('#gdpClip rect')
                .transition().duration(2000).ease('linear')
                .attr('width', w);
            d3.select('#secondClip rect')
                .transition().delay(1500).duration(2000).ease('linear')
                .attr('width', w);
            d3.select('#thirdClip rect')
                .transition().delay(3000).duration(2000).ease('linear')
                .attr('width', w);
            d3.select('#firstClip rect')
                .transition().delay(4500).duration(2000).ease('linear')
                .attr('width', w);
        }

        draw();

//    graphPage1坐标轴
        var format = d3.format("d");
        var xAxis = d3.svg.axis()
            .scale(x)
            .tickValues([1955, 1965, 1975, 1985, 1995, 2005, 2015])
            .outerTickSize(0)
            .orient('bottom')
            .tickFormat(format);

        var yAxis1 = d3.svg.axis()
            .scale(y)
            .tickValues([0, 10, 20, 30, 40, 50, 60, 70])
            .outerTickSize(0)
            .orient('right');

        graphArea.append('g')
            .attr('class', 'axis x')
            .style({
                'transform': 'translate(' + w * .25 + 'px,' + h * .89 + 'px)',
                '-webkit-transform': 'translate(' + w * .25 + 'px,' + h * .89 + 'px)'
            })
            .call(xAxis)
            .append('text')
            .attr('class', 'title')
            .attr('x', w * .7)
            .attr('dy', '2em')
            .text('年');

        graphArea.append('g')
            .attr('class', 'axis y y1')
            .style({
                'transform': 'translate(' + w * .92 + 'px,' + h * .08 + 'px)',
                '-webkit-transform': 'translate(' + w * .92 + 'px,' + h * .08 + 'px)'
            })
            .call(yAxis1)
            .append('text')
            .attr('class', 'title')
            .attr('dx', '-5.4em')
            .attr('dy', '3px')
            .text('（万亿元）');

        //        折线图
        var y2 = d3.scale.linear()
            .domain([-30, 30])
            .range([h * .8, 0]);

        //    绘制左侧的y2坐标轴和相应的折线图
        function drawLineAndY2(y2_domain, arr, tickValues, className, text) {
            y2.domain(y2_domain);

            var line = d3.svg.line()
                .x(function (d) {
                    return x(d.x);
                })
                .y(function (d) {
                    return y2(d.y);
                });

            graphArea.append('g')
                .attr('class', 'line ' + className)
                .style({
                    'transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)',
                    '-webkit-transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)'
                })
                .append('path')
                .datum(arr)
                .attr('d', line)
                .attr('stroke', '#fff')
                .attr('stroke-width', '2px')
                .attr('fill', 'none');

            var yAxis2 = d3.svg.axis()
                .scale(y2)
                .tickValues(tickValues)
                .outerTickSize(0)
                .orient('left');

            graphArea.append('g')
                .attr('class', 'axis y y2 ' + className)
                .style({
                    'transform': 'translate(' + w * .23 + 'px,' + h * .08 + 'px)',
                    '-webkit-transform': 'translate(' + w * .23 + 'px,' + h * .08 + 'px)'
                })
                .call(yAxis2)
                .append('text')
                .attr('class', 'title')
                .attr('dy', '3px')
                .text(text);
        }


//        导入第二组数据用于各折线图的绘制
        d3.csv('./data/lineDATA.csv', function (error, data) {
            var data2 = data;
            var dataL2 = data2.length;

//            graphPage1折线和左轴
            var foreignTrade = [], railway = [], CO2cn = [], CO2world = [];

            for (var i = 0/*data*/, j = 0/*foriegnTrade*/, k = 0/*railway*/, m = 0/*CO2cn*/, n = 0/*CO2world*/; i < dataL2; i++) {
                if (data2[i].foreignTrade) {
                    foreignTrade[j] = {};
                    foreignTrade[j].x = parseInt(data2[i].yearA);
                    foreignTrade[j].y = parseFloat(data2[i].foreignTrade);
                    j++;
                }
                if (data2[i].railway) {
                    railway[k] = {};
                    railway[k].x = parseInt(data2[i].yearA);
                    railway[k].y = parseFloat(data2[i].railway) / 10000;
                    k++;
                }
                if (data2[i].CO2cn) {
                    CO2cn[m] = {};
                    CO2cn[m].x = parseInt(data2[i].yearA);
                    CO2cn[m].y = parseFloat(data2[i].CO2cn);
                    m++;
                }
                if (data2[i].CO2world) {
                    CO2world[n] = {};
                    CO2world[n].x = parseInt(data2[i].yearA);
                    CO2world[n].y = parseFloat(data2[i].CO2world);
                    n++;
                }
            }

//            所有左坐标轴与折线，先画出来，再隐藏,只显示GDP的
            drawLineAndY2([-30, 30], gdpRate, [-30, -20, -10, 0, 10, 20, 30], filter_name[0], '（%）');//GDP增长率
            drawLineAndY2([0, 70], foreignTrade, [0, 10, 20, 30, 40, 50, 60, 70], filter_name[1], '（%）');//外贸依存度
            drawLineAndY2([0, 7], railway, [0, 1, 2, 3, 4, 5, 6, 7], filter_name[2], '（万公里）');//铁路总公里数
            drawLineAndY2([0, 7], CO2cn, [0, 1, 2, 3, 4, 5, 6, 7], filter_name[3], '（人均公吨数）');//CO2排放量(中国)
            drawLineAndY2([0, 7], CO2world, [0, 1, 2, 3, 4, 5, 6, 7], 'CO2 CO2world', '（人均公吨数）');//CO2排放量（世界）

            d3.select('.CO2world path').attr('stroke', '#b5a4ef')

            graphArea.selectAll('.line').style('display', 'none');
            graphArea.selectAll('.axis.y2').style('display', 'none');
            graphArea.selectAll('.line.GDP').style('display', 'block');
            graphArea.selectAll('.axis.y2.GDP').style('display', 'block');

            var xx = d3.scale.linear()
                .domain([1952, 2015])
                .range([0, w * .65]);//为什么x不能传入进来
//            加关键点标注
            var GDP_points = [
                {'x': 1961, 'y': -27.3, 'text': '1961年，-27.3%'},
                {'x': 1970, 'y': 19.4, 'text': '1970年，19.4%'}
            ];
            var foreignTrade_points = [
                {'x': 1971, 'y': 4.98, 'text': '1971年，4.98%'},
                {'x': 2006, 'y': 64.77, 'text': '2006年，64.77%'}
            ];
            var railway_points = [
                {'x': 1980, 'y': 4.994, 'text': '1980年，49940km'},
                {'x': 2014, 'y': 6.6989, 'text': '2014年，66989km'}
            ];
            var CO2_points = [
                {'x': 2005.5, 'y': 4.6, 'text': ''}
            ];


            addLabelA(GDP_points, [-30, 30], 'GDP');
            addLabelA(foreignTrade_points, [0, 70], 'foreignTrade');
            addLabelA(railway_points, [0, 7], 'railway');
            addLabelA(CO2_points, [0, 7], 'CO2')

//            位置调整
            d3.select('.GDP.label1 text').attr('dx', '0px')
                .attr('dy', '-1em')
                .attr('text-anchor', 'middle');
            d3.select('.foreignTrade.label1 text').attr('dx', '-1em')
                .attr('text-anchor', 'end');
            d3.select('.railway.label0 text').attr('dx', '0px')
                .attr('dy', '1.4em')
                .attr('text-anchor', 'middle');
            d3.select('.railway.label1 text').attr('dx', '-6em')
                .attr('dy', '4.5em')
                .attr('text-anchor', 'middle');

            //连接小线
            d3.select('.railway.label1').append('line')
                .attr('x1', xx(railway_points[1].x) - 5)
                .attr('y1', function () {
                    y2.domain([0, 7]);
                    return y2(railway_points[1].y) + 5;
                })
                .attr('x2', xx(railway_points[1].x) - 24)
                .attr('y2', function () {
                    y2.domain([0, 7]);
                    return y2(railway_points[1].y) + 30;
                })
                .attr('stroke', '#7d0022')
                .attr('stroke-width', '1px');
            graphArea.append('g')
                .attr('class', 'label labelWorld CO2')
                .style({
                    'transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)',
                    '-webkit-transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)'
                })
                .append('text')
                .attr('x', xx(1968))
                .attr('y', function () {
                    y2.domain([0, 7]);
                    return y2(3.575455139);
                })
                .attr('dx', '-4em')
                .attr('dy', '-2em')
                .attr('fill', '#b5a4ef')
                .text('世界');
            d3.select('.CO2.labelWorld').append('line')
                .attr('x1', xx(1968) - 5)
                .attr('y1', function () {
                    y2.domain([0, 7]);
                    return y2(3.575455139) - 5;
                })
                .attr('x2', xx(1968) - 16)
                .attr('y2', function () {
                    y2.domain([0, 7]);
                    return y2(3.575455139) - 14;
                })
                .attr('stroke', '#b5a4ef')
                .attr('stroke-width', '1px');
            graphArea.append('g')
                .attr('class', 'label labelCN CO2')
                .style({
                    'transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)',
                    '-webkit-transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)'
                })
                .append('text')
                .attr('x', xx(1984))
                .attr('y', function () {
                    y2.domain([0, 7]);
                    return y2(1.75044806);
                })
                .attr('dx', '1.5em')
                .attr('dy', '2.5em')
                .attr('fill', '#fff')
                .text('中国');
            d3.select('.CO2.labelCN').append('line')
                .attr('x1', xx(1984) + 3)
                .attr('y1', function () {
                    y2.domain([0, 7]);
                    return y2(1.75044806) + 3;
                })
                .attr('x2', xx(1984) + 12)
                .attr('y2', function () {
                    y2.domain([0, 7]);
                    return y2(1.75044806) + 12;
                })
                .attr('stroke', '#fff')
                .attr('stroke-width', '1px');

            graphArea.selectAll('.label').style('display', 'none');
            graphArea.selectAll('.label.GDP').style('display', 'block');

            function addLabelA(pointArr, yDomain, className) {
                addLabel(graphArea, pointArr, xx, y2, [1952, 2015], yDomain, className);
            }

            function addLabel(graphArea, pointsArr, x, y, xDomain, yDomain, className) {
                x.domain(xDomain);
                y.domain(yDomain);
                for (var i = 0; i < pointsArr.length; i++) {
                    graphArea.append('g')
                        .attr('class', className + ' label label' + i)
                        .style({
                            'transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)',
                            '-webkit-transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)'
                        })
                        .append('circle')
                        .attr('class', 'point point' + i)
                        .attr('cx', x(pointsArr[i].x))
                        .attr('cy', y(pointsArr[i].y))
                        .attr('r', '4px');
//                        .attr('fill','#7d0022')
                    d3.select('.' + className + '.label' + i).append('text')
                        .attr('x', x(pointsArr[i].x))
                        .attr('y', y(pointsArr[i].y))
                        .attr('dx', '1em')
                        .attr('dy', '3px')
                        .text(pointsArr[i].text);
                }
            }

//            graphPage2图表
            var tempGDP = [], tempPerGDP = [];

            function getLineDATA(yearStart/*int*/, yearEnd/*int*/, arr, arrName/*str*/, arr2/*perGDP*/, arr3/*optional*/, arr3Name) {
                tempGDP = [], tempPerGDP = [];

                for (var i = 0, j = 0, k = 0, l = 0; i < dataL2; i++) {
                    if (parseInt(data2[i].yearA) >= yearStart && parseInt(data2[i].yearA) <= yearEnd) {
                        tempGDP[j] = parseFloat(data2[i].GDP);

                        if (data2[i][arrName]) {
                            arr[k] = {};
                            arr[k].x = tempGDP[j];
                            arr[k].y = parseFloat(data2[i][arrName]);
                            k++;
                        }
                        if (arr3) {
                            if (data2[i][arr3Name]) {
                                arr3[l] = {};
                                arr3[l].x = tempGDP[j];
                                arr3[l].y = parseFloat(data2[i][arr3Name]);
                                l++;
                            }
                        }
                        else {
                            arr3 = [];
                        }
                        j++;
                    }
                }
                for (var i = 0, j = 0; i < dataL2; i++) {
                    if (parseInt(data2[i].yearB) >= yearStart && parseInt(data2[i].yearB) <= yearEnd) {
                        tempPerGDP[j] = parseFloat(data2[i].perGDP) / 1000;
                        j++;
                    }
                }
                for (var i = 0; i < tempGDP.length; i++) {
                    arr2[i] = {};
                    arr2[i].x = tempGDP[i];
                    arr2[i].y = tempPerGDP[i];
                }

                var result = [arr, arr2, arr3];
                return result;
            }

            function drawAxises(Xdomain, YLdomain, YRdomain, className, YLtext, YLtickValues, YRtickValues, XtickValues) {
                x.domain(Xdomain);
                yl.domain(YLdomain);
                yr.domain(YRdomain);
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .tickValues(XtickValues)
                    .outerTickSize(0)
                    .orient('bottom');
                var ylAxis = d3.svg.axis()
                    .scale(yl)
                    .tickValues(YLtickValues)
                    .outerTickSize(0)
                    .orient('left');
                var yrAxis = d3.svg.axis()
                    .scale(yr)
                    .tickValues(YRtickValues)
                    .outerTickSize(0)
                    .orient('right');

                graphArea2.append('g')
                    .attr('class', 'axis x ' + className)
                    .style({
                        'transform': 'translate(' + w * .25 + 'px,' + h * .85 + 'px)',
                        '-webkit-transform': 'translate(' + w * .25 + 'px,' + h * .85 + 'px)'
                    })
                    .call(xAxis)
                    .append('text')
                    .attr('class', 'title')
                    .attr('x', w * .72)
                    .attr('dy', '3.3em')
                    .style('font-size', '8px')
                    .style('text-anchor', 'end')
                    .text('（GDP/万亿元）');

                graphArea2.append('g')
                    .attr('class', 'axis y yl ' + className)
                    .style({
                        'transform': 'translate(' + w * .23 + 'px,' + h * .08 + 'px)',
                        '-webkit-transform': 'translate(' + w * .23 + 'px,' + h * .08 + 'px)'
                    })
                    .call(ylAxis)
                    .append('text')
                    .attr('class', 'title')
                    .attr('dy', '3px')
                    .text(YLtext);

                graphArea2.append('g')
                    .attr('class', 'axis y yr ' + className)
                    .style({
                        'transform': 'translate(' + w * .92 + 'px,' + h * .08 + 'px)',
                        '-webkit-transform': 'translate(' + w * .92 + 'px,' + h * .08 + 'px)'
                    })
                    .call(yrAxis)
                    .append('text')
                    .attr('class', 'title')
                    .attr('dx', '-4.4em')
                    .attr('dy', '3px')
                    .text('（千元）');
            }

            function drawLines(Xdomain, yScale, Ydomain, arr, className, stroke) {
                x.domain(Xdomain);
                yScale.domain(Ydomain);

//                console.log(y(30));
                var line = d3.svg.line()
                    .x(function (d) {
                        return x(d.x);
                    })
                    .y(function (d) {
                        return yScale(d.y);
                    });

                graphArea2.append('g')
                    .attr('class', 'line ' + className)
                    .style({
                        'transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)',
                        '-webkit-transform': 'translate(' + w * .25 + 'px,' + h * .08 + 'px)'
                    })
                    .append('path')
                    .datum(arr)
                    .attr('d', line)
                    .attr('stroke', stroke ? stroke : '#fff')
                    .attr('stroke-width', '2px')
                    .attr('fill', 'none');
            }


            var x = d3.scale.linear()
//                    .domain([0, 70])
                .range([0, w * .65]);

            var yl = d3.scale.linear()
//                    .domain([25, 50])
                .range([h * .76, 0]);

            var yr = d3.scale.linear()
//                    .domain([0, 50])
                .range([h * .76, 0]);

//            Gini data
            var Gini = [], GiniPerGDP = [];
            var GiniResult = getLineDATA(1981, 2015, Gini, 'Gini', GiniPerGDP);
            Gini = GiniResult[0];
            GiniPerGDP = GiniResult[1];

//            Engel data
            var cityEngel = [], countryEngel = [], EngelPerGDP = [];
            var EngelResult = getLineDATA(1978, 2008, cityEngel, 'cityEngel', EngelPerGDP, countryEngel, 'countryEngel');
            cityEngel = EngelResult[0];
            EngelPerGDP = EngelResult[1];
            countryEngel = EngelResult[2];

//            lifeLength data
            var lifeLength = [], lifeLengthPerGDP = [];
            var lifeLengthResult = getLineDATA(1960, 2013, lifeLength, 'lifeLength', lifeLengthPerGDP);
            lifeLength = lifeLengthResult[0];
            lifeLengthPerGDP = lifeLengthResult[1];

//            literacyRate data
            var literacyRate = [], literacyRatePerGDP = [];
            var literacyRateResult = getLineDATA(1982, 2015, literacyRate, 'literacyRate', literacyRatePerGDP);
//            literacyRate = literacyRateResult[0];
            literacyRatePerGDP = literacyRateResult[1];
            for (var i = 0, j = 0.53; i <= (40.9 - 0.53) / .1; i++) {
                literacyRate[i] = {};
                literacyRate[i].x = j;
                literacyRate[i].y = 6.9158 * Math.log(j) + 71.953;
                j += .1;
            }

//            draw Gini
            drawAxises([0, 70], [25, 50], [0, 50], 'Gini', '（%）', [25, 30, 35, 40, 45, 50], [0, 10, 20, 30, 40, 50], [0, 10, 20, 30, 40, 50, 60, 70]);
            drawLines([0, 70], yr, [0, 50], GiniPerGDP, 'Gini');
            drawLines([0, 70], yl, [25, 50], Gini, 'Gini', '#64a9bd');

//            draw Engel
            drawAxises([0, d3.max(EngelPerGDP, function (d) {
                return d.x
            })], [0, 80], [0, 25], 'Engel', '（%）', [0, 10, 20, 30, 40, 50, 60, 70, 80], [0, 5, 10, 15, 20, 25], [0, 5, 10, 15, 20, 25, 30]);
            drawLines([0, d3.max(EngelPerGDP, function (d) {
                return d.x
            })], yr, [0, 25], EngelPerGDP, 'Engel');
            drawLines([0, d3.max(EngelPerGDP, function (d) {
                return d.x
            })], yl, [0, 80], cityEngel, 'Engel', '#64a9bd');
            drawLines([0, d3.max(EngelPerGDP, function (d) {
                return d.x
            })], yl, [0, 80], countryEngel, 'Engel', '#f8b551');

//            draw lifeLength
            drawAxises([0, 70], [40, 80], [0, 50], 'lifeLength', '（年）', [40, 45, 50, 55, 60, 65, 70, 75, 80], [0, 10, 20, 30, 40, 50], [0, 10, 20, 30, 40, 50, 60, 70]);
            drawLines([0, 70], yr, [0, 50], lifeLengthPerGDP, 'lifeLength');
            drawLines([0, 70], yl, [40, 80], lifeLength, 'lifeLength', '#64a9bd');

//            draw literacyRate
            drawAxises([0, 70], [60, 100], [0, 50], 'literacyRate', '（%）', [60, 65, 70, 75, 80, 85, 90, 95, 100], [0, 10, 20, 30, 40, 50], [0, 10, 20, 30, 40, 50, 60, 70]);
            drawLines([0, 70], yr, [0, 50], literacyRatePerGDP, 'literacyRate');
            drawLines([0, 70], yl, [60, 100], literacyRate, 'literacyRate', '#64a9bd');

            graphArea2.selectAll('.line').style('display', 'none');
            graphArea2.selectAll('.axis').style('display', 'none');
            graphArea2.selectAll('.line.Gini').style('display', 'block');
            graphArea2.selectAll('.axis.Gini').style('display', 'block');


//            添加标注
            var Gini_points = [
                {'x': 0.72, 'y': 27.69, 'text': '1984年'},
                {'x': 58.8, 'y': 47.3, 'text': '2013年'}
            ];
            var Engel_points = [
                {'x': 0.6, 'y': 59.4, 'text': '1983年'}
            ];
            var lifeLength_points = [
                {'x': 0.15, 'y': 43.46580488, 'text': '43.47'},
                {'x': 58.8, 'y': 75.35302439, 'text': '75.35'}
            ]
            var literacyRate_points = [
                {'x': 40.89, 'y': (6.9158 * Math.log(40.89) + 71.953), 'text': '2010年，95.1%'}
            ];

            addLabel(graphArea2, Gini_points, x, yl, [0, 70], [25, 50], 'Gini');
            addLabel(graphArea2, Engel_points, x, yl, [0, 30], [0, 80], 'Engel');
            addLabel(graphArea2, literacyRate_points, x, yl, [0, 70], [60, 100], 'literacyRate');
            addLabel(graphArea2, lifeLength_points, x, yl, [0, 70], [40, 80], 'lifeLength');

            d3.select('.Gini.label0 text').attr('dx', '5px')
                .attr('dy', '-10px');
            d3.select('.Gini.label1 text').attr('dx', 0)
                .attr('dy', '-1em')
                .attr('text-anchor', 'middle');
            d3.select('.Engel.label text')
                .attr('dy', '-.5em');
            d3.select('.lifeLength.label text').attr('dy', '-1em');
            d3.select('.literacyRate.label text').attr('dx', 0)
                .attr('dy', '-1em')
                .attr('text-anchor', 'middle');

            graphArea2.selectAll('.label').style('display', 'none');
            graphArea2.selectAll('.label.Gini').style('display', 'block');
        })


        var graph_img_text = {
            'GDP': {
                'graphTitle': 'img/gdpTitle.png',
                'graphComment': '注：GDP指国内生产总值',
                'graphCome': '数据来源：国家统计局'
            },
            'foreignTrade': {
                'graphTitle': 'img/foreignTradeTitle.png',
                'graphComment': '注：外贸依存度取自进出口总额与国民生产总值之比，是开放度的评估与衡量指标',
                'graphCome': '数据来源：世界银行，经济合作与发展组织，国家统计局'
            },
            'railway': {
                'graphTitle': 'img/railwayTitle.png',
                'graphComment': '注：可用于提供铁路服务的铁路总长度，是衡量铁路交通发达程度的重要指标之一',
                'graphCome': '数据来源：运输、水、信息和通讯技术部，交通部，国家统计局，世界银行'
            },
            'CO2': {
                'graphTitle': 'img/co2Title.png',
                'graphComment': '注：该指标取自化石燃料燃烧和水泥生产所释放的二氧化碳量，是反映空气污染程度的重要指标之一',
                'graphCome': '数据来源：美国田纳西州橡树岭国家实验室环境科学部二氧化碳信息分析中心，国家统计局'
            },
            'Gini': {
                'graphTitle': 'img/giniTitle.png',
                'graphLegend': 'img/giniLegend.png',
                'graphComment': '注：基尼系数是判断收入分配公平程度的指标，基尼指数越高说明贫富差距越大',
                'graphCome': '数据来源：世界银行，各国政府统计机构,国家统计局'
            },
            'Engel': {
                'graphTitle': 'img/engelTitle.png',
                'graphLegend': 'img/engelLegend.png',
                'graphComment': '注：恩格尔系数是食品支出总额占个人消费总额的比重，恩格尔系数越高说明家庭生活水平越低',
                'graphCome': '数据来源：Wind资讯，国家统计局  '
            },
            'lifeLength': {
                'graphTitle': 'img/lifeLengthTitle.png',
                'graphLegend': 'img/lifeLengthLegend.png',
                'graphComment': '注：预期寿命是指假定出生时的死亡率保持恒定，一名新生儿可能生存的年数',
                'graphCome': '数据来源：国家统计局，世界银行，联合国人口司'
            },
            'literacyRate': {
                'graphTitle': 'img/literacyRateTitle.png',
                'graphLegend': 'img/literacyRateLegend.png',
                'graphComment': '注：识字率是一个国家当中，十五岁以上的合法“劳动人口”中能读写文字的人的比率，是衡量国民文化水平的重要指标之一',
                'graphCome': '数据来源：联合国教科文组织 (UNESCO) 统计研究所，国家统计局'
            },
        }

        //    事件操作
        svg.selectAll('.filter').on('click', function () {
            var that = d3.select(this);
            filterHandle(that, svg, graphArea, 'graphPage1');
        });
        svg2.selectAll('.filter').on('click', function () {
            var that = d3.select(this);
            filterHandle(that, svg2, graphArea2, 'graphPage2');

            var name = that.attr('data-name');
            $('#graphPage2 .graphLegend').css('visibility','hidden');
            if (name == 'Engel') {
                $('#graphPage2 .graphLegend.Engel').css('visibility','visible');
            } else {
                $('#graphPage2 .graphLegend.'+name).css('visibility','visible');
            }
        });

        function filterHandle(that, svg, graphArea, graphPageID) {
            if (that.select('.rect').classed('active')) return;

            svg.selectAll('.filter').select('.active')
                .style({
                    'transform': 'translateX(' + 0 + 'px)',
                    '-webkit-transform': 'translateX(' + 0 + 'px)'
                })
                .classed({'active': false});
            that.select('.rect')
                .style({
                    'transform': 'translateX(' + (-w * .02) + 'px)',
                    '-webkit-transform': 'translateX(' + (-w * .02) + 'px)'
                })
                .classed({'active': true});

            var name = that.attr('data-name');

            graphArea.selectAll('.axis.y2').style('display', 'none');
            graphArea.selectAll('.axis.yl').style('display', 'none');
            graphArea.selectAll('.axis.yr').style('display', 'none');
            graphArea.selectAll('.line').style('display', 'none');
            graphArea.selectAll('.label').style('display', 'none');
            graphArea.selectAll('.axis.y2.' + name).style('display', 'block');
            graphArea.selectAll('.axis.yl.' + name).style('display', 'block');
            graphArea.selectAll('.axis.yr.' + name).style('display', 'block');
            graphArea.selectAll('.line.' + name).style('display', 'block');
            graphArea.selectAll('.label.' + name).style('display', 'block')

            $('#' + graphPageID + ' .graphTitle').attr('src', graph_img_text[name].graphTitle);
            $('#' + graphPageID + ' .graphComment').text(graph_img_text[name].graphComment);
            $('#' + graphPageID + ' .graphCome').text(graph_img_text[name].graphCome);
        }

    })
}
    /*********************  wfh/end **************************/

//    fastclick
    $(function() {
        FastClick.attach(document.body);
    });
        var moveY,startY,endY,mp3State= 0;
        var audio = document.getElementById('audio1');
        $('.storyText').scrollLeft(2000);
    $(document).ready(function () {
        //swiper configs
//        drawSVG();
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: false,
            mousewheelControl: true,
            watchSlidesProgress:true,
            onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
                swiperAnimateCache(swiper); //隐藏动画元素
                swiperAnimate(swiper); //初始化完成开始动画
            },
            onSlideChangeStart:function(swiper){
                judgeAudioId();//判断音频id
                if(mySwiper.slides[2].progress == 0){
                    drawD3Graph();
                }
                if(mySwiper.slides[1].progress != 0){
                    videoPause();
                }
            
            },
            onSlideChangeEnd: function (swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            },
            //lsx@防止onSlideChangeEnd不灵敏，使用onSlideMove
            onSliderMove: function (swiper) {
                audio.pause();
                mp3State = 0;
                $('.wifi').css('background-image', 'url("img/wifi.png")').css('background-size', '100% 100%');
//                judgeAudioId();//判断音频id
            }
        });

         //______________________pie@start______________________
        // game page

        $("#countryside").click(function () {
            $(this).attr("src", "./img/countryside_clicked.png").addClass("clicked");
            $("#city").attr("src", "./img/city.png").removeClass();
            changResult();
        });
        $("#city").click(function () {
            $(this).attr("src", "./img/city_clicked.png").addClass("clicked");
            $("#countryside").attr("src", "./img/countryside.png").removeClass();
            changResult();
        });
        $("#show_detail").click(function () {
            $("#cover_layer").css("display", "block");
        });
        $("#cover_layer").click(function () {
            $("#cover_layer").css("display", "none");
        });
        var gold_num_obj = [
            {year: 1985, countryside: 9, city: 16},
            {year: 1986, countryside: 7, city: 14},
            {year: 1987, countryside: 5, city: 11},
            {year: 1988, countryside: 7, city: 15},
            {year: 1989, countryside: 8, city: 18},
            {year: 1990, countryside: 7, city: 16},
            {year: 1991, countryside: 7, city: 18},
            {year: 1992, countryside: 8, city: 21},
            {year: 1993, countryside: 9, city: 25},
            {year: 1994, countryside: 7, city: 21},
            {year: 1995, countryside: 10, city: 27},
            {year: 1996, countryside: 12, city: 30},
            {year: 1997, countryside: 15, city: 38},
            {year: 1998, countryside: 18, city: 45},
            {year: 1999, countryside: 19, city: 51},
            {year: 2000, countryside: 20, city: 54},
            {year: 2001, countryside: 21, city: 60},
            {year: 2002, countryside: 19, city: 60},
            {year: 2003, countryside: 17, city: 56},
            {year: 2004, countryside: 17, city: 56},
            {year: 2005, countryside: 18, city: 58},
            {year: 2006, countryside: 15, city: 49},
            {year: 2007, countryside: 16, city: 52},
            {year: 2008, countryside: 16, city: 52},
            {year: 2009, countryside: 16, city: 52},
            {year: 2010, countryside: 14, city: 46},
            {year: 2011, countryside: 14, city: 43},
            {year: 2012, countryside: 15, city: 47},
            {year: 2013, countryside: 24, city: 72},
            {year: 2014, countryside: 25, city: 76},
            {year: 2015, countryside: 30, city: 86}
        ];
        var back_obj = $('#back');
        var next_obj = $('#next');
        next_obj.click(function () {
//            $("#ulOptions").animate({top: '-=140px'});
            if(getTop()>-700){
                // console.log(getTop());
                next_obj.removeClass("button_disable").addClass("button_able");
                back_obj.removeClass("button_disable").addClass("button_able");
                $("#ulOptions").animate({top: '-=140px'},"fast");

            }
            if(getTop()==-700){
                next_obj.removeClass("button_able").addClass("button_disable");
                back_obj.removeClass("button_disable").addClass("button_able");
                $("#ulOptions").animate({top: '-=140px'},"fast");
            }
        });

        back_obj.click(function () {
//            $("#ulOptions").animate({top: '+=140px'});
            if(getTop()<-140){
                next_obj.removeClass("button_disable").addClass("button_able");
                back_obj.removeClass("button_disable").addClass("button_able");
                $("#ulOptions").animate({top: '+=140px'},"fast");
            }
            if(getTop()==-140){
                next_obj.removeClass("button_disable").addClass("button_able");
                back_obj.removeClass("button_able").addClass("button_disable");
                $("#ulOptions").animate({top: '+=140px'},"fast");
            }
        });

//        $("li").get(0).addEventListener("click");
        var optionText = "";
        $(".unselected").click(function () {
            $(".selected").removeClass("selected").addClass("unselected");
            $(this).removeClass("unselected").addClass("selected");
            $("#year").text($(this).text());
            $("#selectOptions").css("display", "none");
            mySwiper.unlockSwipes();//选择框关闭后允许滑动页面

            $("#cover_select").css("display", "none");
            changResult();
        });
        $("#selectBar").click(function () {
            $("#cover_select").css("display", "block");
            $("#selectOptions").css("display", "block");

            mySwiper.lockSwipes();//选择框出来后禁止滑动页面
        });
        function getTop(){
            var top = $("#ulOptions").css("top");
            top = parseInt(top);
            return top;
        }
        function changResult() {
            var year = $("#year").text();
            var clicked_area = $(".clicked").attr("id");
            if(clicked_area == null) return;

            var row = gold_num_obj[year - 1985];
            var gold_num = 0;
            if (clicked_area == "city") {
                gold_num = row.city;
            } else {
                gold_num = row.countryside;
            }
            if (gold_num < 10) {
                gold_num = "&nbsp;" + gold_num + "&nbsp;";
            }
            $("#display_year").text(year);
            $("#number").html(gold_num);
        }

        //    video page
        var window_width = $(window).width();
        var window_height = $(window).height();
        window_height += "px";
        window_width += "px";
        $(".rotate_container").css({
            "width":window_height,
            "height":window_width,
            "left":window_width
        });

        $("#video_cover").click(function(){
            $(this).fadeOut("fast");
            $('#video').show();
            $('#video').attr('src','http://v.qq.com/iframe/player.html?vid=r0188udi0je&amp;auto=1')
            // $("#video").trigger("play");
        });
        //视频点击播放和暂停
        // $("#video").addClass('pause');//for check pause or play add a class
        // $('#video').click(function() {
        //     if ($(this).hasClass('pause')) {
        //         $("video").trigger("play");
        //         $(this).removeClass('pause');
        //         $(this).addClass('play');
        //     } else {
        //         // $("video").trigger("pause");
        //         // $(this).removeClass('play');
        //         // $(this).addClass('pause');
        //         videoPause();
        //     }
        // });
        function videoPause(){
            $('#video').attr('src','http://v.qq.com/iframe/player.html?vid=r0188udi0je&amp;auto=0')
        }
        //______________________pie@end______________________

        //______________________lsx@start______________________
        // 修改处！此部分后期相应页面需要改，修改mySwiper.slide[?]，音频只能这样控制,用不了jquery
        function judgeAudioId(){
            //storyNav
            if(mySwiper.slides[5].progress==0){
//                mySwiper.lockSwipeToNext();
            }
            //story1
            if(mySwiper.slides[6].progress==0){
                audio = document.getElementById('audio1');
//                mySwiper.lockSwipeToPrev();
//                mySwiper.unlockSwipeToNext();
            }
            //story2
            else if(mySwiper.slides[7].progress==0){
                audio = document.getElementById('audio2');
//                mySwiper.unlockSwipeToPrev();
            }
            //story3
            else if(mySwiper.slides[8].progress==0){
                audio = document.getElementById('audio3');
            }
            //story4
            else if(mySwiper.slides[9].progress==0){
                audio = document.getElementById('audio4');
            }
            //story5
            else if(mySwiper.slides[10].progress==0){
                audio = document.getElementById('audio5');
            }
            //story6
            else if(mySwiper.slides[11].progress==0){
                audio = document.getElementById('audio6');
            }
            //story7
            else if(mySwiper.slides[12].progress==0){
                audio = document.getElementById('audio7');
            }
            //story8
            else if(mySwiper.slides[13].progress==0){
                audio = document.getElementById('audio8');
            }
            //story9
            else if(mySwiper.slides[14].progress==0){
                audio = document.getElementById('audio9');
            }
            //story10
            else if(mySwiper.slides[15].progress==0){
                audio = document.getElementById('audio10');
            }
            //story11
            else if(mySwiper.slides[16].progress==0){
                audio = document.getElementById('audio11');
//                mySwiper.unlockSwipeToNext();
            }
            //story12
            else if(mySwiper.slides[17].progress==0){
                audio = document.getElementById('audio12');
//                mySwiper.lockSwipeToNext();
            }


        }

        //lsx@storyText
        //1、音乐播放模块
        $('.voice').click(function(){
            wifi = $(this).children('.wifi');
            //此处，后期整合时，需要根据swiper所在页，获取audio的id编号。
            if(mp3State==0){
                wifi.css('background-image','url("img/wifi.gif")');
                wifi.css('background-size','50% 120%');
                mp3State=1;
                audio.play()
            }else{
                wifi.css('background-image','url("img/wifi.png")');
                wifi.css('background-size','100% 100%');
                mp3State=0;
                audio.pause();
            }
        });
        setInterval(function(){
            if(audio.ended){
                wifi.css('background-image','url("img/wifi.png")');
                wifi.css('background-size','100% 100%');
                mp3State=0;
                audio.pause();
            }
        },2500);
        //2、图片展示模块
        $('.clickImg').click(function(){
            mySwiper.lockSwipes();
            whole = $(this).parent().parent();
            $(this).css('display','none');
            whole.children('.showPic').css('display','block');
            whole.children('.showPic').children('.storyShowDataPic').css('opacity','1');
        });
        $('.storyImg').click(function(){
            mySwiper.lockSwipes();
            whole = $(this).parent();
            $(this).parent('.clickImg').css('display','none');
            $(this).parent().children('.showPic').css('display','block');
        });
        $('.showPic').click(function(){
            mySwiper.unlockSwipes();
            whole = $(this).parent().parent();
            $(this).css('opacity','1');
            $(this).parent().toggle();
        });

        //3、story目录页
        //修改处！mySwiper.slideTo(页码,速度,callback); 页码数根据最终整体排第几页需要做修改！！
        $('.storyBack').click(function(){
            audio.pause();
            mySwiper.slideTo(5,10,false)
        });
        $('.cata1').click(function(){
            audio = document.getElementById('audio1');
            mySwiper.slideTo(6,10,false);
            mySwiper.unlockSwipeToNext();
        });
        $('.cata2').click(function(){
            audio = document.getElementById('audio2');
            mySwiper.slideTo(7,10,false)
        });
        $('.cata3').click(function(){
            audio = document.getElementById('audio3');
            mySwiper.slideTo(8,10,false)
        });
        $('.cata4').click(function(){
            audio = document.getElementById('audio4');
            mySwiper.slideTo(9,10,false)
        });
        $('.cata5').click(function(){
            audio = document.getElementById('audio5');
            mySwiper.slideTo(10,10,false)
        });
        $('.cata6').click(function(){
            audio = document.getElementById('audio6');
            mySwiper.slideTo(11,10,false)
        });
        $('.cata7').click(function(){
            audio = document.getElementById('audio7');
            mySwiper.slideTo(12,10,false)
        });
        $('.cata8').click(function(){
            audio = document.getElementById('audio8');
            mySwiper.slideTo(13,10,false)
        });
        $('.cata9').click(function(){
            audio = document.getElementById('audio9');
            mySwiper.slideTo(14,10,false)
        });
        $('.cata10').click(function(){
            audio = document.getElementById('audio10');
            mySwiper.slideTo(15,10,false)
        });
        $('.cata11').click(function(){
            audio = document.getElementById('audio11');
            mySwiper.slideTo(16,10,false)
        });
        $('.cata12').click(function(){
            audio = document.getElementById('audio12');
            mySwiper.slideTo(17,10,false)
        });
        //______________________lsx@end______________________

        //____________________semine lee @start______________________
        var cnt = 0;
        $(".nav").click(function(){
            if( cnt == 0){
                $(".menu").animate({
                    top: '0'
                })
                cnt = 1;
            } else if( cnt == 1){
                hideMenu();
            }
        })
        $(".bg_img").css("height",$(window).height());


        function hideMenu(){
            $(".menu").animate({
                top: '-25%'
            });
            cnt = 0;
        }
        $(".link_video").click(function(){
            hideMenu();
            audio.pause();
            mySwiper.slideTo(1, 10, false);
        })
        $(".link_data").click(function(){
            hideMenu();
            audio.pause();
            mySwiper.slideTo(2, 10, false);
            
            if(mySwiper.slides[2].progress == 0){
               drawD3Graph();
            };
            videoPause();
        })
        $(".link_story").click(function(){
            hideMenu();
            audio.pause();
            mySwiper.slideTo(5, 10, false);
            videoPause();
        })

        //____________________semine lee @end______________________

    });