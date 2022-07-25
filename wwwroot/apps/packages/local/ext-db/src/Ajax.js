Ext.define('ExtDb.Ajax', {

    statics: {
        JWT_TOKEN_NAME: "jwt.token",

        baseUrl: "/",

        jwtToken: undefined,

        getDefaultHeaders: function () {
            const result = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };

            if (this.jwtToken) {
                result["Authorization"] = "Bearer " + this.jwtToken;
            }
            return result;
        },

        toJson: function (str) {
            try {
                return JSON.parse(str);
            }
            catch (ex) {
                return undefined;
            }
        },

        apiUrl: function (url) {
            url = url ? url : "";

            if (/^http/i.test(url)) return url; // absolute url starts with http[s]
            if (/^\/\//.test(url)) return url;  // absolute url starts with //

            let base_url = this.baseUrl;

            if (!base_url) base_url = "/";
            if (!base_url.endsWith("/")) base_url += "/";

            if (url.startsWith("/")) url = url.substr(1, url.length - 1);
            return base_url + url;
        },

        get: async function (url) {
            const options = {
                headers: this.getDefaultHeaders(),
                method: "GET"
            };
            const response = await window.fetch(this.apiUrl(url), options);

            if (!response.ok) {
                const text = await response.text();
                const json = this.toJson(text);
                if (json) {
                    const jerr = FHIRata.Util.extractError(json);
                    throw jerr;
                }
                else {
                    throw new Error("Ajax GET call failed with code " + response.status + ". Server says: " + text);
                }
            }
            return await response.json();
        },

        post: async function (url, data) {
            const options = {
                headers: this.getDefaultHeaders(),
                method: "POST"
            };
            if (data) {
                options.body = JSON.stringify(data);
            }
            
            const response = await window.fetch(this.apiUrl(url), options);

            if (!response.ok) {
                const text = await response.text();
                const json = this.toJson(text);
                if (json) {
                    const jerr = ExtDb.Error.toError(json);
                    throw jerr;
                }
                else {
                    throw new Error("Ajax POST call failed with code " + response.status + ". Server says: " + text);
                }
            }
            return await response.json();
        },

        put: async function (url, data) {
            const options = {
                headers: this.getDefaultHeaders(),
                method: "POST"
            };
            if (data) {
                options.body = JSON.stringify(data);
            }
            
            const response = await window.fetch(this.apiUrl(url), options);

            if (!response.ok) {
                const text = await response.text();
                const json = this.toJson(text);
                if (json) {
                    const jerr = FHIRata.Util.extractError(json);
                    throw jerr;
                }
                else {
                    throw new Error("Ajax PUT call failed with code " + response.status + ". Server says: " + text);
                }
            }
            return await response.json();
        },

        delete: async function (url, data) {
            const options = {
                headers: this.getDefaultHeaders(),
                method: "DELETE"
            };
            if (data) {
                options.body = JSON.stringify(data);
            }
            
            const response = await window.fetch(this.apiUrl(url), options);

            if (!response.ok) {
                const text = await response.text();
                const json = this.toJson(text);
                if (json) {
                    const jerr = FHIRata.Util.extractError(json);
                    throw jerr;
                }
                else {
                    throw new Error("Ajax DELETE call failed with code " + response.status + ". Server says: " + text);
                }
            }
            return await response.json();
        }
    }
});