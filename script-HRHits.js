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

        innerRadius = 80
        outerRadius = Math.min(dimensions.width, dimensions.height)/2

        var svg = d3.select("#Home_Run_Hits")
                .style("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
                .style("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
                .append("g")
                    .attr("transform", "translate(" + dimensions.width + "," + dimensions.height + ")")

        var image = svg.append("image")
            .attr('xlink:href', 'Baseball_background.png')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height)

        image.attr("transform", 'rotate(90)')

        var x = d3.scaleBand()
            .range([0, 2 * Math.PI])
            .align(0)
            .domain(data.map(function(d){return d.year}))

        var y = d3.scaleRadial()
            .range([innerRadius,outerRadius])
            .domain([0,data.b_home_run]) 

        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("fill", "red")
                .attr("d", d3.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(function(d) {return x(d.b_home_run) }))
                        /*.startAngle(function(d){return x(d.year)}))
                        .endAngle(function(d){return x(d.year)+ x.bandwidth()})
                        //.padAngle(0.01)
                        //.padRadius(innerRadius))*/
    }
)