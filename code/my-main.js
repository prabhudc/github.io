var chartWidth = "70%";
var chartHeight = "720";

function getHome(){
    console.log("Mama I'm com'n home!");
    clearAll();
    d3.select("div.pageContent")
        .append("html")
        .attr("class","main-text")
        .html(homePageHTML)
;

}

function hitSongs(){
    console.log("hit Songs!");
    clearAll();
  d3.select("div.pageContent")
    .append("div")
    .attr("class","chart-text")
    .append("html")
    .attr("class","chart-text")
    .html(hitSongsHTML)
    ;
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
    clearAll();
  d3.select("div.pageContent")
    .append("div")
    .attr("class","chart-text")
    .append("html")
    .attr("class","chart-text")
    .html(hitSongsHTML)
    ;
  d3.select("div.pageContent")
    .append("svg")
    .attr("class","main-chart")
    .attr("width", chartWidth)
    .attr("height",chartHeight)
    // .attr("transform","translate(100,100)")
    ;
  d3.csv("files/artist_weeks_on_top5.csv", (error, data) => {
    data.forEach(function(d) {
      d.RUN_COUNT = +d.RUN_COUNT - 400;
    })
    renderPackedCircles(data);
  });
}


function dieHards(flag){
    console.log("Die Hards!");
    clearAll();
  d3.select("div.pageContent")
    .append("div")
    .attr("class","chart-text")
    .append("html")
    .attr("class","chart-text")
    .html(hitSongsHTML)
    ;
  // d3.select("svg.main-chart").remove();
  d3.select("div.pageContent")
    .append("div")
    .attr("class","chart-group")
    .append("svg")
    .attr("class","main-chart")
    .attr("width", chartWidth)
    .attr("height",chartHeight)
    // .attr("transform","translate(200,50)")
    ;
;


  d3.csv("files/top_come_back.csv", (error, data) => {
    renderScatterPlot(data,flag);
  })
}

