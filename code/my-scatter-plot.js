function renderScatterPlot(data){

  data.forEach(function(d) {
    d.YEAR = getYearFromDate(d.WEEKID)
  });

  ////////////////////////////////////////////////////////////////
  // Code for scatterplot begins here
  ////////////////////////////////////////////////////////////////
  var xScale = d3.scaleLinear().domain([1960, 2017]).range([10, 510]);
  var yScale = d3.scaleLinear().domain([6, 30]).range([510, 10]);
  var fillScale = d3.scaleLinear().domain([6, 30]).range(["#2196f3", "#f44336"])

  xAxis = d3.axisBottom().scale(xScale);
  yAxis = d3.axisRight().scale(yScale).tickSize(520);

  d3.select("svg.main-chart").append("g").attr("id", "xAxisG").call(xAxis);
  d3.select("svg.main-chart").append("g").attr("id", "yAxisG").call(yAxis);

  d3.select("svg.main-chart")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "data-point")
    .attr("r", 8)
    .attr("cx", (d, i) => xScale(d.YEAR))
    .attr("cy", (d) => yScale(d.GAP))
    .style("fill", (d) => fillScale(d.GAP));

  d3.select("#xAxisG")
    .attr("transform", "translate(0,520)");

  d3.select("#xAxisG")
    .append("text")
    .text("Year of return to top-5 ")
    // .style("stroke","black")
    .style("fill", "maroon")
    .style("font-size", "17")
    .attr("transform", "translate(230,40)");

  d3.select("#yAxisG")
    .append("text")
    .text("No. of years between return")
    // .style("stroke","black")
    .style("fill", "maroon")
    .style("font-size", "17")
    .attr("transform", "translate(545,200)rotate(90)")

  ;


  d3.select("div.pageContent")
    .append("div")
    .attr("class", "tooltipScatterPlot")
    .style("opacity", 0);

  d3.selectAll(".data-point")
    .on("mouseover", function(d, i) {
      d3.selectAll("div.tooltipScatterPlot")
        .style("opacity", 1)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
        .html(buildToolTipText(d))
        .transition()
        .duration(500);
    })
    .on("mouseout", () => {

      d3.select("div.tooltipScatterPlot")
        .transition()
        .duration(500)
        .style("opacity", 0)
    });

  var maxGAP = 0;
  maxGAP = d3.max(data, function(d) {
    return +d.GAP;
  });

  d3.select("svg.main-chart")
    .selectAll("text.max")
    .data(data)
    .enter()
    .filter(function(d) {
      return d.GAP == maxGAP
    })
    .append("text")
    .attr("class", "max")
    .attr("x", (d) => xScale(d.YEAR) - 200)
    .attr("y", (d) => yScale(d.GAP) + 5)
    .text(function(d) {
      return "Record Breaker ==>";
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "#3D9970");
  // .style("font-size","2em")
  ;

}