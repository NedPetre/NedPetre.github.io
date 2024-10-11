import math

def round_scale(scale):
    if scale == 0:
        return 1
    
    magnitude = 10 ** math.floor(math.log10(abs(scale)))
    normalized_scale = abs(scale) / magnitude
    
    if normalized_scale <= 1:
        return 1 * magnitude
    elif normalized_scale <= 2:
        return 2 * magnitude
    elif normalized_scale <= 5:
        return 5 * magnitude
    else:
        return 10 * magnitude

def calculate_scale(data, num_divisions, include_origin=False):
    if include_origin:
        data_min = min(0, min(data))
        data_max = max(data)
    else:
        data_min = min(data)
        data_max = max(data)
    
    range_data = data_max - data_min
    max_display_range = range_data / 0.5
    raw_scale = range_data / num_divisions
    rounded_scale = round_scale(raw_scale)

    actual_data_range = rounded_scale * num_divisions

    if actual_data_range > max_display_range:
        while actual_data_range > max_display_range:
            rounded_scale = round_scale(rounded_scale / 2)
            actual_data_range = rounded_scale * num_divisions

    if actual_data_range < range_data:
        while actual_data_range < range_data / 2:
            rounded_scale = round_scale(rounded_scale * 2)
            actual_data_range = rounded_scale * num_divisions

    return rounded_scale

def main():
    print("Welcome to the Axis Scale Calculator!")

    x_data_input = input("Enter X-axis data (comma-separated): ")
    x_data = list(map(float, x_data_input.split(',')))

    y_data_input = input("Enter Y-axis data (comma-separated): ")
    y_data = list(map(float, y_data_input.split(',')))

    x_divisions = int(input("Enter number of divisions for X-axis: "))
    y_divisions = int(input("Enter number of divisions for Y-axis: "))

    include_origin_input = input("Include origin in scales? (y/n): ").strip().lower()
    include_origin = include_origin_input == 'y'

    x_scale = calculate_scale(x_data, x_divisions, include_origin)
    y_scale = calculate_scale(y_data, y_divisions, include_origin)

    print("\nX-axis scale: {}".format(x_scale))
    print("Y-axis scale: {}".format(y_scale))

# Ensure the main function runs when the script is executed
if __name__ == "__main__":
    main()
