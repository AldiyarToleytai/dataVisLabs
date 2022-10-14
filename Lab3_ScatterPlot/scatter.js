async function drawBar(btnId, data, clear) {

    if (clear){
        var x1 = [[]]
        var x2 = [[]]
    }
    else {
        var x1 = genData(40);
        var x2 = genData(40);
    }

    const dataset = await d3.json("my_weather_data.json")
    const xAccessor = d => d[data];
    const yAccessor = d => d.length;
    console.log(yAccessor(data))
    const width = 1200
    let dimensions = {
        width: width,
        height: width * 0.6,
        margin: {
            top: 10,
            right: 30,
            bottom: 20,
            left: 30,
        },
    }
    dimensions.boundedWidth = dimensions.width- dimensions.margin.left-dimensions.margin.right
    dimensions.boundedHeight = dimensions.height- dimensions.margin.top- dimensions.margin.bottom


    const wrapper = d3.select("#wrapper")
        .html("") 
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("translate",`translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

    const xScaler = d3.scaleLinear()
        .domain([0,100])
        .range([0,dimensions.boundedWidth])
        .nice()

    const yScaler = d3.scaleLinear()
        .domain([0, 95])
        .range([dimensions.boundedHeight,0])

    const xAxisGen = d3.axisBottom()
        .scale(xScaler);
    const xAxis = bounds.append("g")
        .call(xAxisGen)
        .attr("transform", `translate(${30},${dimensions.boundedHeight} )`);

    const yAxisGen = d3.axisLeft()
        .scale(yScaler);
    const yAxis = bounds.append("g")
        .call(yAxisGen)
        .attr("transform", `translate(${30}, 0)`);

    const xLabel = bounds.append("text")
        .attr("x",dimensions.boundedWidth - 30)
        .attr("y",dimensions.boundedHeight + 30)
        .text("X")
        .attr("fill","black")
        .attr("font-size","20px")
        .attr("text-anchor","middle");

    const yLabel = bounds.append("text")
        .attr("x",7)
        .attr("y",20)
        .text("Y")
        .attr("fill","black")
        .attr("font-size","20px")
        .attr("text-anchor","middle");

    const red = bounds.append("text")
        .attr("x",1100)
        .attr("y",40)
        .text("▮ - X2")
        .attr("fill","green")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const green = bounds.append("text")
        .attr("x",1100)
        .attr("y",20)
        .text("• - X1")
        .attr("fill","red")
        .attr("font-size","15px")
        .attr("text-anchor","middle");


    const scatterX1 = bounds.append('g')
        .selectAll("dot")
        .data(x1)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScaler(d[0]); } )
        .attr("cy", function (d) { return yScaler(d[1]) + 30; } )
        .attr("r", 4)
        .attr("transform", "translate(" + 100 + "," + -30 + ")")
        .style("fill", "red");

    const scatterX2 = bounds.append('g')
        .selectAll("dot")
        .data(x2)
        .enter()
        .append("rect")
        .attr("x", function (d) { return xScaler(d[0]); } )
        .attr("y", function (d) { return yScaler(d[1]) + 30; } )
        .attr("width",7)
        .attr("height", 7)
        .attr("transform", "translate(" + 100 + "," + -30 + ")")
        .style("fill", "green");

    changeData(id);
}

function genData(N){
    var data = []; 
    for(var i = 0; i<N; i++){
              data.push([Math.random()*80,Math.random()*80])
            }
    return data;
}

function changeData(id){
    if(id == null){
        return 0;
    }
    const btnAct = document.getElementsByClassName("active");
    btnAct[0].classList.remove("active");
    const clickedButton = document.getElementById(id)
    clickedButton.classList.add("active");
}


drawBar(null, "value");