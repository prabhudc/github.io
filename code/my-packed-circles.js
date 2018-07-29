function renderPackedCircles(data) {


  var colorScale = d3.scaleLinear().domain([0, 420]).range(d3.schemeCategory10);

  var nestedDataset = d3.nest()
    .key(d => d.PERFORMER)
    .entries(data);

  var packableSet = {
    id: "All performers",
    values: nestedDataset
  };

  var packChart = d3.pack();
  packChart.size([700, 700]);
  var root = d3.hierarchy(packableSet, (d, i) => d.values)
    .sum(d => {
      return d.RUN_COUNT;
    });

  d3.select("svg.main-chart")
    .append("g")
    // .attr("class","bubble")
    .attr("transform", "translate(100,20)")
    .selectAll("circle")
    .data(packChart(root).descendants())
    .enter()
    .append("g")
    .attr("class", "bubble")
    .append("circle")
    .attr("class", "bubble")
    .attr("id", (d, i) => "circle" + i)
    .attr("r", d => d.r)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .style("fill", d => {
      if (d.depth === 2) {
        return colorScale(d.data.RUN_COUNT);
      } else {
        return "#E4E5E6";
      }
    })
    .style("stroke", "gray")

  var bubble = d3.selectAll("g.bubble");

  bubble.append("text")
    .attr("id", "bubble-text")
    .attr("x", function(d, i) {
      return d.x;
    })
    .attr("y", function(d, i) {
      return d.y;
    })
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .text(d => {
      return +d.data.RUN_COUNT + 400
    });

  //toolTip for packed circles
  d3.select("div.pageContent")
    .append("div")
    .attr("class", "tooltipPackedCircles")
    .style("opacity", 0);


  d3.selectAll("circle.bubble")
    // .filter(function(d){return d.depth > 0;})
    .on("mouseover", function(d, i) {
      d3.selectAll("div.tooltipPackedCircles")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
        .html(buildToolTop5Artist(d))
        .style("opacity", 1);


    })
    .on("mouseout", () => {
      if (d3.event.toElement !== null &&
        d3.event.srcElement.id !== d3.event.target.id
      ) {
        d3.select("div.tooltipPackedCircles")
          .transition()
          .duration(500)
          .style("opacity", 0);
      }
    });

}