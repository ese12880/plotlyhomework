// Function to check the change in HTML page
function optionChanged(val) {
    var selVal=Number(val);
    console.log(Number(selVal))  
    main(selVal);
  }
// Function to all the plotting and main calculation
  function main(val){
  d3.json("samples.json").then((data) => {
    // Resetting the sample metadata to null
    document.getElementById("sample-metadata").innerHTML=[];
    selVal2=val;
    // Getting the size of name
    A= d3.set(data.names).size();
    // Logging the name and size
    console.log(data.names)
    console.log(A);
    // Scanning entire id to find the metadata
       for (var i=0;i<A;i++){
  //  Checking if the metadata is matching
           if (selVal2===data.metadata[i].id){
           //  console.log(data.metadata[i])
           var myObj=data.metadata[i];
          //  Adding the metadata in the sample Metadata
            for (x in myObj) {
               document.getElementById("sample-metadata").innerHTML += x+":"+myObj[x] + "<br>";
             }
            //  Finding the weekly frequency
             avgWfreq=data.metadata[i].wfreq;
             console.log(data.metadata[i].wfreq) 
            }
        }
               //  Empty array
               var sampleValues=[];
               var otuIds=[];
               var otuLabels=[];
              //  Scanning the entire json for data
               for (var j=0;j<A;j++){
                  // Matching the id to get the sample,out id's and labels
                   if (selVal2===Number(data.samples[j].id)){
                    //  Sorting in ascending value
                       data.samples[j].sample_values.sort(function compareFunction(firstNum, secondNum) {              
                           return firstNum-secondNum;
                         });
                        //  Console log the sample value
                         console.log(data.samples[j].sample_values)
                        // length of the sample value to get the top 10
                         B= data.samples[j].sample_values.length;
                         console.log(B)
                        //  For loop to get the top 10 value and appending in the array
                       for (var k=B-10;k<B;k++){
                       sampleValues.push(data.samples[j].sample_values[k])
                       otuIds.push('OTU '+data.samples[j].otu_ids[k])
                       otuLabels.push(data.samples[j].otu_labels[k])
                       console.log(data.samples[j].otu_labels[k])
                       }
                      //  getting the all data for selected id
                       allSample=data.samples[j].sample_values;
                       allOutIds=data.samples[j].otu_ids;
                       allOutLabels=data.samples[j].otu_labels;
                       allOutLabels=data.samples[j].otu_labels;
               }
               }
        //  Console logging the labels
        console.log(otuLabels)
      //  Tracing the horizontal bar
      var trace1 = {
        x: sampleValues,
        y: otuIds,
        hovertext:otuLabels,
        type: "bar",
        orientation: 'h'
      };
      
      // Create the data array for our plot
      var data_bar = [trace1];
      
      // Define our plot layout
      var layout = {
        title: "The highest critically acclaimed movies",
        xaxis: { title: "Title" },
        yaxis: { title: "Metascore (Critic) Rating"}
      };
     //  Plotting bar plot
      Plotly.newPlot("bar", data_bar);
    
   //  Tracing bubble plot
      var trace2 = {
        x: allOutIds,
        y: allSample,
        hovertext:allOutLabels,
        mode: 'markers',
        marker: {
          size: allSample,
          color:allOutIds
        }
      };
     // Create the data array for our plot
     var data_bubble = [trace2];
     //  Create layout
      var layout = {
       xaxis: { title: "OTU Ids" },
        showlegend: false,
        height: 600,
        width: 1000
        
      };
     //  plotting the Bubble plot
      Plotly.newPlot('bubble', data_bubble, layout);
    // Gauge and Needle creation
   //  Creating the level for needle
    var level = 180*avgWfreq/9;
    
    // Trig to calc meter point
    var degrees = 180 - level,
         radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    // Path: may have to change to create a better triangle
    var mainPath = path1,
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
   //  Creating the gauge
    var data = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 14, color:'850000'},
        showlegend: false,
        name: 'average Srub',
        text: avgWfreq,
        hoverinfo: 'text+name'},
      { values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      rotation: 90,
      text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
      direction: 'clockwise',
      textinfo: 'text',
      textposition:'inside',
      marker: {colors: ['rgba(250, 235,220, 0.3)','rgba(255, 220,200, 0.5)','rgba(250, 210, 100, .5)','rgba(240, 200, 142, .5)','rgba(202, 190, 95, .2)','rgba(210, 180, 145, .5)','rgba(180, 170, 102, .5)','rgba(140, 160, 40, .5)','rgba(100, 106, 22, .5)','white']},
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];
    
    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      height: 500,
      width: 500,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
     title:"<b>Belly Button Washing Frequency</b><br>Scrubs per week"
 
 
    };
   //  Plotting the gauge plot
    Plotly.newPlot('gauge', data, layout);
    });}
 // Calling the Main function when page load
    main(940);  