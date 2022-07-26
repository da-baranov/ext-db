# Welcome (splash) screen with ExtJS and .NET

ExtJS is not lightweight, and first initialization of an ExtJS application can take up to 10 seconds, 
so it is a good idea to show a user something to let him know that your site is loading.

Technically a splashscreen can be easily coded with an initially visible HTML element 
that has to be removed from HTML DOM on ExtJS application start:

`Pages/Layouts/_Layout.cshtml`

```html
<head>
...
    <style>
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
 
    #loading-overlay {
        z-index: -1000;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
 
    #loading-overlay-box {
        padding: 50px;            
        border: 1px dotted #CCCCCC;
        font-size: 11px;
        font-family: Tahoma, Arial, Verdana;
    }
    </style>
    ...
</head>
<body>
    <div id="loading-overlay">
        <div id="loading-overlay-box">
            <div><img src="~/images/logo.png" /></div>
            <div><b><i class="fas fa-spinner fa-spin"></i> Loading, please wait...</b></div>
        </div>
    </div>
    <script async="async" id="microloader" src="~/app/bootstrap.js"></script>
</body>

```

`/wwwroot/app/app.js`:

```javascript
Ext.application({
    extend: 'MyApp.Application',
    requires: [
        'MyApp.view.Viewport',
    ],
    name: 'MyApp',
    mainView: 'MyApp.view.Viewport',

    launch: function () {
        ...
        const el = document.getElementById("loading-overlay");
        if (el) el.remove();
        ...
    }
});

```