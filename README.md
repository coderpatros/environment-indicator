# Environment Indicator

It seems that just about any project I work on I end up with a variety of
environments, dev, uat, staging, prod, training, etc. And I inevitably end up
creating some sort of visual indicator so users (and I) don't forget where they
are.

CSS has come a long way in recent years, and so I thought it was time I created
a nice reusable code snippet.

This creates a ribbon in the top left corner of the screen, like the 
"Fork me on GitHub" ribbon that you may have seen.

By default the element opacity is set to 0.75 and pointer-events set to none. 
This is to allow users to be able to see through the indicator and interact 
with any element underneath it, like a top nav bar for example. 

As I try this out on more sites I find css rules, that when inherited,
mess up the rendering of the indicator. If it doesn't work for you please
create an issue on GitHub with a link to the site that it doesn't work on.
If it's a non-public site, i.e. a web app on an internal corporate network
please include a list of the computed styles from your browsers dev tools.

## Licence

This code is licenced under the GPL v3.

## Usage

I've tried to keep usage as simple as possible. It involves including a single
script on your pages.

There are two ways you can configure it, query string parameters or a global
javascript variable environmentIndicatorOptions.

If you use query string parameters you can not load the script with either
async or defer. (This may actually work under some circumstances, but it can
break without warning.) And remember to encode any values as required (there 
is an example below for hash value colours).

### CDN

Feel free to use the jsDelivr CDN to save hosting the file yourself.
 
[https://cdn.jsdelivr.net/environment-indicator/latest/environment-indicator.min.js](https://cdn.jsdelivr.net/environment-indicator/latest/environment-indicator.min.js)

Or you can reference specific versions...
[https://cdn.jsdelivr.net/environment-indicator/1.0.1/environment-indicator.min.js](https://cdn.jsdelivr.net/environment-indicator/1.0.1/environment-indicator.min.js)

### Available Options

These are the default options...
```
var options = {
    content: "environment indicator",
    position: "fixed",
    width: "210px",
    top: "52px",
    left: "-43px",
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

With the exception of the content option, each option is applied as a style
property on the dom element used as the indicator. Additional style
properties that aren't in the above list can be provided and will be applied 
as well.

The content option needs to be text, no html.

### Query String Examples

```
<script src="environment-indicator.js?content=Training Environment&background-color=deeppink"></script>
```

And this example demonstrates encoding a background-color value of #4286f4...
```
<script src="environment-indicator.js?content=Training Environment&background-color=%234286f4"></script>
```

### Global Variable Example

```
<script>
    environmentIndicatorOptions = {
        content: "Training Environment",
        "background-color": "deeppink"
    };
</script>
<script src="environment-indicator.js"></script>
```