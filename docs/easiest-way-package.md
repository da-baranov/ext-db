# The easiest way to create an ExtJs package

Let's imagine that your project has the following structure:

```
ws
  |- ext
  |- apps
    |- home-app
    |- login-app
```

```bash
$ sencha -sdk C:\sencha\ext-7.0.0 generate workspace ws
cd ws
$ sencha generate app --ext HomePage home-page
$ sencha generate app --ext LoginPage login-page
```

To create some reusable package in recommended way, open the terminal and type the following commands:

```bash
$ cd ws
$ sencha generate package test
```

Result:

```
ws
  |- ext
  |- apps
    |- home-page
    |- login-page
  |- packages
    |- local
      |- test                   <- package content
        |- package.json         <- important! package manifest
        |- src
        |- ...
```
Next, you have to modify the package manifest `package.json` file and set a lot of parameters. 
That's boring, and most probably your package won't compile, or will not work properly with both toolkits.

For example, if you design a class that extends, say, `Ext.container.Container`, it will not compile, as the 
our newly generated package requires some references to folders of `classic` toolkit.

Sencha Cmd compiler is also pretty buggy, and often it doesn't allow to locate the problem but produces hundreds of lines of useless Java exception stack traces.

To simplify the process, let's perform some copypasting. 
Just navigate to the Sencha SDK packages folder (on my laptop it's C:\sencha\ext-7.0.0\packages),
and copy **content** of whatever Sencha package to your package directory.

I would recommend cloning the `ux` package, as its `package.json` manifest contains a few nice build targets for both toolkits (classic and modern).

Perform cleanup of package subdirectories by deleting unnecessary files from the `ux` package.

Finally, don't forget to modify package manifest `package.json`, and rewrite existing properties with your own
(eg. package name, package description, package namespace, package version, and so on).

Run build:

```bash
$ sencha package build development
# sencha package build production
```
