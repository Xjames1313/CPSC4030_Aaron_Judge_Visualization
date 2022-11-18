d3.csv("Data.csv").then(
    function(data){

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


        innerRadius = dimensions.width/6.5
        outerRadius = Math.min(dimensions.width, dimensions.height)

        dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

        var svg = d3.select("#Home_Run_Hits")
                .style("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
                .style("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
        
        var tooltip = d3.select("body")
              .append("div")
              .attr("id", "mytooltip")
              .style("position", "absolute")
              .style("width", "60px")
              .style("heigth", "28px")
              .style("visibility", "hidden")        

        var image = svg.append("image")
            .attr('href', 'Baseball_background.png')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height)

        image.attr("transform", 'translate(0,' + (dimensions.margin.top + 10) + ")")

        var color = d3.scaleOrdinal()
        .domain([0,7])
        .range(['#E8002F','grey','#001C43','black','#00338E', '#007934']);

        
        var x = d3.scaleBand()
            .range([0, 2 * Math.PI])
            .align(0)
            .domain(data.map(function(d){return d.year}))

        var y = d3.scaleRadial()
            .range([innerRadius,outerRadius])
            .domain([0,70]) 

        /*
        //X Axis
        svg.append("g")
              .attr("transform", "translate("+ (dimensions.margin.left + dimensions.margin.right) + "," + (dimensions.boundedHeight+dimensions.margin.bottom) + ")")
              .call(d3.axisBottom(x));
             
        //Y Axis
        svg.append("g")
              .attr("transform","translate("+(dimensions.margin.left + dimensions.margin.right)+","+ dimensions.margin.top +")")
              .call(d3.axisLeft(y));
        */

        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("fill", function(d){console.log(d.group); return color(d.year)})
                .attr("d", d3.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(function(d) {return y(d.b_home_run) })
                        .startAngle(function(d){return x(d.year)})
                        .endAngle(function(d){return x(d.year)+ x.bandwidth()})
                        .padAngle(0.01)
                        .padRadius(innerRadius))
            .attr("transform", "translate("+ (dimensions.width/2) + "," + (dimensions.height/2 + dimensions.margin.top + 10) + ")")
            .on("mouseover", function(d, i){
                d3.select(this).transition()
                    .style("opacity", .8)

                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9)
                
                tooltip.html("Home Runs: " + i.b_home_run + "<br/>Year: " + i.year + "<br/>")
                    .style("visibility", "visible")//set style to it
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
            })
            .on("mouseout", function(){
                d3.select(this).transition()
                    .style("opacity", 1)

                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0)

            });
    }
)