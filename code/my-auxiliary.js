
function buildToolTop5Artist(d) {
    console.log(d.depth);
  if (d.depth != 0) {
    d3.select("div.tooltipPackedCircles")
    .style("padding", 10)
    // .style("opacity", 1)
    ;
    return toolTipText = '<h3>' + d.data.PERFORMER + '</h3><hr>';

  } else {
    d3.select("div.tooltipPackedCircles")
    .style("padding", 0)
    // .style("opacity", 0)
    ;
  }
}

function buildToolTipText(d) {
  var toolTipText = '<h3>' + d.PERFORMER + '</h3><hr>'

  toolTipText = toolTipText + 'Gap in years : <b>' + d.GAP + '</b><br/>';
  toolTipText = toolTipText + 'Previous top-5 : <b>' + getYearFromDate(d.PREV_WEEKID) + '</b><br/>';
  toolTipText = toolTipText + 'Next top-5 : <b>' + getYearFromDate(d.WEEKID) + '</b>';

  return toolTipText;
}


function getYearFromDate(data) {
  var outYear = 0;
  if (parseInt(data.substr(data.lastIndexOf('-') + 1, 2)) > 50) {
    (outYear = '19' + data.substr(data.lastIndexOf('-') + 1, 2)).toString()
  } else {
    outYear = ('20' + data.substr(data.lastIndexOf('-') + 1, 2)).toString()
  };
  return outYear;
}

function clearAll(){
    d3.select("svg.main-chart").remove();
    d3.select("div.tooltipScatterPlot").remove();
    d3.select("div.tooltipTreeMap").remove();
    d3.select("div.tooltipPackedCircles").remove();
    d3.select("html.main-text").remove();
    d3.select("div.chart-text").remove();
    d3.select("div.chart-group").remove();
    d3.select("div.log-check").remove();
}

