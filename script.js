//******************************read data file*****************************//
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
    height:300,
    width:300
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

var quizGrades = d3.range(data.length)
                   .map(function(d) {return data[d].quizes[day].grade;});

console.log(quizGrades);
console.log("Grades for day "+ data[0].quizes[day].day + " above");

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var xScale = d3.scaleLinear()
                 .domain([0,10])
                 .range([0,width])
                 .nice();


  var binMaker=d3.histogram()
                 .domain(xScale.domain())
                 .thresholds(xScale.ticks(10));

  var bins = binMaker(quizGrades);
  console.log(bins);

  var yScale = d3.scaleLinear()
                 .domain([0,d3.max(bins, function(d){
                   return d.length;})])
                 .range([height,0])
                 .nice();

  svg.selectAll("rect")
     .data(bins)
     .enter()
     .append("rect")
     .attr("x", function(d) {
       return xScale(d.x0);})
     .attr("y", function (d) {
       return yScale(d.length);})
     .attr("width", function(d){
       return xScale(d.x1-.1)-xScale(d.x0);})
     .attr("height", function(d){
       return height - yScale(d.length);})
     .attr("fill", "blue")
     .attr("transform","translate("+ margins.left + "," + margins.top + ")");

//**************************************************************************//



//**************************************************************************//

     var yAxis = d3.axisLeft(yScale);
        svg.append("g")
        .classed(yAxis,true)
        .call(yAxis)
        .attr("transform","translate(" + margins.left + "," + margins.top + ")");

     var xAxis = d3.axisBottom(xScale);
        svg.append("g")
        .classed(xAxis,true)
        .call(xAxis)
        .attr("transform","translate(" + margins.left + "," + (margins.top + height) + ")");
};

//************************update histogram for specific day******************//
