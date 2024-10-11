# Axis Scale Calculator

This project is a simple web-based axis scale calculator that takes user input and computes the appropriate scale divisions for graphing. It mimics the behavior of a Python axis scale calculator and ensures that the data fits on the graph without overshooting, while adhering to the constraints of multiples of 1, 2, or 5.

## Features
- Input three values: 
  - **Include Origin**: A boolean to specify whether the origin should be included in the scale.
  - **Number of Divisions**: The number of scale divisions.
  - **Data**: A set of numerical data that will determine the range.
- Calculates the appropriate axis scale based on the input.
- Ensures the data fits within the graph without overshooting.
- Responsive and mobile-friendly design.
- Scale is displayed in either decimal or scientific notation depending on the magnitude of the values.
- Clean and minimal UI.

## Technologies Used
- HTML
- CSS (for responsive and clean design)
- JavaScript (for handling the calculation logic)

## Installation
1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/axis-scale-calculator.git
    ```
2. Navigate to the project directory:
    ```bash
    cd axis-scale-calculator
    ```
3. Open `index.html` in your browser:
    ```bash
    open index.html
    ```

## Usage
1. Open the website.
2. Input the following values:
   - **Include Origin**: Choose whether to include the origin.
   - **Number of Divisions**: Enter the number of divisions required.
   - **Data**: Input your numerical data.
3. Press the **Calculate Scale** button.
4. The result will be displayed in the greyed-out area.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
