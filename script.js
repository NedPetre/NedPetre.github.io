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

    // Calculate the initial range of data
    let range = endValue - startValue;

    // Set a minimum range to ensure data takes up at least half the axis
    let minRange = range * 2;  // Ensure data takes up at least half the axis
    let requiredRange = Math.max(range, minRange);  // The required range for the axis

    // Calculate a rough step size that fits this range into the number of divisions
    let step = requiredRange / numberDivisions;

    // Adjust step size to the nearest 1, 2, or 5 multiple without overshooting
    step = roundToNearest125(step);

    // Check if the total range (step * numberDivisions) fits the data
    let totalRange = step * numberDivisions;
    if (totalRange < range) {
        step = roundToNearest125((range / numberDivisions) * 1.1);  // Avoid overshooting, slightly increase step
    }

    return formatScale(step);
}

function roundToNearest125(value) {
    // Find the order of magnitude of the value
    const orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(value)));

    // Normalize the value to the range [1, 10)
    let normalizedValue = value / orderOfMagnitude;

    // Round to the nearest 1, 2, or 5 multiple
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
        return scale.toFixed(4);  // Otherwise, show with 4 decimal places for smaller values
    }
}
