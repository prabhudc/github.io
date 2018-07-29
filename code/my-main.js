var chartWidth = "100%";
var chartHeight = "720";


function hitSongs(){
    console.log("hit Songs!");
    clearToolTips();
    d3.select("svg.main-chart").remove();
  d3.select("div.pageContent")
    .append("svg")
    .attr("class","main-chart")
    .attr("width", chartWidth)
    .attr("height",chartHeight)
  // .attr("transform","translate(100,100)");
  d3.csv("files/song_run_rate_on_billboard.csv", (error, data) => {
    data.forEach(function(d) {
      d.RUN_COUNT = +d.RUN_COUNT - 50;
    })
    renderTreeMap(data);
  });
}


function legends(){
    console.log("Legends!");
    clearToolTips();
  d3.select("svg.main-chart").remove();
  d3.select("div.pageContent")
    .append("svg")
    .attr("class","main-chart")
    .attr("width", chartWidth)
    .attr("height",chartHeight)
  // .attr("transform","translate(100,100)");
  d3.csv("files/artist_weeks_on_top5.csv", (error, data) => {
    data.forEach(function(d) {
      d.RUN_COUNT = +d.RUN_COUNT - 400;
    })
    renderPackedCircles(data);
  });
}


function dieHards(){
    console.log("Die Hards!");
    clearToolTips();
  d3.select("svg.main-chart").remove();
  d3.select("div.pageContent")
    .append("svg")
    .attr("class","main-chart")
    .attr("width", chartWidth)
    .attr("height",chartHeight)
    .attr("transform","translate(200,50)");
;
  d3.csv("files/top_come_back.csv", (error, data) => {
    renderScatterPlot(data);
  })
}

