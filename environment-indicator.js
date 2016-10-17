/**
 * @name environment-indicator
 * @version 1.2.0
 * @author Patrick Dwyer
 * @copyright Copyright (C) 2016 Patrick Dwyer
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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

    var onRight = options.onRight;
    delete options.onRight;

    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            div.style[option] = options[option];
        }
    }
    document.body.appendChild(div);

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