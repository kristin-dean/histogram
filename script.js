//******************************read data file*****************************//
var gradesP = d3.json("data.json");

//*****************************make promise********************************//
gradesP.then(function(d)
{
  drawInitial(d,37);
  updateChart(d,5);
},
function(err)
{
  console.log(err);
});

//**********************initialize histogram******************************//
var drawInitial = function(data,day)
{

  var screen =
  {
    height:400,
    width:400
  };

  var svg = d3.select("svg")
              .attr("height", screen.height + 20)
              .attr("width", screen.width);

  var margins =
  {
    left:40,
    right:10,
    top:10,
    bottom:10
  };

  var whatDay = d3.range(data.length)
                     .map(function(d) {return data[d].quizes[day].day;});
  var dayNumber = whatDay[0];

  var dayHeader = d3.select("h2");
  dayHeader.text("Day " + (parseInt(dayNumber)));

//*************************trying stuff out here****************************//
var quizGrades = d3.range(data.length)
                   .map(function(d) {return data[d].quizes[day].grade;});

var whatDay = d3.range(data.length)
                .map(function(d) {return data[d].quizes[day].day;});
var howManyDays = d3.range(data.length)
                    .map(function(d) {return data[d]});
var dayNumbers = howManyDays[0].quizes;
var numbers = d3.range(dayNumbers.length)
                .map(function(d) {return dayNumbers[d].day});

var buttonLand = d3.select("body");

buttonLand.selectAll("button")
          .data(numbers)
          .enter()
          .append("button")
          .attr("label", function(d) {
            return "Day " + d})
          .attr("width", "20px")
          .attr("height", "20px");


//**************************************************************************//

console.log("Grades for day " + data[0].quizes[day].day + ": " + quizGrades);

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var xScale = d3.scaleLinear()
                 .domain([0,11])
                 .range([0,width])
                 .nice();


  var binMaker=d3.histogram()
                 .domain(xScale.domain())
                 .thresholds(xScale.ticks(10));

  var bins = binMaker(quizGrades);

  var percentage = function(d){
      return d.length / quizGrades.length;
  };

  var yScale = d3.scaleLinear()
                 .domain([0,1])
                 .range([height,0])
                 .nice();

  svg.selectAll("rect")
     .data(bins)
     .enter()
     .append("rect")
     .attr("x", function(d) {
       return xScale(d.x0);})
     .attr("y", function (d) {
       return yScale(percentage(d));})
     .attr("width", function(d){
       return (width / bins.length)-.2;})
     .attr("height", function(d){
       return height - yScale(percentage(d));})
     .attr("fill", "blue")
     .attr("transform","translate("+ margins.left + "," + margins.top + ")");

//**************************************************************************//

//**************************************************************************//

     var yAxis = d3.axisLeft(yScale);
        svg.append("g")
        .classed(yAxis,true)
        .call(yAxis)
        .attr("transform","translate(" + margins.left + "," + margins.top + ")")
        .attr("id", "yAxis");

     var xAxis = d3.axisBottom(xScale);
        svg.append("g")
        .classed(xAxis,true)
        .call(xAxis)
        .attr("transform","translate(" + margins.left + "," + (margins.top + height) + ")")
        .attr("id", "xAxis");
};

//************************update histogram for specific day******************//
var updateChart = function(data,day)
{
  var quizGrades = d3.range(data.length)
                     .map(function(d) {return data[d].quizes[day].grade;});
  var whatDay = d3.range(data.length)
                     .map(function(d) {return data[d].quizes[day].day;});
  var dayNumber = whatDay[0];
  //var dayTitle = quizGrades.forEach(function(d)
  //  {return d.day;});
  //console.log(dayTitle);
  //dayHeader.text("Day " + )

    var dayHeader = d3.select("h2");
    dayHeader.text("Day " + (parseInt(dayNumber)));

  var screen =
  {
    height:400,
    width:400
  };

  var svg = d3.select("svg")
              .attr("height", screen.height + 20)
              .attr("width", screen.width);

  var margins =
  {
    left:40,
    right:10,
    top:10,
    bottom:10
  };

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var xScale = d3.scaleLinear()
                 .domain([0,11])
                 .range([0,width])
                 .nice();


  var binMaker=d3.histogram()
                 .domain(xScale.domain())
                 .thresholds(xScale.ticks(10));

  var bins = binMaker(quizGrades);


    var percentage = function(d){
        return d.length / quizGrades.length;};

  var yScale = d3.scaleLinear()
                 .domain([0,1])
                 .range([height,0])
                 .nice();

  svg.selectAll("rect")
     .data(bins)
     .transition()
     .duration(1000)
     .attr("x", function(d) {
        return xScale(d.x0);})
     .attr("y", function (d) {
        return yScale(percentage(d));})
     .attr("width", function(d){
        return (width / bins.length)-.2;})
     .attr("height", function(d){
        return height - yScale(percentage(d));})
     .attr("fill", "blue")
     .attr("transform","translate("+ margins.left + "," + margins.top + ")");

     var yAxisOld = svg.select("#yAxis");

     yAxisOld.remove()
              .transition();

     var yAxis = d3.axisLeft(yScale);
        svg.append("g")
        .classed(yAxis,true)
        .call(yAxis)
        .attr("transform","translate(" + margins.left + "," + margins.top + ")")
        .attr("id","yAxis");

     var xAxis = d3.axisBottom(xScale);
        svg.append("g")
        .classed(xAxis,true)
        .call(xAxis)
        .attr("transform","translate(" + margins.left + "," + (margins.top + height) + ")")
        .attr("id", "xAxis");

};

// how do we efficiently create 38 buttons for each day?
// how do we pass a function with a day number and make it display the right histogram?
// how do we deal days where there weren't quizzes?
