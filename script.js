var gradesP = d3.json("data.json");

gradesP.then(function(d)
{
  drawInitial(d,0);
  console.log(d);
},
function(err)
{
  console.log(err);
})

var drawInitial = function(data,day)
{
  var svg = d3.select("svg")
              .attr("height", 500)
              .attr("width", 500);

  var margins =
  {
    left:10,
    right:10,
    top:10,
    bottom:10
  }

var quizGrades = d3.range(data.length)
                   .map(function(d) {return data[d].quizes[day].grade;});

console.log(quizGrades);
console.log("array should be above");

  var width = 500 - margins.left - margins.right;
  var height = 500 - margins.top - margins.bottom;
  var barWidth = width / data.length;

  var xScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([0,width])
                 .nice();

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0])
                 .nice();

  var binMaker=d3.histogram()
                 .domain(xScale.domain())
                 .thresholds(xScale.ticks(10));

  //var bins = binMaker(***********)


  svg.selectAll("rect")
     .data(quizGrades)
     .enter()
     .append("rect")
     .attr("x", function(d,i) {
       return xScale(d.x0);})
     .attr("y", function (d,i) {
       return height - yScale(0);})
     .attr("width", function(d){
       return xScale(d.x1-.1)-xScale(d.x0);})
     .attr("height", height)
     .attr("fill", "black");
}
