Ext.define("ExtDb.AsyncLoader", {
    statics: {

        load: function (url) {
            return new Promise(function (resolve, reject) {
                let scriptElement = document.querySelector("script[src='" + url + "']");
                if (!scriptElement) {
                    scriptElement = document.createElement("script");
                    scriptElement.onload = function () {
                        resolve();
                    };
                    scriptElement.onerror = function () {
                        reject();
                    }
                    scriptElement.setAttribute("src", url);
                    document.body.appendChild(scriptElement);
                } else {
                    resolve();
                }
            });
        },

        loadCss: function (url) {
            return new Promise(function (resolve, reject) {
                let linkElement = document.querySelector("link[href='" + url + "']");
                if (!linkElement) {

                    linkElement = document.createElement("link");
                    
                    linkElement.onload = function () {
                        resolve();
                    };

                    linkElement.onerror = function () {
                        reject();
                    }
                    linkElement.setAttribute("rel", "stylesheet");
                    linkElement.setAttribute("href", url);

                    document.body.appendChild(linkElement);
                } else {
                    resolve();
                }
            });
        },

        loadAll: function (urls) {
            let arr = [];
            if (typeof urls === "string") {
                if (/\.js$/i.test(urls)) {
                    arr.push(this.load(urls));
                } else if (/\.css$/i.test(urls)) {
                    arr.push(this.loadCss(urls));
                }
            }
            else if (Array.isArray(urls)) {
                for (let i = 0; i < urls.length; i++) {
                    const url = urls[i];
                    if (/\.js$/i.test(url)) {
                        arr.push(this.load(url));
                    } else if (/\.css$/i.test(url)) {
                        arr.push(this.loadCss(url));
                    }
                }
            }
            return Promise.all(arr);
        }
    }
});