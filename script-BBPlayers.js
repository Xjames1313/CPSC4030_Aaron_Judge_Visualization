d3.csv("DataHits.csv").then(
    function(data){

        console.log(data)

        var size = d3.min([window.innerWidth*0.9, window.innerHeight*0.9])

        var dimensions = {
            margin:{
                top: 20,
                bottom: 30,
                right: 20,
                left: 40
            },
            width: size,
            height: size/3 
        }

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var svg = d3.select("#HR_to_StkOuts")
                    .style("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
                    .style("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)

        dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
                
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.player;})
            .entries(data);

        
        var xScale = d3.scaleBand()
                        .domain(data.map(function(d){return d.year;}))
                        .range([0,dimensions.boundedWidth]).padding(0.2)

        var yScale = d3.scaleLinear()
                        .domain([0, d3.max(data.map(function(d){return d.hits}), s => +s)])
                        .range([dimensions.boundedHeight,0]);
            
        

        //X Axis
        svg.append("g")
              .attr("transform", "translate("+ dimensions.margin.left + "," + (dimensions.boundedHeight+dimensions.margin.bottom) + ")")
              .call(d3.axisBottom(xScale));
             
        //Y Axis
        svg.append("g")
              .attr("transform","translate("+dimensions.margin.left+","+ dimensions.margin.top +")")
              .call(d3.axisLeft(yScale));

        var res = sumstat.map(function(d) {return d.key})
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c','#377eb8','#4daf4a'])


        //Strike out dots
        svg.append('g')
            .selectAll("dot")
            .data(sumstat)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(d.year); } )
            .attr("cy", function (d) { return yScale(d.hits); } )
            .attr("r", 5)
            .attr("transform", "translate("+ (dimensions.margin.left+ 45) +","+ dimensions.margin.top +")")
            .attr("fill", function(d){ return color(d.key)})
            .on("mouseover", function(d, i){
                d3.select(this).transition()
                    .attr("style", "fill: black;");

                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Hits: " + i.hits)
                    .style("left", (d.pageX) + "px")
                    .style("top", (d.pageY - 28) + "px");
                })
            .on("mouseout", function(){
                d3.select(this).transition()
                    .attr("style", "fill: #CC0000;");
                
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        //Strike Out line
        var line = d3.line()
              .x(function(d) { return xScale(d.year); }) 
              .y(function(d) { return yScale(d.hits); }) 
              .curve(d3.curveMonotoneX)
              
              svg.append("path")
              .datum(data) 
              .attr("class", "line") 
              .attr("transform", "translate("+ (dimensions.margin.left + 45) +","+ dimensions.margin.top +")")
              .attr("d", line)
              .style("fill", "none")
              .style("stroke", "#CC0000")
              .style("stroke-width", "2");

    }
)