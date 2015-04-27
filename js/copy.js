
// Various accessors that specify the four dimensions of data to visualize.
function x1(d) { return d.migration; }
function y1(d) { return d.increase; }
function radius(d) { return d.population; }
function color1(d) { return d.region; }
//function key(d) { return d.name; }

// Chart dimensions.
var margin4 = {top: 35, right: 180, bottom: 20, left:60},
    width4 = 850 - margin4.right,
    height4 = 560 - margin4.top - margin4.bottom;

// Various scales. These domains make assumptions of data, naturally.
var xScale1 = d3.scale.linear().domain([0, 58000]).range([0, width4]),
    yScale1 = d3.scale.linear().domain([-10000, 120000]).range([height4, 0]),
    radiusScale = d3.scale.linear().domain([0, 8e6]).range([0, 100]),
    colorScale = d3.scale.category10();

// The x & y axes.
var xAxis1 = d3.svg.axis().orient("bottom").scale(xScale1),
    yAxis1 = d3.svg.axis().scale(yScale1).orient("left");

// var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(8, d3.format(",d")),
//     yAxis = d3.svg.axis().scale(yScale).orient("left");

// Create the SVG container and set the origin.
var svg = d3.select("#chart").append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
    .append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height4 + ")")
    .call(xAxis1);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis1);

// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width4)
    .attr("y", height4 - 6)
    .text("Net Overseas Migration");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Natural Increase");

// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height4 - 24)
    .attr("x", width4)
    .text(1991);

// Load the data.
 d3.json("australia.json", function(nations) {

  // A bisector since many nation's data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });



  // Add a dot per nation. Initialize the data at 1800, and set the colors.
  var dot = svg.append("g")
      .attr("class", "dots")
      .selectAll(".dot")
      .data(interpolateData(1991))
      .enter().append("circle")
      .attr("class", "dot")
      .style("fill", function(d) { return colorScale(color1(d)); })
      .call(position)
      .sort(order);


var tag = svg.append("g")
  .attr("class", "tag")
  .selectAll(".tag")
  .data(interpolateData(1991))
  .enter().append("text")
  .attr("class", "tag")
  .attr("text-anchor", "left")
  .style("fill", function(d) { return color1(d); })
  .text(function(d) { return d.name; })
  .call(tagposition)
  .sort(order);

  // Add a title.
  dot.append("title")
      .attr("x", 10)
      .text(function(d) { return d.name; });

  

  // Add an overlay for the year label.
  var box = label.node().getBBox();

   var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height)
        .on("mouseover", enableInteraction);

  // var overlay = svg.append("rect")
  //       .attr("class", "overlay")
  //       .attr("x", 20)
  //       .attr("y", 505)
  //       .attr("width", 860)
  //       .attr("height", 6)
  //       .on("mouseover", enableInteraction);

  //       svg.append("text")
  //              .attr("x",890)
  //              .attr("y",520)
  //               .style("font-size", 24)
  //              .text(2012);

  // Start a transition that interpolates the data based on year.
  // svg.transition()
  //     .duration(30000)
  //     .ease("linear")
  //     .tween("year", tweenYear)
  //     .each("end", enableInteraction);


var flag = 0;
var thisyear = 1991;
d3.select('#loop').on('click', function()
{

       d3.select('#run').attr('class','pause'); 
       thisyear = 1991;
        svg.transition()
      .duration(30000)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);
      flag = 1;

});

d3.select('#run').on('click', function()
{

  

    if(flag == 0)
    {
       d3.select('#run').attr('class','pause'); 
       svg.transition()
      .duration(30000)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);
      flag = 1;
       
     }
     else if(flag = 1)
     {
       d3.select('#run').attr('class','play'); 
      svg.transition(0);
      flag = 0;
     }

});



// d3.select('#stop').on('click', function()
// {
// svg.transition(0);
// });



  // Positions the dots based on data.
  function position(dot) {
    dot .attr("cx", function(d) { return xScale1(x1(d)); })
        .attr("cy", function(d) { return yScale1(y1(d)); })
        .attr("r", function(d) { return radiusScale(radius(d)); });
  }

    function tagposition(tag) {
    tag.attr("x", function(d) { return xScale1(x1(d)) -20; })
        .attr("y", function(d) { return yScale1(y1(d))-80; });
  }


  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }

  // After the transition finishes, you can mouseover to change the year.
  function enableInteraction() {
    var yearScale = d3.scale.linear()
        .domain([1991, 2012])
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

    // Cancel the current transition, if any.
    svg.transition().duration(0);

     overlay
         .on("mouseover", mouseover)
         .on("mouseout", mouseout)
         .on("mousemove", mousemove)
         .on("touchmove", mousemove);

    function mouseover() {
      label.classed("active", true);
    }

    function mouseout() {
      label.classed("active", false);
    }

    function mousemove() {
      console.log("hello"+yearScale.invert(d3.mouse(this)[0]));
      displayYear(yearScale.invert(d3.mouse(this)[0]));
    }
  }

  // Tweens the entire chart by first tweening the year, and then the data.
  // For the interpolated data, the dots and label are redrawn.
  function tweenYear() {
    var year = d3.interpolateNumber(thisyear, 2012);
    return function(t) { displayYear(year(t)); };
  }

  // Updates the display to show the specified year.
  function displayYear(year) {
    thisyear=year;
    dot.data(interpolateData(year)).call(position).sort(order);
    tag.data(interpolateData(year)).call(tagposition).sort(order);
    label.text(Math.round(year));
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year) {
    return nations.map(function(d) {
      return {
        name: d.region,
        region: d.region,
        increase: interpolateValues(d.increase, year),
        population: interpolateValues(d.population, year),
        migration: interpolateValues(d.migration, year)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }
});


