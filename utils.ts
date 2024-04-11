// Function to calculate the mean of an array of numbers
export const calculateMean = (values: number[]): number => {
  const total = values.reduce((sum, value) => sum + value, 0);
  return values.length ? parseFloat((total / values.length).toFixed(3)) : 0;
};

// Function to calculate the median of an array of numbers
export const calculateMedian = (values: number[]): number => {
  const sortedData = values.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedData.length / 2);

  if (sortedData.length % 2 === 0) {
    return parseFloat(
      ((sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2).toFixed(3)
    );
  } else {
    return parseFloat(sortedData[middleIndex].toFixed(3));
  }
};

// Function to calculate the mode of an array of numbers
export const calculateMode = (values: number[]): number => {
  const frequencyMap: { [key: number]: number } = {};

  values.forEach((value) => {
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;
  });

  let mode: number | null = null;
  let maxFrequency = -Infinity;

  for (const key in frequencyMap) {
    if (frequencyMap[key] > maxFrequency) {
      mode = Number(key);
      maxFrequency = frequencyMap[key];
    }
  }

  return mode !== null ? parseFloat(mode.toFixed(3)) : 0;
};
