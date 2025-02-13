
// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metaData = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let result = metaData.filter(obj => obj.id == sample)[0];
    console.log(result)
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (x in result){
      panel.append("h4").text(`${x.toUpperCase()}: ${result[x]}`)
    }
  });
}
buildMetadata(940)
// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleData = samples.filter(x => x.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sampleData.otu_ids
    let otu_labels = sampleData.otu_labels
    let sample_values = sampleData.sample_values    

    // Build a Bubble Chart
    let trace1 = {

    }
    let data1 = [trace1]
    let layout1 = {

    }
    // Render the Bubble Chart
    Plotly.newPlot("bubble", data1, layout1);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(otu_id => `OTU ${otu_id}`).slice(0,10);
    let sample_values_data = sample_values.slice(0,10).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately

    let trace2 = {
      x:sample_values_data,
      y:yticks.reverse(),
      type: 'bar',
      orientation: "h"
    }
    let layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      
    }
    data2 = [trace2]
    // Render the Bar Chart
    Plotly.newPlot("bar", data2, layout2);
  });
}
buildCharts(940)

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropDown =d3.select(`#selDataset`);

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i=0; i< names.length; i++){
      dropDown.append("option").attr("value", names[i]).text(`${names[i]}`)
    };

    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
