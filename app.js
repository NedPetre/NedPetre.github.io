function calculateScale() {
  // Get user inputs
  const min = parseFloat(document.getElementById('min').value);
  const max = parseFloat(document.getElementById('max').value);
  const includeOrigin = document.getElementById('include-origin').value.toLowerCase() === 'y';
  
  if (isNaN(min) || isNaN(max) || (min >= max)) {
    document.getElementById('results').innerHTML = "Please enter valid min and max values.";
    return;
  }

  // Variables for scaling
  const pageFraction = 0.5;  // Representing the size of the page (50% of the graph)
  const scaleChoices = [1, 2, 5];  // Possible multiples

  let dataMin = min;
  let dataMax = max;

  if (includeOrigin) {
    dataMin = Math.min(0, min);
  }

  // Calculate the range and initial scale estimate
  let range = dataMax - dataMin;
  let scale = Math.pow(10, Math.floor(Math.log10(range)));
  
  // Find the best scale
  let finalScale;
  for (let choice of scaleChoices) {
    let candidateScale = choice * scale;
    if (range / candidateScale <= pageFraction) {
      finalScale = candidateScale;
      break;
    }
  }

  if (!finalScale) {
    finalScale = scaleChoices[scaleChoices.length - 1] * scale;
  }

  // Display the results
  document.getElementById('results').innerHTML = `
    <p>Scale: ${finalScale}</p>
    <p>Data Min: ${dataMin}, Data Max: ${dataMax}</p>
  `;
}
