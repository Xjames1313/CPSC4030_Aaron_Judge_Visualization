d3.json("homerunpostions.json").then(
  function (dataset) {

    var dimensions = {
      width: 1000,
      height: 600,
      margin: {
        top: 10,
        bottom: 50,
        right: 10,
        left: 50
      }
    }

    var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

    console.log(dataset)

    var xAccessor = d => d.Position
    var yAccessor = d => d.Dist
    var zAccessor = d => d.Year
    /*var alldata = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"]
    
    var dataready = alldata.map(function (Year) {
      return {
        Year: Year,
        values: data.map(function (d) {
          return { Position: d.Position, value: +d[Year] };
        })
      };
    });

    var dotcolor = d3.scaleOrdinal()
      .domain(alldata)
      .range(d3.dataset);
      
      var line = svg.append('line')
      .style("stroke", "lightgreen")
      .style("stroke-width", 10)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 400)
      .attr("y2", 400);    
    */

    var svg = d3.select("#GeoHRs")
      .style("width", dimensions.width)
      .style("height", dimensions.height)


    var xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, xAccessor))
      .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

    var yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, yAccessor))
      .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
    
    

    var dots = svg.append("g")
      .selectAll("circle")
      .data(dataset)
      .enter().append("circle")
      .style("fill", function (d) {
        if (d.Year == 2016) { return "red" }
        if (d.Year == 2017) { return "green" }
        if (d.Year == 2018) { return "magenta" }
        if (d.Year == 2019) { return "tan" }
        if (d.Year == 2020) { return "orange" }
        if (d.Year == 2021) { return "blue" }
        if (d.Year == 2022) { return "black" }
        else { return "red" };
      })
      .on('mouseover', function (d,i) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("Distance: " + i.Dist + "<br/>")
          .style("left", (d.pageX) + "px")
          .style("top", (d.pageY - 28) + "px");
      })
      .on("mouseout", function(){
        
        div.transition()
            .duration(500)
            .style("opacity", 0);
       })
      .attr("cx", 300)
      .attr("cy", 552)
      .attr("r", 3)
      .attr("fill", "white")
      

    d3.select("#start")
      .on("click", function () {
        dots
          .transition().duration(1000)
          .attr("cx", d => xScale(xAccessor(d)))
          .attr("cy", d => yScale(yAccessor(d)))
          .attr("r", 3)
      })
   
    d3.select("#reset")
      .on("click", function () {
        dots
          .transition().duration(1000)
          .attr("cx", 300)
          .attr("cy", 552)
          .attr("r", 3)
          .style("fill", function (d) {
            if (d.Year == 2016) { return "red" }
            if (d.Year == 2017) { return "green" }
            if (d.Year == 2018) { return "magenta" }
            if (d.Year == 2019) { return "tan" }
            if (d.Year == 2020) { return "orange" }
            if (d.Year == 2021) { return "blue" }
            if (d.Year == 2022) { return "black" }
            else { return "red" };
          })
      }) 
    
    d3.select("#seventh")
      .on("click", function () {
        dots
       
          .style("fill", function (d) {
            if (d.Year == 2022 || d.Year == 2017) { return "black" }
            else { return "white" };
          })
          .transition().duration(500)
          .attr("cx", d => xScale(xAccessor(d)))
          .attr("cy", d => yScale(yAccessor(d)))
          .attr("r", 3)
      })
      d3.select("#sixth")
      .on("click", function () {
        dots
        .transition().duration(500)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 3)
          .style("fill", function (d) {
            if (d.Year == 2021) { return "blue" }
            else { return "white" };
          })
      })
      d3.select("#fifth")
      .on("click", function () {
        dots
        .transition().duration(500)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 3)
          .style("fill", function (d) {
            if (d.Year == 2020) { return "orange" }
            else { return "white" };
          })
      })
      d3.select("#fourth")
      .on("click", function () {
        dots
        .transition().duration(500)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 3)
          .style("fill", function (d) {
            if (d.Year == 2019) { return "tan" }
            else { return "white" };
          })
      })
      d3.select("#third")
      .on("click", function () {
        dots
        .transition().duration(500)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 3)
          .style("fill", function (d) {
            if (d.Year == 2018) { return "magenta" }
            else { return "white" };
          })
      })
      d3.select("#second")
      .on("click", function () {
        dots
        .transition().duration(500)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 3)
          .style("fill", function (d) {
            if (d.Year == 2017) { return "green" }
            else { return "white" };
          })
      })
      d3.select("#first")
      .on("click", function () {
        dots
        .transition().duration(500)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 3)
          .style("fill", function (d) {
            if (d.Year == 2016) { return "red" }
            else { return "white" };
          })
      })
      
     
   /*
      svg
      // First we need to enter in a group
      .selectAll("dots")
      .data(dataready)
      .enter()
        .append('g')
        .style("fill", function(d){ return dotcolor(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.Dist) } )
        .attr("cy", function(d) { return y(d.Position) } )
        .attr("r", 5)
        .attr("stroke", "Grey")
        */

    var xAxisGen = d3.axisBottom().scale(xScale)
    var xAxis = svg.append("g")
      .call(xAxisGen)
      .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

    var yAxisGen = d3.axisLeft().scale(yScale)
    var yAxis = svg.append("g")
      .call(yAxisGen)
      .style("transform", `translateX(${dimensions.margin.left}px)`)

  }
)     
