# The easiest way to create an ExtJs package

Lets imagine that your project has the following structure:

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

To create some reusable package in recommended way, open terminal and type the following commands:

```bash
$ cd ws
$ sencha generate package test
```

Result:

```
ws
  |- ext
  |- apps
    |- home-app
    |- login-app
  |- packages
    |- local
      |- test                   <- package content
        |- build.json
        |- src
        |- ...
```
Next, you have to modify the package manifest `build.json` file and set a lot of parameters. That's boring, and most probably your package 
won't compile, or will not work with both toolkits.

To simplify the process, just navigate to the Sencha SDK folder (on my laptop it's C:\sencha\ext-7.0.0\packages),
and copy content of whatever Sencha package to your package directory.

I would recommend clone the `ux` package, as its `build.xml` contains a few build targets for both toolkits (classic and modern).

Perform cleanup of package subdirectories by deleting unnesessary files from the `ux` package.

Finally modify package build.xml, and run build:

```bash
$ sencha package build development
# sencha package build production
```

Enjoy!
