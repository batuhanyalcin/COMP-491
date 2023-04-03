import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Plotly from 'react-native-plotly';




export default function SpaghettiGraph(props)  {
    console.log("hello");

    //Median Filter
    const med_filtered_x = medianFilter(props.x,5);
    const med_filtered_y = medianFilter(props.y,5);

    //Low-pass + moving avarage filter
    //const com_filtered_x = combine_L_MovAvg_Filter(props.x,100);
    //const com_filtered_y = combine_L_MovAvg_Filter(props.y,100);


    //console.log(med_filtered_X);
    
    //const [x, setX] = React.useState([1, 2, -3, 4, 5])
    //const [y, setY] = React.useState([1, 2, 3, 4, -8])
    
    const data = {
        __id: 'up',
        x: med_filtered_x,
        y: med_filtered_y,
        type: 'scatter'
      };

    state = {
        data: [data],
        layout: { 
            title: 'Spagetti Graph',
            xaxis: {fixedrange: true},
            yaxis: {fixedrange: true}    
        }
    };

    
    return (
      <View style={styles.container}>
        <View style={styles.chartRow}>
          <Plotly
            data={state.data}
            layout={state.layout}
            config={{'displayModeBar': false}}
          />
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row'
  },
  chartRow: {
    flex: 1,
    width: '100%'
  },
  container: {
    paddingTop: 30,
    width: '80%',
    height: '50%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


function medianFilter(x, w) {
  const y = [];
  const window = [];
  let i;
  for (i = 0; i < x.length; i++) {
    const xi = x[i];
    window.push(xi);
    if (window.length > w) {
      window.shift();
    }
    const sortedWindow = window.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedWindow.length / 2);
    const median = sortedWindow[middleIndex];
    y.push(median);
  }
  return y;
};


function combine_L_MovAvg_Filter(data,sampleRate) {
  // Define the cutoff frequency for the low-pass filter
  const cutoffFrequency = 20; // in Hz

  // Define the window size for the moving average filter
  const windowSize = 100; // in samples

  // Define the filter coefficients for the low-pass filter
  const RC = 1.0 / (2.0 * Math.PI * cutoffFrequency);
  const dt = 1.0 / sampleRate;
  const alpha = RC / (RC + dt);
  let lowPassFilteredData = [data[0]];
  for (let i = 1; i < data.length; i++) {
    const filteredValue = alpha * data[i] + (1 - alpha) * lowPassFilteredData[i - 1];
    lowPassFilteredData.push(filteredValue);
  }

  // Define the filter coefficients for the moving average filter
  const movingAverageFilter = new Array(windowSize).fill(1.0 / windowSize);
  let smoothedData = [];
  for (let i = 0; i < data.length - windowSize + 1; i++) {
    const windowData = data.slice(i, i + windowSize);
    const smoothedValue = movingAverageFilter.reduce((acc, val) => acc + val * windowData.shift(), 0);
    smoothedData.push(smoothedValue);
  }
  return smoothedData;
}