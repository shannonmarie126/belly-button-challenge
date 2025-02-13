
// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metaData = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let result = metaData.filter(obj => obj.id == sample)[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Loop through each key-value pair in the filtered metadata 
    // and append to the panel
    for (x in result){
      panel.append("h6").text(`${x.toUpperCase()}: ${result[x]}`)
    };
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleData = samples.filter(x => x.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sampleData.otu_ids;
    let otu_labels = sampleData.otu_labels;
    let sample_values = sampleData.sample_values;    

    // Build a Bubble Chart
    let trace1 = {
      x:otu_ids,
      y:sample_values,
      marker: {
        size: sample_values,
        color:otu_ids},
      text: otu_labels,
      mode: 'markers'
    };
    let data1 = [trace1];
    let layout1 = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Number of Bacteria'
      },
      width: 1000
    };
    
    // Render the Bubble Chart
    Plotly.newPlot("bubble", data1, layout1);

    // Prepare the data for the bar chart, slice for top 10 
    let yticks = otu_ids.map(otu_id => `OTU ${otu_id}`).slice(0,10);
    let sample_values_data = sample_values.slice(0,10).reverse();

    // Build a Bar Chart
    // reverse y ticks so the largest x value is on the top
    let trace2 = {
      x:sample_values_data,
      y:yticks.reverse(),
      type: 'bar',
      orientation: "h",
      hovertext: otu_labels
    };
    let layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {
        title: 'Number of Bacteria'
      },
      width: 700
    };
    data2 = [trace2];
    
    // Render the Bar Chart
    Plotly.newPlot("bar", data2, layout2);
  });
}


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropDown =d3.select(`#selDataset`);

    // Populate the dropdown menu with the sample names
    for (let i=0; i< names.length; i++){
      dropDown.append("option").attr("value", names[i]).text(`${names[i]}`)
    };

    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first 
    // sample for initial load of the page
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener for the dropdown 
d3.select(`#selDataset`).on("change", function() {
  let newSample = d3.select(this).property("value");});

  //function to handle changes in the selected sample
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
// Initialize the dashboard
init();
