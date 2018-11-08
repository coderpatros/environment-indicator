/**
 * @name environment-indicator
 * @version 1.2.0
 * @author Patrick Dwyer
 * @copyright Copyright (C) 2016 Patrick Dwyer
 *
 * MIT License
 * 
 * Copyright (c) 2016 Patrick T Dwyer
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/
(function() {
    var options;

    if (window.environmentIndicatorOptions) {
        // if global options have been defined use them
        options = createOptions(window.environmentIndicatorOptions);
    } else {
        // otherwise try and parse query string parameters from the script tag
        var scripts = document.getElementsByTagName('script');
        var thisScript = scripts[scripts.length - 1];
        var queryString = thisScript.src.replace(/^[^\?]+\??/,'');
        options = createOptions(parseQueryString(queryString));
    }

    // create our div
    var div = document.createElement("DIV");
    div.className = "environment-indicator";

    // create a text node for our content
    var t = document.createTextNode(options.content);
    div.appendChild(t);
    // we need to delete content so it doesn't get applied as a style below
    delete options.content;

    var onRight = options.onRight;
    // we need to delete onRight so it doesn't get applied as a style below
    delete options.onRight;

    // apply all remaining options as an inline style on our div
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            div.style[option] = options[option];
        }
    }
    document.body.appendChild(div);

    // calculate offsets, position, etc
    var sideOffset = Math.ceil(Math.sqrt(div.offsetHeight * div.offsetHeight / 2));

    if (!("left" in options || "right" in options)) {
        if (onRight) {
            div.style.right = -sideOffset + "px";
        } else {
            div.style.left =  -sideOffset + "px";
        }
    }

    var padding = Math.ceil(5 + Math.sqrt((div.offsetHeight * div.offsetHeight) - (sideOffset * sideOffset)));
    if (!("padding-left" in options)) div.style.paddingLeft = padding + "px";
    if (!("padding-right" in options)) div.style.paddingRight = div.style.paddingLeft;

    var topOffset = Math.floor(Math.sqrt(div.offsetWidth * div.offsetWidth / 2) - sideOffset);
    if (!("top" in options)) div.style.top = topOffset + "px";

    function createOptions(providedOptions) {
        // default options
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
        if (providedOptions.onRight) {
            options.transform = "rotate(45deg)";
            options["transform-origin"] = "right top";
        }
        // override default options with provided ones
        for (var optionName in providedOptions) {
            if (providedOptions.hasOwnProperty(optionName)) {
                options[optionName] = providedOptions[optionName];
            }
        }
        return options;
    }

    function parseQueryString(queryString) {
        var params = {}, queries, temp, i, l;
        queries = queryString.split("&");
        for (i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
        }
        return params;
    }

})();
