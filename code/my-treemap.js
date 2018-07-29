function renderTreeMap(data) {
  // console.log(data);

  var colorScale = d3.scaleLinear().domain([5, 32]).range(["#F7F8F8", "#ACBB78"]);

  var nestedDataset = d3.nest()
    .key(d => d.SONG)
    .entries(data);

  var packableSet = {
    id: "All songs",
    values: nestedDataset
  };
  // console.log(packableSet);


  var treeMapLayout = d3.treemap().size([600, 600]);

  var root = d3.hierarchy(packableSet, (d, i) => d.values)
    .sum(d => {
      return d.RUN_COUNT;
    });

  treeMapLayout(root);

  d3.select("svg.main-chart")
    .append("g")
    .attr("transform", "translate(100,20)scale(0.98)")
    .selectAll("rect")
    .data(treeMapLayout(root).descendants())
    .enter()
    .append("g")
    .attr("class", "box")
    .attr("id", (d, i) => "rect-g" + i)
    .append("rect")
    .attr("class", "box")
    .attr("id", (d, i) => "rect" + i)
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .style("fill", d => colorScale(d.data.RUN_COUNT))
    .style("stroke", "gray")
  // .style("fill", d =>  colorScale(d.data))
  ;
  var box = d3.selectAll("g.box");

  box.append("g").attr("class", "box-text")
    .append("text")
    .attr("id", "box-text")
    .attr("x", function(d, i) {
      return d.x0 + (d.x1 - d.x0) / 2;
    })
    .attr("y", function(d, i) {
      return d.y0 + (d.y1 - d.y0) / 2;
    })
    .attr("class", "treeMapBox")
    .attr("dy", ".2em")
    .text(d => +d.data.RUN_COUNT + 50);


  //toolTip for tree map containers
  d3.select("div.pageContent")
    .append("div")
    .attr("class", "tooltipTreeMap")
    .style("opacity", 0);


  d3.selectAll("g.box")
    .on("mouseover", function(d, i) {
      d3.selectAll("div.tooltipTreeMap")
        .style("opacity", 1)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
        .html(d.data.SONG)
        ;

    })
    .on("mouseout", () => {
      if (
      (d3.event.srcElement.id !==  "box-text"
      &&  d3.event.target.id !== "box-text"
      &&   d3.event.srcElement.id !== d3.event.target.id)
      ) {
        d3.select("div.tooltipTreeMap")
          .transition()
          .duration(500)
          .style("opacity", 0);
      }
    });



}
