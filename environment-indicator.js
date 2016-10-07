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

    function createOptions(providedOptions) {
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
            "text-align": "center",
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