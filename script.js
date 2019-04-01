

//******************************read data file*****************************//
var gradesP = d3.json("classData.json");

//*****************************make promise********************************//
gradesP.then(function(d)
{
  drawChart(d,0);
  console.log("Initialization working.");
//updateChart(d,5);
//console.log("Update working.");
},
function(err)
{
  console.log(err);
});


//********************* draw initial chart *********************************//
var drawChart = function(d,penguin)
  {
    d[penguin].quizes.forEach(function(d) {d.type="Quiz"});
    d[penguin].final.forEach(function(d) {d.type="Final"});
    d[penguin].test.forEach(function(d) {d.type="Test"});
    d[penguin].homework.forEach(function(d) {d.type="Homework"});
    var finalG = d[penguin].final;
    list2 = finalG.concat(d[penguin].homework);
    list3 = list2.concat(d[penguin].quizes);
    allGrades = list3.concat(d[penguin].test);
    allGrades.forEach(function(d) {d.percent=(d.grade / d.max)*100});
    console.log(allGrades);

var pengPics = d3.range(d.length)
                    .map(function(x) {return d[x].picture;});
console.log(pengPics);
var penguinIsland = d3.select("body");

penguinIsland.selectAll("img")
             .data(d)
             .enter()
             .append("img")
             .attr("src", function(d,i) {
              return d})
             .attr("alt", function(d,i) {
               return "Penguin " + i;})
             .attr("id", function(d,i) {
               return i;})
             .attr("height", 100)
             .attr("width", 100)
             .on("click", function(d,i){
               var order = d.id;
               updateChart(d,order);});

var dayHeader = d3.select("h1");
dayHeader.text("Semester Grades for Penguin " + penguin);

     var screen =
      {
        width:1000,
        height:450
      };
      var svg = d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height);

      var margins =
      {
        top:10,
        bottom:40,
        left:45,
        right:145
      };

      var width = screen.width - margins.left - margins.right;
      var height = screen.height - margins.top - margins.bottom;
      var colors = d3.scaleOrdinal(d3.schemeSet1);
      var xScale = d3.scaleLinear()
        .domain([0,41])
        .range([0,width]);
      var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([height,0]);
      var plotLand = svg.append("g")
          .attr("id","plotLand")
          .classed("plot",true)
          .attr("transform","translate("+margins.left+","+margins.top+")");
      var students = plotLand.selectAll("g")
          .attr("id", "students")
          .data(allGrades)
          .enter()
          .append("g")
      students.selectAll("circle")
          .data(allGrades)
          .enter()
          .append("circle")
          .attr("cx",function(d,i)
          {
            return xScale(d.day);
          })
          .attr("cy",function(d){return yScale(d.percent);})
          .attr("r", function(d) {
            if (d.type == "Quiz") {
              return 6;}
            else if (d.type == "Homework") {
              return 6;}
            else if (d.type == "Test") {
              return 12;}
            else if (d.type == "Final") {
              return 15;}})
          .attr("fill", function(d) {
            return colors(d.type);})
        .append("title")
        .text(function(d)
          {return "This "+d.type+" grade is a " + d.percent;});

          var xAxis  = d3.axisBottom(xScale);

        svg.append("g")
          .classed(xAxis,true)
          .call(xAxis)
          .attr("transform","translate("+margins.left+","
          +(margins.top+ height + 15)+")"
        );
/**************************** LEGEND *************************************/
var gradeTypes = ['Quiz', 'Homework', 'Test', 'Final'];

      var legend = svg.append("g")
        .classed("legend",true)
        .attr("transform","translate("+
        (width + margins.left) + "," + margins.top+")");
        var legendLines = legend.selectAll("g")
            .data(gradeTypes)
            .enter()
            .append("g")
            .classed("legendLines",true)
            .attr("transform",function(d,i)
            {
              return "translate(" + 50 + "," + (i*20 +5) +")";}
          )
        legendLines.append("rect")
                .attr("x", 0)
                .attr("y", function(d,i){return i*20;})
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", function(d) {
                  return colors(d);});

        legendLines.append("text")
              .attr("x",20)
              .attr("y",function(d,i){return i*20+14;})
              .text(function(d){return d;});

//************************* Y AXIS ******************************************//
      var yAxis  = d3.axisLeft(yScale);
        svg.append("g")
          .classed(yAxis,true)
          .call(yAxis)
          .attr("transform","translate("+(margins.left-20)+","
          + 7 +")");
  }



//**************************** UPDATE CHART ********************************//
var updateChart = function(d,penguin)
  {
      d[penguin].quizes.forEach(function(d) {d.type="Quiz"});
      d[penguin].final.forEach(function(d) {d.type="Final"});
      d[penguin].test.forEach(function(d) {d.type="Test"});
      d[penguin].homework.forEach(function(d) {d.type="Homework"});
      var finalG = d[penguin].final;
      list2 = finalG.concat(d[penguin].homework);
      list3 = list2.concat(d[penguin].quizes);
      allGrades = list3.concat(d[penguin].test);
      allGrades.forEach(function(d) {d.percent=(d.grade / d.max)*100});
      console.log(allGrades);

      var dayHeader = d3.select("h1");
      dayHeader.text("Semester Grades for Penguin " + penguin);

       var screen =
        {
          width:100,
          height:450
        };
        var svg = d3.select("svg")
          .attr("width",screen.width)
          .attr("height",screen.height);

        var margins =
        {
          top:10,
          bottom:40,
          left:45,
          right:145
        };

        var width = screen.width - margins.left - margins.right;
        var height = screen.height - margins.top - margins.bottom;
        var colors = d3.scaleOrdinal(d3.schemeSet1);
        var xScale = d3.scaleLinear()
          .domain([0,41])
          .range([0,width]);
        var yScale = d3.scaleLinear()
          .domain([0,100])
          .range([height,0]);
        var plotLand = svg.selectAll("#plotLand")
            .classed("plot",true)
            .attr("transform","translate("+margins.left+","+margins.top+")");
        var students = plotLand.selectAll("#students")
            .data(allGrades)
            .transition();
        students.selectAll("circle")
            .data(allGrades)
            .transition()
            .attr("cx",function(d,i)
            {
              return xScale(d.day);
            })
            .attr("cy",function(d){return yScale(d.percent);})
            .attr("r", function(d) {
              if (d.type == "Quiz") {
                return 6;}
              else if (d.type == "Homework") {
                return 6;}
              else if (d.type == "Test") {
                return 12;}
              else if (d.type == "Final") {
                return 15;}})
            .attr("fill", function(d) {
              return colors(d.type);});

              var title = d3.selectAll("title");
              title.remove()
              svg.selectAll("circle")
              .append("title")
              .text(function(d)
                {return "This "+d.type+" grade is a " + d.percent;});

            var xAxis  = d3.axisBottom(xScale);

}
