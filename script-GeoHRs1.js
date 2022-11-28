d3.json("homerunposition.json").then(
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

    console.log(dataset)

    var xAccessor = d => d.Position
    var yAccessor = d => d.Dist

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
      .enter()
      .append("circle")

      .on("mouseover", function () {
        d3.select(this)
          .attr("stroke-width", "2")
          .attr("stroke", "red")
        

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
          .attr("fill", "red")
          
      })

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
