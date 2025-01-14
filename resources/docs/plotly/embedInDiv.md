# This sample shows how we can render some HTML, and in the html have a placeholder for the plot

1. Create an HTML cell with the following markup & run this.

```html
<style>
    #div {
        width: 500px;
    }

    #dvText {
        margin-left: 510px;
        font-size: large;
        float: left;
    }
</style>
<div style="width: 100%; overflow: hidden;">
    <div id='dvText'>
        This is a sample plot. Note, initially there is plot.
        However we have an empty div with the id `myDiv`.
        The plotly renderer will first look for an id you have specified, if found it will render the plot in that HTML
        Element, if not found
        it will render the plot in the output of the same cell which contains the code for the plot.
    </div>
    <div id="myDiv"></div>
</div>
```

2. Next create a JavaScript cell with the followig code and run it

```javascript
const { Plotly } = require('node-kernel');
var data = [{
    values: [19, 26, 55],
    labels: ['Residential', 'Non-Residential', 'Utility'],
    type: 'pie'
}];
var layout = {
    height: 400,
    width: 500
};

// Note, the div is defined in the HTML of the previous cell, hence the Plot will be displyed above.
Plotly.newPlot('myDiv', data, layout);
```

3. Note how the plot is injected into the HTMl generated by the first cell (because the element named `myDiv` exists in the output of the first cell).

![Output](https://raw.githubusercontent.com/DonJayamanne/typescript-notebook/main/resources/docs/plotly/embedInDiv.png)
