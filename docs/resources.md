# Shared resources in ExtJS (images, JSONs, XMLs)

If you want to share a resource, it should be put in the `resources` folder of your application as follows:

```
home-app
  |- app
    |- Application.js
    |- model
    |- store
    |- view
  |- resources              <- HERE
    |- menu.json
    |- data.xml
    |- logo.png
```

**Do not forget** to execute the `sencha app build development` (or `production`) command.

After successful build, the resource URL will be accessible via the poorly documented `Ext.getResourcePath` function:

```javascript
{
    xtype: "treepanel",
    title: "Menu",
    store: {
        type: "tree",
        proxy: {
            type: 'ajax',
            url: Ext.getResourcePath('menu.json'),
            reader: {
                type: 'json',
                rootProperty: 'children'
            }
        },
        root: {
            expanded: true,
            text: "Examples"
        }
    }
}

```

See [Resource Management](https://docs.sencha.com/cmd/7.2.0/guides/resource_management.html)