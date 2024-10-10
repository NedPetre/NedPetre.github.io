document.getElementById('scaleForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve input values
    const includeOrigin = document.getElementById('includeOrigin').value === 'true';
    const numberDivisions = parseInt(document.getElementById('numberDivisions').value);
    const data = document.getElementById('data').value.split(',').map(Number);

    // Check if input data is valid
    if (data.some(isNaN)) {
        document.getElementById('result').innerText = "Please enter valid numbers for Data.";
        return;
    }

    // Calculate the proper scale
    const scale = calculateScale(includeOrigin, numberDivisions, data);

    // Display result
    document.getElementById('result').innerText = `Calculated Scale: ${scale}`;
});

function calculateScale(includeOrigin, numberDivisions, data) {
    if (data.length === 0 || numberDivisions < 1) return 'Invalid data';

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    // Handle empty or invalid data case
    if (isNaN(minValue) || isNaN(maxValue)) {
        return 'Invalid data';
    }

    // Adjust startValue based on includeOrigin option
    let startValue = includeOrigin ? 0 : minValue;
    let endValue = maxValue;

    // Calculate the range of the data
    let range = endValue - startValue;

    // We need the data to take up at least half the axis
    let targetRange = Math.max(range * 2, range);  // Ensure the range is doubled for half-axis constraint

    // Calculate the initial step size that would divide the target range into the number of divisions
    let step = targetRange / numberDivisions;

    // Adjust the step size to the largest possible 1, 2, 2.5, or 5 multiple without overshooting
    step = roundToNearest125(step);

    // Check if the total range (step * numberDivisions) can fit the data without undershooting
    let totalRange = step * numberDivisions;

    // If the total range is smaller than the data range, adjust the step size upwards
    while (totalRange < range) {
        step = roundToNearest125(step * 1.1);  // Slightly increase the step size
        totalRange = step * numberDivisions;
    }

    return formatScale(step);
}

function roundToNearest125(value) {
    // Find the order of magnitude of the value
    const orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(value)));

    // Normalize the value to the range [1, 10)
    let normalizedValue = value / orderOfMagnitude;

    // Round to the nearest 1, 2, 2.5, or 5 multiple
    if (normalizedValue <= 1) {
        normalizedValue = 1;
    } else if (normalizedValue <= 2) {
        normalizedValue = 2;
    } else if (normalizedValue <= 2.5) {
        normalizedValue = 2.5;
    } else if (normalizedValue <= 5) {
        normalizedValue = 5;
    } else {
        normalizedValue = 10;
    }

    // Multiply back by the order of magnitude to get the final step size
    return normalizedValue * orderOfMagnitude;
}

function formatScale(scale) {
    // If the scale is smaller than 0.01 or larger than 10000, use scientific notation
    if (scale < 0.01 || scale >= 10000) {
        return scale.toExponential(2);  // 2 decimal places in scientific notation
    } else {
        return scale.toFixed(2);  // Otherwise, show with 4 decimal places for smaller values
    }
}
