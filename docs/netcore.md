﻿# Integrating ExtJS and .NET Core web application

- [Download and install](generating-multipage-app.md) Sencha Cmd and Sencha ExtJS SDK
- Create a basic .NET Core MVC or WebApi project using Visual Studio or Visual Studio code
- Ensure that the project has a `wwwroot` folder, and also that Razor Pages or Razor Views (or both) are enabled.
  For example, I use Razor Pages, and in my Program.cs file I see the following lines:

```c-sharp
builder.Services.AddRazorPages();           // enables Razor MVVM
builder.Services.AddControllersWithViews(); // if you prefer classic MVC
...
app.UseDefaultFiles();                      // enables access to the index.html
app.UseStaticFiles();                       // enables access to staic content within the wwwroot folder
app.MapRazorPages();                        // enables requests to dynamic Razor pages
app.MapControllers();	                    // enables requests to MVC and WebApi controllers
```

- Open terminal or command prompt, and navigate to the `wwwroot` folder. Execute the following commands to create a simple single-page ExtJS application:

```bash
cd wwwroot
sencha -sdk C:\sencha\sdk\ext-7.0.0 generate app MyDemo ./demo
# the -sdk options tells the generator to use a local cloned version of Sencha ExtJS SDK
# MyApp is a name of your application
# ./demo - relative path the ExtJS application should be created in
```

- At this point, your project directory tree should look like
```
AspNetCoreApp
  |-wwwroot
    |-demo
      |-app.js
      |-app.json         <-- Application configuration manifest
      |-bootstrap.css
      |-bootstrap.js
      |-classic.json
      |-modern.json
      |-index.html       <-- Single page web application (SPA) entry point
      |-...
      |-app
        |-model
        |-store
        |-view
        |-Application.js
      |-build
      |-classic
      |-ext
      |-modern
      |-resources
  |-Pages
    |-Test.cshtml        <-- We will use that instead of index.html
  |-Controllers          <-- Optional
  |-Views                <-- Optional
```

- Navigate to the wwwroot/demo folder and execute the following command:

```bash
sencha app build development
```

- Next, you have to modify the Test.cshtml page. Simply copy here basic markup from the index.html file which has been generated by Sencha Cmd:

```html
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">

    <title>MyDemo</title>

    <script type="text/javascript">
        var Ext = Ext || {}; // Ext namespace won't be defined yet...

        // This function is called by the Microloader after it has performed basic
        // device detection. The results are provided in the "tags" object. You can
        // use these tags here or even add custom tags. These can be used by platform
        // filters in your manifest or by platformConfig expressions in your app.
        //
        Ext.beforeLoad = function (tags) {
            var s = location.search,  // the query string (ex "?foo=1&bar")
                profile;

            // For testing look for "?classic" or "?modern" in the URL to override
            // device detection default.
            //
            if (s.match(/\bclassic\b/)) {
                profile = 'classic';
            }
            else if (s.match(/\bmodern\b/)) {
                profile = 'modern';
            }
            else {
                profile = tags.desktop ? 'classic' : 'modern';
                //profile = tags.phone ? 'modern' : 'classic';
            }

            Ext.manifest = profile; // this name must match a build profile name
        };
    </script>

    <script id="microloader" data-app="f54f4456-d9ff-4321-b6b0-7f8cdee59cda" type="text/javascript" src="bootstrap.js"></script>

</head>
<body></body>
</html>
```

- Let's take a look at the `script[id=microloader]` tag. It executes so called ExtJS `microloader` from the `bootstrap.js` file.
  But if you run your application and open your browser at `http://localhost:1234/Test`, you'll see nothing. 
  That's because root directores do not match. The loader expects the base URL to be '/', but ours is '/Test'. 

  Learning ExtJS you should actively use browser debugging tools that allow you to locate such a problems with relative addresses in ExtJS.

- Let's slightly modify the ExtJS `microloader` url:
```html
<script id="microloader" data-app="f54f4456-d9ff-4321-b6b0-7f8cdee59cda" type="text/javascript" src="~/demo/bootstrap.js"></script>
```

- Once again, the app isn't working as the `microloader` wants you page to have root `/` URL and not `/Test`

- How to solve such a problem? There are two approaches:

## Method 1

In your Test.cshtml markup, insert the `base` element and change the application base URL:

```html
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">

    <title>MyDemo</title>
    <base href="~/demo/" />  <!-- HERE -->
    ...
    <script id="microloader" data-app="f54f4456-d9ff-4321-b6b0-7f8cdee59cda" type="text/javascript" src="bootstrap.js"></script>
```

## Method 2

* Open the app.json manifest
* Find the `indexHtmlPath` param and change value from `index.html` to `../index.html`. If your Sencha app resides deeper, just add one more navigational path, for example - `../../index.html`
* Execute the following batch which performs **full rebuild of Sencha ExtJS app manifests** (classic.json and modern.json) because of changed value of 
 the `indexHtmlPath` property:

```
cd wwwroot/demo
sencha app build development
```

* Modify your launcher script as follows (Test.cshtml). Later you can replace hardcoded base URLs with methods of the `@Url` helper:
* Modify your launcher script as follows (Test.cshtml). Later you can replace hardcoded base URLs with methods of the `@Url` helper:

```html
    <!--base href="~/demo/" / -->
    <script type="text/javascript">
        var Ext = Ext || {};

        Ext.beforeLoad = function (tags) {
            var s = location.search, profile;

            if (s.match(/\bclassic\b/)) {
                profile = 'demo/classic';         // HERE
            }
            else if (s.match(/\bmodern\b/)) {
                profile = 'demo/modern';          // HERE
            }
            else {
                profile = tags.desktop ? 
                    'demo/classic' :              // HERE
                    'demo/modern';                // HERE
            }

            Ext.manifest = profile;
        };
    </script>

    <script id="microloader" 
            data-app="f54f4456-d9ff-4321-b6b0-7f8cdee59cda" 
            type="text/javascript" 
            src="~/demo/bootstrap.js"             // AND HERE
    ></script>
```

5. Run debugger and navigate the browser to /Test