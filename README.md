# Environment Indicator

It seems that just about any project I work on I end up with a variety of
environments, dev, uat, staging, prod, training, etc. And I inevitably end up
creating some sort of visual indicator so users (and I) don't forget where they
are.

CSS has come a long way in recent years, and so I thought it was time I created
a nice reusable code snippet.

This creates a ribbon in the top left (or right) corner of the screen, like the 
"Fork me on GitHub" ribbon that you may have seen.

![Demo screenshot](demo.png)

By default the element opacity is set to 0.75 and pointer-events set to none. 
This is to allow users to be able to see through the indicator and interact 
with any element underneath it, like a top navigation bar for example. 

## Usage

I've tried to keep usage as simple as possible. It involves including a single
script on your pages.

There are two ways you can configure it, query string parameters or a global
javascript variable, environmentIndicatorOptions.

If you use query string parameters you can not load the script with either
async or defer. (This may actually work under some circumstances, but it can
break without warning.) And remember to encode any values as required (there 
is an example below for hash value colours).

You can experiment with this [JSFiddle](https://jsfiddle.net/patros/m6zhx1w4/).

### CDN

Feel free to use the jsDelivr CDN to save hosting the file yourself...  
[https://cdn.jsdelivr.net/gh/patros/environment-indicator@latest/environment-indicator.min.js](https://cdn.jsdelivr.net/gh/patros/environment-indicator@latest/environment-indicator.min.js)

Or you can reference specific versions...  
[https://cdn.jsdelivr.net/gh/patros/environment-indicator@1.2.0/environment-indicator.min.js](https://cdn.jsdelivr.net/gh/patros/environment-indicator@1.2.0/environment-indicator.min.js)

Or full reference with integrity check...

```<script src="https://cdn.jsdelivr.net/gh/patros/environment-indicator@1.2.0/environment-indicator.min.js" integrity="sha384-RD1YbBIt3Px1l5GSOQv4tMnK4kZFdtnrM465gepkcHh1aZZAYUzY42mLCg1iEdOF" crossorigin="anonymous"></script>```

### Available Options

These are the default options...
```
var options = {
    content: "environment indicator",
    onRight: false,
    position: "fixed",
    "transform-origin": "left top",
    "z-index": 10000,
    transform: "rotate(315deg)",
    padding: "5px",
    color: "white",
    "background-color": "#15db19",
    "line-height": "initial",
    "text-align": "center",
    "font-family": "Arial",
    "font-weight": "bold",
    "font-size": "18px",
    opacity: "0.75",
    "pointer-events": "none"
};
```

If ```onRight``` is true the defaults for ```transform``` and 
```transform-origin``` will be set to ```rotate(45deg)``` and
```"right top"``` respectively.

With the exception of the content and onRight options, each option is applied
as a style property on the dom element used as the indicator. Additional style
properties that aren't in the above list can be provided and will be applied 
as well.

The content option needs to be text, no html.

Four css values are calculated, these are left (or right if onRight is true), 
top, padding-left and padding-right. You can override these values, 
they will be honoured.

### Query String Examples

```
<script src="https://cdn.jsdelivr.net/gh/patros/environment-indicator@latest/environment-indicator.js?content=Training Environment&background-color=deeppink"></script>
```

And this example demonstrates encoding a background-color value of #4286f4...
```
<script src="https://cdn.jsdelivr.net/gh/patros/environment-indicator@latest/environment-indicator.js?content=Training Environment&background-color=%234286f4"></script>
```

### Global Variable Examples

```
<script>
    environmentIndicatorOptions = {
        content: "Training Environment",
        "background-color": "deeppink"
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/patros/environment-indicator@latest/environment-indicator.js"></script>
```

Or better yet, create environment specific files like this...

`environment-indicator-options.js` for UAT
```
environmentIndicatorOptions = {
    content: "UAT Environment"
};
```

`environment-indicator-options.js` for production
```
environmentIndicatorOptions = {
    display: "none",
    content: "Production Environment"
};
```

Then include something like this in your html...
```
<script src="/environment-indicator-options.js"></script>
<script src="https://cdn.jsdelivr.net/gh/patros/environment-indicator@latest/environment-indicator.js"></script>
```

Note that the div element will still be added to the DOM. It just won't be
displayed.
