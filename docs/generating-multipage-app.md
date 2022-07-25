# Create a multipage Sencha ExtJS application using Sencha SDK and Sencha Cmd

- Download and install [Sencha Cmd](https://www.sencha.com/products/extjs/cmd-download/)

- Acquire a Sencha SDK distibutive (for example, [GPL](http://cdn.sencha.com/ext/gpl/ext-7.0.0-gpl.zip) edition)

- Unpack Sencha SDK somewere (for example, in `C:\Sencha\sdk\ext-7.0.0`)

- Create some working directory (for example, `C:\Sencha\home`)

```bash
mkdir C:\sencha\home
cd C:\sencha\home
```

- Create a subfolder for your application

```
mkdir myapp
cd myapp
```

- Initialize a workspace

```bash
sencha -sdk C:\sencha\sdk\ext-7.0.0 generate workspace ws # ws - name of your workspace
cd ws 
echo %cd% # Current directory must be C:\sencha\home\myapp\ws
```

- Create a few applications

```bash
sencha generate app --ext HomePage home-page
sencha generate app --ext LoginPage login-page
```

- Create a few packages

```bash
sencha generate package auth-pkg
```

- Run build

```bash
cd C:\sencha\home\myapp\ws\home-page
sencha app build development
sencha app build production
sencha app watch

cd C:\sencha\home\myapp\ws\login-page
sencha app build development
sencha app build production
sencha app watch

```

See also:

[Advanced Sencha Cmd](https://docs.sencha.com/cmd/guides/advanced_cmd/cmd_advanced.html)

[Workspaces in Sencha Cmd](https://docs.sencha.com/cmd/guides/workspaces.html)


