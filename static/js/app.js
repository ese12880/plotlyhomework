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
    