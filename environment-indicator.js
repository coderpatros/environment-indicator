(function() {
    var options;

    if (window.environmentIndicatorOptions) {
        options = createOptions(window.environmentIndicatorOptions);
    } else {
        var scripts = document.getElementsByTagName('script');
        var thisScript = scripts[scripts.length - 1];
        var queryString = thisScript.src.replace(/^[^\?]+\??/,'');
        options = createOptions(parseQueryString(queryString));
    }

    var div = document.createElement("DIV");
    div.className = "environment-indicator";

    var t = document.createTextNode(options.content);
    div.appendChild(t);
    delete options.content;

    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            div.style[option] = options[option];
        }
    }
    document.body.appendChild(div);

    var leftOffset = Math.ceil(Math.sqrt(div.offsetHeight * div.offsetHeight / 2));

    if (!("left" in options)) div.style.left =  -leftOffset + "px";

    var padding = Math.ceil(5 + Math.sqrt((div.offsetHeight * div.offsetHeight) - (leftOffset * leftOffset)));
    if (!("padding-left" in options)) div.style.paddingLeft = padding + "px";
    if (!("padding-right" in options)) div.style.paddingRight = div.style.paddingLeft;

    var topOffset = Math.floor(Math.sqrt(div.offsetWidth * div.offsetWidth / 2) - leftOffset);
    if (!("top" in options)) div.style.top = topOffset + "px";

    function createOptions(providedOptions) {
        var options = {
            content: "environment indicator",
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