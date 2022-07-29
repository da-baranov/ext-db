# Generic exception handling in ExtJS

In languages such as Java or C#, an exception is always an instance or subclass of the Exception class:

```java
throw new Exception("Exception"); // ok
throw new String("Exception");    // wrong
```

In Javascript (and also in C++) the runtime can throw whatever:

```javascript
throw("Exception");       // ok
throw(10);	              // ok
throw new Error("Error"); // ok
```

In addition in ExtJS, exceptions are also thrown by the ExtJS special class (Ext.Error), and by the classes that perform I/O operations (Ext.data.operation.Operation, Ext.data.proxy.Proxy).

To simplify exception handling in ExtJS, I designed a special utility class - [ExtDb.Error](https://github.com/da-baranov/ext-db/blob/main/wwwroot/apps/packages/local/ext-db/src/Error.js), which is able to wrap all kinds of exceptions listed above to 
a javascript [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object. Some examples of usage:

```javascript

try {
	throw("Exception");
}
catch (e) {
	const error = ExtDb.Error.toError(e); // now error is an instance of javascript Error
	alert(error.message + " " + error.stack);
}


try {
	Ext.raise("Exception");
}
catch (e) {
	const error = ExtDb.Error.toError(e); // the same
	alert(error.message + " " + error.stack);
}


try {
	throw new Error("Exception");
}
catch (e) {
	ExtDb.Error.errorMessageBox(e);
}

```



