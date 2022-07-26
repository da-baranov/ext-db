# How can I use async/await functions with ExtJS?

That's pretty easy. You can combine promises, special function declarations and async handlers with a confidence.

```javascript
Ext.define('My.Panel', {
    requires: ['My.modal.Window'],
	extend: 'Ext.panel.Panel',
	alias: 'widget.mypanel',

	// Use async/await
	doRequestAsync: async function() {
		const response = await window.fetch("/test");
		const json = await response.json();
		return json;
	};

	// Use promises
	showModalAsync: function() {
		return new Promise(function(resolve, reject) {
			const window = Ext.create('My.modal.Window');
			window.on("ok", function() {
			    window.close();
				resolve("ok");
			});
		});
	};

	tbar: [
		{
			text: 'Do request',
			// Async button click handler
			handler: async function(sender) {
			    const panel = sender.up("panel");
				const data = await panel.doRequestAsync();
			}
		},
		{
			text: 'Show modal',
			// Async button click handler
			handler: async function(sender) {
				const panel = sender.up("panel");
				const mr = await panel.showModalAsync();
			}
		}
	]
});
```