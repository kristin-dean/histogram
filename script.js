/******************************read data file*****************************//
var gradesP = d3.json("data.json");

//*****************************make promise********************************//
gradesP.then(function(d)
{
  drawInitial(d,0);
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

//*******************working to get an array of all quiz days***************//
var quizGrades = d3.range(data.length)
                   .map(function(d) {return data[d].quizes[day].grade;});
var howManyDays = d3.range(data.length)
                    .map(function(d) {return data[d]});
var dayNumbers = howManyDays[0].quizes;
var numbers = d3.range(dayNumbers.length)
                .map(function(d) {return dayNumbers[d].day});

var dayData = d3.select("h3");
dayData.text("Quiz Grades for today: " + quizGrades);

//******************** create the buttons **********************************//
var buttonLand = d3.select("body");

buttonLand.selectAll("button")
          .data(numbers)
          .enter()
          .append("button")
          .attr("label", function(d,i) {
            return "Day " + d})
          .text(function(d) {
            return "Day " + d})
          .on("click", function(d,i){
          if(d<15) {
              var day = (d-1);
            }
            else if (d>15 && d<30) {
              var day = (d-2);
            }
            else if (d>30 && d<42) {
              var day = (d-3);
            }
            updateChart(data,day,d)});
//************************** foundations of chart ******************************//

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var xScale = d3.scaleLinear()
                 .domain([0,11])
                 .range([0,width])
                 .nice();

  var yScale = d3.scaleLinear()
                 .domain([0,.6])
                 .range([height,0])
                 .nice();

//****************************histogram bins******************************//
  var binMaker=d3.histogram()
                 .domain(xScale.domain())
                 .thresholds(xScale.ticks(10));

  var bins = binMaker(quizGrades);

  var percentage = function(d){
      return d.length / quizGrades.length;
  };

//**************************** make rectangles*****************************//
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

//************************** create axes *******************************//

     var yAxis = d3.axisLeft(yScale);
        svg.append("g")
        .classed(yAxis,true)
        .call(yAxis)
        .attr("transform","translate(" + margins.left + "," + margins.top + ")")
        .attr("id", "yAxis")

     var xAxis = d3.axisBottom(xScale);
        svg.append("g")
        .classed(xAxis,true)
        .call(xAxis)
        .attr("transform","translate(" + margins.left + "," + (margins.top + height) + ")")
        .attr("id", "xAxis");
};






//************************update histogram for specific day******************//
var updateChart = function(data,day,dayButton)
{
  var quizGrades = d3.range(data.length)
                     .map(function(d) {return data[d].quizes[day].grade;});

//***************** change titles for day data being displayed **************//
    var dayHeader = d3.select("h2");
    dayHeader.text("Day " + dayButton);
    var dayData = d3.select("h3");
    dayData.text("Quiz Grades for today: " + quizGrades);
//*********************** screen basics ***********************************//
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

  var yScale = d3.scaleLinear()
                 .domain([0,.6])
                 .range([height,0])
                 .nice();

//************************* create updated bins ******************************//
  var binMaker=d3.histogram()
                 .domain(xScale.domain())
                 .thresholds(xScale.ticks(10));

  var bins = binMaker(quizGrades);


    var percentage = function(d){
        return d.length / quizGrades.length;};


//****************** bind new data and draw the rectangles *****************//
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

};
