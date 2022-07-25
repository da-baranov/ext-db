Ext.define("ExtDb.FontAwesome", {
    requires: [
        "ExtDb.AsyncLoader"
    ],

    statics: {
        _faUrl: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/",

        version: "6.1.1",

        enable: function () {
            const baseUrl = this._faUrl + this.version;
            const urls = [
                `${baseUrl}/css/all.min.css`,
                `${baseUrl}/js/all.min.js`                            
            ];
            ExtDb.AsyncLoader.loadAll(urls)
                .then(function () { })
                .catch(function (err) {
                    alert(err);
                });
        }    
    }
});