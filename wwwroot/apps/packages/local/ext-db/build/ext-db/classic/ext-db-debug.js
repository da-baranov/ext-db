var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = false;
$jscomp.ASSUME_NO_NATIVE_MAP = false;
$jscomp.ASSUME_NO_NATIVE_SET = false;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || typeof Object.defineProperties == 'function' ? Object.defineProperty : function(target, property, descriptor) {
  descriptor = descriptor;
  if (target == Array.prototype || target == Object.prototype) {
    return;
  }
  target[property] = descriptor.value;
};
$jscomp.getGlobal = function(maybeGlobal) {
  return typeof window != 'undefined' && window === maybeGlobal ? maybeGlobal : typeof global != 'undefined' && global != null ? global : maybeGlobal;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(target, polyfill, fromLang, toLang) {
  if (!polyfill) {
    return;
  }
  var obj = $jscomp.global;
  var split = target.split('.');
  for (var i = 0; i < split.length - 1; i++) {
    var key = split[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  var property = split[split.length - 1];
  var orig = obj[property];
  var impl = polyfill(orig);
  if (impl == orig || impl == null) {
    return;
  }
  $jscomp.defineProperty(obj, property, {configurable:true, writable:true, value:impl});
};
$jscomp.polyfill('Array.prototype.copyWithin', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, start, opt_end) {
    var len = this.length;
    target = Number(target);
    start = Number(start);
    opt_end = Number(opt_end != null ? opt_end : len);
    if (target < start) {
      opt_end = Math.min(opt_end, len);
      while (start < opt_end) {
        if (start in this) {
          this[target++] = this[start++];
        } else {
          delete this[target++];
          start++;
        }
      }
    } else {
      opt_end = Math.min(opt_end, len + start - target);
      target += opt_end - start;
      while (opt_end > start) {
        if (--opt_end in this) {
          this[--target] = this[opt_end];
        } else {
          delete this[target];
        }
      }
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_';
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  if (!$jscomp.global['Symbol']) {
    $jscomp.global['Symbol'] = $jscomp.Symbol;
  }
};
$jscomp.Symbol = function() {
  var counter = 0;
  function Symbol(opt_description) {
    return $jscomp.SYMBOL_PREFIX + (opt_description || '') + counter++;
  }
  return Symbol;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var symbolIterator = $jscomp.global['Symbol'].iterator;
  if (!symbolIterator) {
    symbolIterator = $jscomp.global['Symbol'].iterator = $jscomp.global['Symbol']('iterator');
  }
  if (typeof Array.prototype[symbolIterator] != 'function') {
    $jscomp.defineProperty(Array.prototype, symbolIterator, {configurable:true, writable:true, value:function() {
      return $jscomp.arrayIterator(this);
    }});
  }
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(array) {
  var index = 0;
  return $jscomp.iteratorPrototype(function() {
    if (index < array.length) {
      return {done:false, value:array[index++]};
    } else {
      return {done:true};
    }
  });
};
$jscomp.iteratorPrototype = function(next) {
  $jscomp.initSymbolIterator();
  var iterator = {next:next};
  iterator[$jscomp.global['Symbol'].iterator] = function() {
    return this;
  };
  return iterator;
};
$jscomp.iteratorFromArray = function(array, transform) {
  $jscomp.initSymbolIterator();
  if (array instanceof String) {
    array = array + '';
  }
  var i = 0;
  var iter = {next:function() {
    if (i < array.length) {
      var index = i++;
      return {value:transform(index, array[index]), done:false};
    }
    iter.next = function() {
      return {done:true, value:void 0};
    };
    return iter.next();
  }};
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  iter[Symbol.iterator] = function() {
    return iter;
  };
  return iter;
};
$jscomp.polyfill('Array.prototype.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i, v) {
      return [i, v];
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.fill', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(value, opt_start, opt_end) {
    var length = this.length || 0;
    if (opt_start < 0) {
      opt_start = Math.max(0, length + opt_start);
    }
    if (opt_end == null || opt_end > length) {
      opt_end = length;
    }
    opt_end = Number(opt_end);
    if (opt_end < 0) {
      opt_end = Math.max(0, length + opt_end);
    }
    for (var i = Number(opt_start || 0); i < opt_end; i++) {
      this[i] = value;
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.findInternal = function(array, callback, thisArg) {
  if (array instanceof String) {
    array = String(array);
  }
  var len = array.length;
  for (var i = 0; i < len; i++) {
    var value = array[i];
    if (callback.call(thisArg, value, i, array)) {
      return {i:i, v:value};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill('Array.prototype.find', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).v;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.findIndex', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).i;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.from', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(arrayLike, opt_mapFn, opt_thisArg) {
    $jscomp.initSymbolIterator();
    opt_mapFn = opt_mapFn != null ? opt_mapFn : function(x) {
      return x;
    };
    var result = [];
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var iteratorFunction = arrayLike[Symbol.iterator];
    if (typeof iteratorFunction == 'function') {
      arrayLike = iteratorFunction.call(arrayLike);
      var next;
      var k = 0;
      while (!(next = arrayLike.next()).done) {
        result.push(opt_mapFn.call(opt_thisArg, next.value, k++));
      }
    } else {
      var len = arrayLike.length;
      for (var i = 0; i < len; i++) {
        result.push(opt_mapFn.call(opt_thisArg, arrayLike[i], i));
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.is', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(left, right) {
    if (left === right) {
      return left !== 0 || 1 / left === 1 / right;
    } else {
      return left !== left && right !== right;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var includes = function(searchElement, opt_fromIndex) {
    var array = this;
    if (array instanceof String) {
      array = String(array);
    }
    var len = array.length;
    var i = opt_fromIndex || 0;
    if (i < 0) {
      i = Math.max(i + len, 0);
    }
    for (; i < len; i++) {
      var element = array[i];
      if (element === searchElement || Object.is(element, searchElement)) {
        return true;
      }
    }
    return false;
  };
  return includes;
}, 'es7', 'es3');
$jscomp.polyfill('Array.prototype.keys', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i) {
      return i;
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.of', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    return Array.from(arguments);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.values', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(k, v) {
      return v;
    });
  };
  return polyfill;
}, 'es8', 'es3');
$jscomp.makeIterator = function(iterable) {
  $jscomp.initSymbolIterator();
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var iteratorFunction = iterable[Symbol.iterator];
  return iteratorFunction ? iteratorFunction.call(iterable) : $jscomp.arrayIterator(iterable);
};
$jscomp.FORCE_POLYFILL_PROMISE = false;
$jscomp.polyfill('Promise', function(NativePromise) {
  if (NativePromise && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return NativePromise;
  }
  function AsyncExecutor() {
    this.batch_ = null;
  }
  AsyncExecutor.prototype.asyncExecute = function(f) {
    if (this.batch_ == null) {
      this.batch_ = [];
      this.asyncExecuteBatch_();
    }
    this.batch_.push(f);
    return this;
  };
  AsyncExecutor.prototype.asyncExecuteBatch_ = function() {
    var self = this;
    this.asyncExecuteFunction(function() {
      self.executeBatch_();
    });
  };
  var nativeSetTimeout = $jscomp.global['setTimeout'];
  AsyncExecutor.prototype.asyncExecuteFunction = function(f) {
    nativeSetTimeout(f, 0);
  };
  AsyncExecutor.prototype.executeBatch_ = function() {
    while (this.batch_ && this.batch_.length) {
      var executingBatch = this.batch_;
      this.batch_ = [];
      for (var i = 0; i < executingBatch.length; ++i) {
        var f = executingBatch[i];
        executingBatch[i] = null;
        try {
          f();
        } catch (error) {
          this.asyncThrow_(error);
        }
      }
    }
    this.batch_ = null;
  };
  AsyncExecutor.prototype.asyncThrow_ = function(exception) {
    this.asyncExecuteFunction(function() {
      throw exception;
    });
  };
  var PromiseState = {PENDING:0, FULFILLED:1, REJECTED:2};
  var PolyfillPromise = function(executor) {
    this.state_ = PromiseState.PENDING;
    this.result_ = undefined;
    this.onSettledCallbacks_ = [];
    var resolveAndReject = this.createResolveAndReject_();
    try {
      executor(resolveAndReject.resolve, resolveAndReject.reject);
    } catch (e) {
      resolveAndReject.reject(e);
    }
  };
  PolyfillPromise.prototype.createResolveAndReject_ = function() {
    var thisPromise = this;
    var alreadyCalled = false;
    function firstCallWins(method) {
      return function(x) {
        if (!alreadyCalled) {
          alreadyCalled = true;
          method.call(thisPromise, x);
        }
      };
    }
    return {resolve:firstCallWins(this.resolveTo_), reject:firstCallWins(this.reject_)};
  };
  PolyfillPromise.prototype.resolveTo_ = function(value) {
    if (value === this) {
      this.reject_(new TypeError('A Promise cannot resolve to itself'));
    } else {
      if (value instanceof PolyfillPromise) {
        this.settleSameAsPromise_(value);
      } else {
        if (isObject(value)) {
          this.resolveToNonPromiseObj_(value);
        } else {
          this.fulfill_(value);
        }
      }
    }
  };
  PolyfillPromise.prototype.resolveToNonPromiseObj_ = function(obj) {
    var thenMethod = undefined;
    try {
      thenMethod = obj.then;
    } catch (error) {
      this.reject_(error);
      return;
    }
    if (typeof thenMethod == 'function') {
      this.settleSameAsThenable_(thenMethod, obj);
    } else {
      this.fulfill_(obj);
    }
  };
  function isObject(value) {
    switch(typeof value) {
      case 'object':
        return value != null;
      case 'function':
        return true;
      default:
        return false;
    }
  }
  PolyfillPromise.prototype.reject_ = function(reason) {
    this.settle_(PromiseState.REJECTED, reason);
  };
  PolyfillPromise.prototype.fulfill_ = function(value) {
    this.settle_(PromiseState.FULFILLED, value);
  };
  PolyfillPromise.prototype.settle_ = function(settledState, valueOrReason) {
    if (this.state_ != PromiseState.PENDING) {
      throw new Error('Cannot settle(' + settledState + ', ' + valueOrReason + '): Promise already settled in state' + this.state_);
    }
    this.state_ = settledState;
    this.result_ = valueOrReason;
    this.executeOnSettledCallbacks_();
  };
  PolyfillPromise.prototype.executeOnSettledCallbacks_ = function() {
    if (this.onSettledCallbacks_ != null) {
      for (var i = 0; i < this.onSettledCallbacks_.length; ++i) {
        asyncExecutor.asyncExecute(this.onSettledCallbacks_[i]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var asyncExecutor = new AsyncExecutor;
  PolyfillPromise.prototype.settleSameAsPromise_ = function(promise) {
    var methods = this.createResolveAndReject_();
    promise.callWhenSettled_(methods.resolve, methods.reject);
  };
  PolyfillPromise.prototype.settleSameAsThenable_ = function(thenMethod, thenable) {
    var methods = this.createResolveAndReject_();
    try {
      thenMethod.call(thenable, methods.resolve, methods.reject);
    } catch (error) {
      methods.reject(error);
    }
  };
  PolyfillPromise.prototype.then = function(onFulfilled, onRejected) {
    var resolveChild;
    var rejectChild;
    var childPromise = new PolyfillPromise(function(resolve, reject) {
      resolveChild = resolve;
      rejectChild = reject;
    });
    function createCallback(paramF, defaultF) {
      if (typeof paramF == 'function') {
        return function(x) {
          try {
            resolveChild(paramF(x));
          } catch (error) {
            rejectChild(error);
          }
        };
      } else {
        return defaultF;
      }
    }
    this.callWhenSettled_(createCallback(onFulfilled, resolveChild), createCallback(onRejected, rejectChild));
    return childPromise;
  };
  PolyfillPromise.prototype['catch'] = function(onRejected) {
    return this.then(undefined, onRejected);
  };
  PolyfillPromise.prototype.callWhenSettled_ = function(onFulfilled, onRejected) {
    var thisPromise = this;
    function callback() {
      switch(thisPromise.state_) {
        case PromiseState.FULFILLED:
          onFulfilled(thisPromise.result_);
          break;
        case PromiseState.REJECTED:
          onRejected(thisPromise.result_);
          break;
        default:
          throw new Error('Unexpected state: ' + thisPromise.state_);
      }
    }
    if (this.onSettledCallbacks_ == null) {
      asyncExecutor.asyncExecute(callback);
    } else {
      this.onSettledCallbacks_.push(callback);
    }
  };
  function resolvingPromise(opt_value) {
    if (opt_value instanceof PolyfillPromise) {
      return opt_value;
    } else {
      return new PolyfillPromise(function(resolve, reject) {
        resolve(opt_value);
      });
    }
  }
  PolyfillPromise['resolve'] = resolvingPromise;
  PolyfillPromise['reject'] = function(opt_reason) {
    return new PolyfillPromise(function(resolve, reject) {
      reject(opt_reason);
    });
  };
  PolyfillPromise['race'] = function(thenablesOrValues) {
    return new PolyfillPromise(function(resolve, reject) {
      var iterator = $jscomp.makeIterator(thenablesOrValues);
      for (var iterRec = iterator.next(); !iterRec.done; iterRec = iterator.next()) {
        resolvingPromise(iterRec.value).callWhenSettled_(resolve, reject);
      }
    });
  };
  PolyfillPromise['all'] = function(thenablesOrValues) {
    var iterator = $jscomp.makeIterator(thenablesOrValues);
    var iterRec = iterator.next();
    if (iterRec.done) {
      return resolvingPromise([]);
    } else {
      return new PolyfillPromise(function(resolveAll, rejectAll) {
        var resultsArray = [];
        var unresolvedCount = 0;
        function onFulfilled(i) {
          return function(ithResult) {
            resultsArray[i] = ithResult;
            unresolvedCount--;
            if (unresolvedCount == 0) {
              resolveAll(resultsArray);
            }
          };
        }
        do {
          resultsArray.push(undefined);
          unresolvedCount++;
          resolvingPromise(iterRec.value).callWhenSettled_(onFulfilled(resultsArray.length - 1), rejectAll);
          iterRec = iterator.next();
        } while (!iterRec.done);
      });
    }
  };
  return PolyfillPromise;
}, 'es6', 'es3');
$jscomp.polyfill('Promise.prototype.finally', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(onFinally) {
    return this.then(function(value) {
      var promise = Promise.resolve(onFinally());
      return promise.then(function() {
        return value;
      });
    }, function(reason) {
      var promise = Promise.resolve(onFinally());
      return promise.then(function() {
        throw reason;
      });
    });
  };
  return polyfill;
}, 'es9', 'es3');
$jscomp.underscoreProtoCanBeSet = function() {
  var x = {a:true};
  var y = {};
  try {
    y.__proto__ = x;
    return y.a;
  } catch (e) {
  }
  return false;
};
$jscomp.setPrototypeOf = typeof Object.setPrototypeOf == 'function' ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(target, proto) {
  target.__proto__ = proto;
  if (target.__proto__ !== proto) {
    throw new TypeError(target + ' is not extensible');
  }
  return target;
} : null;
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(result) {
  if (result instanceof Object) {
    return;
  }
  throw new TypeError('Iterator result ' + result + ' is not an object');
};
$jscomp.generator.Context = function() {
  this.isRunning_ = false;
  this.yieldAllIterator_ = null;
  this.yieldResult = undefined;
  this.nextAddress = 1;
  this.catchAddress_ = 0;
  this.finallyAddress_ = 0;
  this.abruptCompletion_ = null;
  this.finallyContexts_ = null;
};
$jscomp.generator.Context.prototype.start_ = function() {
  if (this.isRunning_) {
    throw new TypeError('Generator is already running');
  }
  this.isRunning_ = true;
};
$jscomp.generator.Context.prototype.stop_ = function() {
  this.isRunning_ = false;
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
$jscomp.generator.Context.prototype.next_ = function(value) {
  this.yieldResult = value;
};
$jscomp.generator.Context.prototype.throw_ = function(e) {
  this.abruptCompletion_ = {exception:e, isException:true};
  this.jumpToErrorHandler_();
};
$jscomp.generator.Context.prototype['return'] = function(value) {
  this.abruptCompletion_ = {'return':value};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(nextAddress) {
  this.abruptCompletion_ = {jumpTo:nextAddress};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.yield = function(value, resumeAddress) {
  this.nextAddress = resumeAddress;
  return {value:value};
};
$jscomp.generator.Context.prototype.yieldAll = function(iterable, resumeAddress) {
  var iterator = $jscomp.makeIterator(iterable);
  var result = iterator.next();
  $jscomp.generator.ensureIteratorResultIsObject_(result);
  if (result.done) {
    this.yieldResult = result.value;
    this.nextAddress = resumeAddress;
    return;
  }
  this.yieldAllIterator_ = iterator;
  return this.yield(result.value, resumeAddress);
};
$jscomp.generator.Context.prototype.jumpTo = function(nextAddress) {
  this.nextAddress = nextAddress;
};
$jscomp.generator.Context.prototype.jumpToEnd = function() {
  this.nextAddress = 0;
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(catchAddress, finallyAddress) {
  this.catchAddress_ = catchAddress;
  if (finallyAddress != undefined) {
    this.finallyAddress_ = finallyAddress;
  }
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(finallyAddress) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = finallyAddress || 0;
};
$jscomp.generator.Context.prototype.leaveTryBlock = function(nextAddress, catchAddress) {
  this.nextAddress = nextAddress;
  this.catchAddress_ = catchAddress || 0;
};
$jscomp.generator.Context.prototype.enterCatchBlock = function(nextCatchBlockAddress) {
  this.catchAddress_ = nextCatchBlockAddress || 0;
  var exception = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return exception;
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(nextCatchAddress, nextFinallyAddress, finallyDepth) {
  if (!finallyDepth) {
    this.finallyContexts_ = [this.abruptCompletion_];
  } else {
    this.finallyContexts_[finallyDepth] = this.abruptCompletion_;
  }
  this.catchAddress_ = nextCatchAddress || 0;
  this.finallyAddress_ = nextFinallyAddress || 0;
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(nextAddress, finallyDepth) {
  var preservedContext = this.finallyContexts_.splice(finallyDepth || 0)[0];
  var abruptCompletion = this.abruptCompletion_ = this.abruptCompletion_ || preservedContext;
  if (abruptCompletion) {
    if (abruptCompletion.isException) {
      return this.jumpToErrorHandler_();
    }
    if (abruptCompletion.jumpTo != undefined && this.finallyAddress_ < abruptCompletion.jumpTo) {
      this.nextAddress = abruptCompletion.jumpTo;
      this.abruptCompletion_ = null;
    } else {
      this.nextAddress = this.finallyAddress_;
    }
  } else {
    this.nextAddress = nextAddress;
  }
};
$jscomp.generator.Context.prototype.forIn = function(object) {
  return new $jscomp.generator.Context.PropertyIterator(object);
};
$jscomp.generator.Context.PropertyIterator = function(object) {
  this.object_ = object;
  this.properties_ = [];
  for (var property in object) {
    this.properties_.push(property);
  }
  this.properties_.reverse();
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() {
  while (this.properties_.length > 0) {
    var property = this.properties_.pop();
    if (property in this.object_) {
      return property;
    }
  }
  return null;
};
$jscomp.generator.Engine_ = function(program) {
  this.context_ = new $jscomp.generator.Context;
  this.program_ = program;
};
$jscomp.generator.Engine_.prototype.next_ = function(value) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, value, this.context_.next_);
  }
  this.context_.next_(value);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.return_ = function(value) {
  this.context_.start_();
  var yieldAllIterator = this.context_.yieldAllIterator_;
  if (yieldAllIterator) {
    var returnFunction = 'return' in yieldAllIterator ? yieldAllIterator['return'] : function(v) {
      return {value:v, done:true};
    };
    return this.yieldAllStep_(returnFunction, value, this.context_['return']);
  }
  this.context_['return'](value);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.throw_ = function(exception) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_['throw'], exception, this.context_.next_);
  }
  this.context_.throw_(exception);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(action, value, nextAction) {
  try {
    var result = action.call(this.context_.yieldAllIterator_, value);
    $jscomp.generator.ensureIteratorResultIsObject_(result);
    if (!result.done) {
      this.context_.stop_();
      return result;
    }
    var resultValue = result.value;
  } catch (e) {
    this.context_.yieldAllIterator_ = null;
    this.context_.throw_(e);
    return this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  nextAction.call(this.context_, resultValue);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
  while (this.context_.nextAddress) {
    try {
      var yieldValue = this.program_(this.context_);
      if (yieldValue) {
        this.context_.stop_();
        return {value:yieldValue.value, done:false};
      }
    } catch (e) {
      this.context_.yieldResult = undefined;
      this.context_.throw_(e);
    }
  }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    var abruptCompletion = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (abruptCompletion.isException) {
      throw abruptCompletion.exception;
    }
    return {value:abruptCompletion['return'], done:true};
  }
  return {value:undefined, done:true};
};
$jscomp.generator.Generator_ = function(engine) {
  this.next = function(opt_value) {
    return engine.next_(opt_value);
  };
  this['throw'] = function(exception) {
    return engine.throw_(exception);
  };
  this['return'] = function(value) {
    return engine.return_(value);
  };
  $jscomp.initSymbolIterator();
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  this[Symbol.iterator] = function() {
    return this;
  };
};
$jscomp.generator.createGenerator = function(generator, program) {
  var result = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(program));
  if ($jscomp.setPrototypeOf) {
    $jscomp.setPrototypeOf(result, generator.prototype);
  }
  return result;
};
$jscomp.asyncExecutePromiseGenerator = function(generator) {
  function passValueToGenerator(value) {
    return generator.next(value);
  }
  function passErrorToGenerator(error) {
    return generator['throw'](error);
  }
  return new Promise(function(resolve, reject) {
    function handleGeneratorRecord(genRec) {
      if (genRec.done) {
        resolve(genRec.value);
      } else {
        Promise.resolve(genRec.value).then(passValueToGenerator, passErrorToGenerator).then(handleGeneratorRecord, reject);
      }
    }
    handleGeneratorRecord(generator.next());
  });
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(generatorFunction) {
  return $jscomp.asyncExecutePromiseGenerator(generatorFunction());
};
$jscomp.asyncExecutePromiseGeneratorProgram = function(program) {
  return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(program)));
};
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var proxied = {};
    var proxy = Object.create(new $jscomp.global['Proxy'](proxied, {'get':function(target, key, receiver) {
      return target == proxied && key == 'q' && receiver == proxy;
    }}));
    return proxy['q'] === true;
  } catch (err) {
    return false;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = false;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
$jscomp.polyfill('WeakMap', function(NativeWeakMap) {
  function isConformant() {
    if (!NativeWeakMap || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var map = new NativeWeakMap([[x, 2], [y, 3]]);
      if (map.get(x) != 2 || map.get(y) != 3) {
        return false;
      }
      map['delete'](x);
      map.set(y, 4);
      return !map.has(x) && map.get(y) == 4;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeWeakMap && $jscomp.ES6_CONFORMANCE) {
      return NativeWeakMap;
    }
  } else {
    if (isConformant()) {
      return NativeWeakMap;
    }
  }
  var prop = '$jscomp_hidden_' + Math.random();
  function insert(target) {
    if (!$jscomp.owns(target, prop)) {
      var obj = {};
      $jscomp.defineProperty(target, prop, {value:obj});
    }
  }
  function patch(name) {
    var prev = Object[name];
    if (prev) {
      Object[name] = function(target) {
        insert(target);
        return prev(target);
      };
    }
  }
  patch('freeze');
  patch('preventExtensions');
  patch('seal');
  var index = 0;
  var PolyfillWeakMap = function(opt_iterable) {
    this.id_ = (index += Math.random() + 1).toString();
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillWeakMap.prototype.set = function(key, value) {
    insert(key);
    if (!$jscomp.owns(key, prop)) {
      throw new Error('WeakMap key fail: ' + key);
    }
    key[prop][this.id_] = value;
    return this;
  };
  PolyfillWeakMap.prototype.get = function(key) {
    return $jscomp.owns(key, prop) ? key[prop][this.id_] : undefined;
  };
  PolyfillWeakMap.prototype.has = function(key) {
    return $jscomp.owns(key, prop) && $jscomp.owns(key[prop], this.id_);
  };
  PolyfillWeakMap.prototype['delete'] = function(key) {
    if (!$jscomp.owns(key, prop) || !$jscomp.owns(key[prop], this.id_)) {
      return false;
    }
    return delete key[prop][this.id_];
  };
  return PolyfillWeakMap;
}, 'es6', 'es3');
$jscomp.MapEntry = function() {
  this.previous;
  this.next;
  this.head;
  this.key;
  this.value;
};
$jscomp.polyfill('Map', function(NativeMap) {
  function isConformant() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !NativeMap || typeof NativeMap != 'function' || !NativeMap.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeMap = NativeMap;
      var key = Object.seal({x:4});
      var map = new NativeMap($jscomp.makeIterator([[key, 's']]));
      if (map.get(key) != 's' || map.size != 1 || map.get({x:4}) || map.set({x:4}, 't') != map || map.size != 2) {
        return false;
      }
      var iter = map.entries();
      var item = iter.next();
      if (item.done || item.value[0] != key || item.value[1] != 's') {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0].x != 4 || item.value[1] != 't' || !iter.next().done) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeMap && $jscomp.ES6_CONFORMANCE) {
      return NativeMap;
    }
  } else {
    if (isConformant()) {
      return NativeMap;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var idMap = new WeakMap;
  var PolyfillMap = function(opt_iterable) {
    this.data_ = {};
    this.head_ = createHead();
    this.size = 0;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillMap.prototype.set = function(key, value) {
    key = key === 0 ? 0 : key;
    var r = maybeGetEntry(this, key);
    if (!r.list) {
      r.list = this.data_[r.id] = [];
    }
    if (!r.entry) {
      r.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:key, value:value};
      r.list.push(r.entry);
      this.head_.previous.next = r.entry;
      this.head_.previous = r.entry;
      this.size++;
    } else {
      r.entry.value = value;
    }
    return this;
  };
  PolyfillMap.prototype['delete'] = function(key) {
    var r = maybeGetEntry(this, key);
    if (r.entry && r.list) {
      r.list.splice(r.index, 1);
      if (!r.list.length) {
        delete this.data_[r.id];
      }
      r.entry.previous.next = r.entry.next;
      r.entry.next.previous = r.entry.previous;
      r.entry.head = null;
      this.size--;
      return true;
    }
    return false;
  };
  PolyfillMap.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = createHead();
    this.size = 0;
  };
  PolyfillMap.prototype.has = function(key) {
    return !!maybeGetEntry(this, key).entry;
  };
  PolyfillMap.prototype.get = function(key) {
    var entry = maybeGetEntry(this, key).entry;
    return entry && entry.value;
  };
  PolyfillMap.prototype.entries = function() {
    return makeIterator(this, function(entry) {
      return [entry.key, entry.value];
    });
  };
  PolyfillMap.prototype.keys = function() {
    return makeIterator(this, function(entry) {
      return entry.key;
    });
  };
  PolyfillMap.prototype.values = function() {
    return makeIterator(this, function(entry) {
      return entry.value;
    });
  };
  PolyfillMap.prototype.forEach = function(callback, opt_thisArg) {
    var iter = this.entries();
    var item;
    while (!(item = iter.next()).done) {
      var entry = item.value;
      callback.call(opt_thisArg, entry[1], entry[0], this);
    }
  };
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  PolyfillMap.prototype[Symbol.iterator] = PolyfillMap.prototype.entries;
  var maybeGetEntry = function(map, key) {
    var id = getId(key);
    var list = map.data_[id];
    if (list && $jscomp.owns(map.data_, id)) {
      for (var index = 0; index < list.length; index++) {
        var entry = list[index];
        if (key !== key && entry.key !== entry.key || key === entry.key) {
          return {id:id, list:list, index:index, entry:entry};
        }
      }
    }
    return {id:id, list:list, index:-1, entry:undefined};
  };
  var makeIterator = function(map, func) {
    var entry = map.head_;
    return $jscomp.iteratorPrototype(function() {
      if (entry) {
        while (entry.head != map.head_) {
          entry = entry.previous;
        }
        while (entry.next != entry.head) {
          entry = entry.next;
          return {done:false, value:func(entry)};
        }
        entry = null;
      }
      return {done:true, value:void 0};
    });
  };
  var createHead = function() {
    var head = {};
    head.previous = head.next = head.head = head;
    return head;
  };
  var mapIndex = 0;
  var getId = function(obj) {
    var type = obj && typeof obj;
    if (type == 'object' || type == 'function') {
      obj = obj;
      if (!idMap.has(obj)) {
        var id = '' + ++mapIndex;
        idMap.set(obj, id);
        return id;
      }
      return idMap.get(obj);
    }
    return 'p_' + obj;
  };
  return PolyfillMap;
}, 'es6', 'es3');
$jscomp.polyfill('Math.acosh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return Math.log(x + Math.sqrt(x * x - 1));
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.asinh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.log(Math.abs(x) + Math.sqrt(x * x + 1));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log1p', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < 0.25 && x > -0.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      var s = 1;
      while (zPrev != z) {
        y *= x;
        s *= -1;
        z = (zPrev = z) + s * y / ++d;
      }
      return z;
    }
    return Math.log(1 + x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.atanh', function(orig) {
  if (orig) {
    return orig;
  }
  var log1p = Math.log1p;
  var polyfill = function(x) {
    x = Number(x);
    return (log1p(x) - log1p(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cbrt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (x === 0) {
      return x;
    }
    x = Number(x);
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.clz32', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x) >>> 0;
    if (x === 0) {
      return 32;
    }
    var result = 0;
    if ((x & 4294901760) === 0) {
      x <<= 16;
      result += 16;
    }
    if ((x & 4278190080) === 0) {
      x <<= 8;
      result += 8;
    }
    if ((x & 4026531840) === 0) {
      x <<= 4;
      result += 4;
    }
    if ((x & 3221225472) === 0) {
      x <<= 2;
      result += 2;
    }
    if ((x & 2147483648) === 0) {
      result++;
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cosh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    return (exp(x) + exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.expm1', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < .25 && x > -.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      while (zPrev != z) {
        y *= x / ++d;
        z = (zPrev = z) + y;
      }
      return z;
    }
    return Math.exp(x) - 1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.hypot', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x, y, var_args) {
    x = Number(x);
    y = Number(y);
    var i, z, sum;
    var max = Math.max(Math.abs(x), Math.abs(y));
    for (i = 2; i < arguments.length; i++) {
      max = Math.max(max, Math.abs(arguments[i]));
    }
    if (max > 1e100 || max < 1e-100) {
      if (!max) {
        return max;
      }
      x = x / max;
      y = y / max;
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]) / max;
        sum += z * z;
      }
      return Math.sqrt(sum) * max;
    } else {
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]);
        sum += z * z;
      }
      return Math.sqrt(sum);
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.imul', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(a, b) {
    a = Number(a);
    b = Number(b);
    var ah = a >>> 16 & 65535;
    var al = a & 65535;
    var bh = b >>> 16 & 65535;
    var bl = b & 65535;
    var lh = ah * bl + al * bh << 16 >>> 0;
    return al * bl + lh | 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log10', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN10;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log2', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sign', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return x === 0 || isNaN(x) ? x : x > 0 ? 1 : -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sinh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    return (exp(x) - exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.tanh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.exp(-2 * Math.abs(x));
    var z = (1 - y) / (1 + y);
    return x < 0 ? -z : z;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.trunc', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (isNaN(x) || x === Infinity || x === -Infinity || x === 0) {
      return x;
    }
    var y = Math.floor(Math.abs(x));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.EPSILON', function(orig) {
  return Math.pow(2, -52);
}, 'es6', 'es3');
$jscomp.polyfill('Number.MAX_SAFE_INTEGER', function() {
  return 9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.MIN_SAFE_INTEGER', function() {
  return -9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isFinite', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (typeof x !== 'number') {
      return false;
    }
    return !isNaN(x) && x !== Infinity && x !== -Infinity;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (!Number.isFinite(x)) {
      return false;
    }
    return x === Math.floor(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isNaN', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return typeof x === 'number' && isNaN(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isSafeInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Number.isInteger(x) && Math.abs(x) <= Number.MAX_SAFE_INTEGER;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.parseFloat', function(orig) {
  return orig || parseFloat;
}, 'es6', 'es3');
$jscomp.polyfill('Number.parseInt', function(orig) {
  return orig || parseInt;
}, 'es6', 'es3');
$jscomp.assign = typeof Object.assign == 'function' ? Object.assign : function(target, var_args) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (!source) {
      continue;
    }
    for (var key in source) {
      if ($jscomp.owns(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
$jscomp.polyfill('Object.assign', function(orig) {
  return orig || $jscomp.assign;
}, 'es6', 'es3');
$jscomp.polyfill('Object.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var entries = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push([key, obj[key]]);
      }
    }
    return result;
  };
  return entries;
}, 'es8', 'es3');
$jscomp.polyfill('Object.getOwnPropertySymbols', function(orig) {
  if (orig) {
    return orig;
  }
  return function() {
    return [];
  };
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.ownKeys', function(orig) {
  if (orig) {
    return orig;
  }
  var symbolPrefix = 'jscomp_symbol_';
  function isSymbol(key) {
    return key.substring(0, symbolPrefix.length) == symbolPrefix;
  }
  var polyfill = function(target) {
    var keys = [];
    var names = Object.getOwnPropertyNames(target);
    var symbols = Object.getOwnPropertySymbols(target);
    for (var i = 0; i < names.length; i++) {
      (isSymbol(names[i]) ? symbols : keys).push(names[i]);
    }
    return keys.concat(symbols);
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Object.getOwnPropertyDescriptors', function(orig) {
  if (orig) {
    return orig;
  }
  var getOwnPropertyDescriptors = function(obj) {
    var result = {};
    var keys = Reflect.ownKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return result;
  };
  return getOwnPropertyDescriptors;
}, 'es8', 'es5');
$jscomp.polyfill('Object.setPrototypeOf', function(orig) {
  return orig || $jscomp.setPrototypeOf;
}, 'es6', 'es5');
$jscomp.polyfill('Object.values', function(orig) {
  if (orig) {
    return orig;
  }
  var values = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push(obj[key]);
      }
    }
    return result;
  };
  return values;
}, 'es8', 'es3');
$jscomp.polyfill('Reflect.apply', function(orig) {
  if (orig) {
    return orig;
  }
  var apply = Function.prototype.apply;
  var polyfill = function(target, thisArg, argList) {
    return apply.call(target, thisArg, argList);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || typeof Object.create == 'function' ? Object.create : function(prototype) {
  var ctor = function() {
  };
  ctor.prototype = prototype;
  return new ctor;
};
$jscomp.construct = function() {
  function reflectConstructWorks() {
    function Base() {
    }
    function Derived() {
    }
    new Base;
    Reflect.construct(Base, [], Derived);
    return new Base instanceof Base;
  }
  if (typeof Reflect != 'undefined' && Reflect.construct) {
    if (reflectConstructWorks()) {
      return Reflect.construct;
    }
    var brokenConstruct = Reflect.construct;
    var patchedConstruct = function(target, argList, opt_newTarget) {
      var out = brokenConstruct(target, argList);
      if (opt_newTarget) {
        Reflect.setPrototypeOf(out, opt_newTarget.prototype);
      }
      return out;
    };
    return patchedConstruct;
  }
  function construct(target, argList, opt_newTarget) {
    if (opt_newTarget === undefined) {
      opt_newTarget = target;
    }
    var proto = opt_newTarget.prototype || Object.prototype;
    var obj = $jscomp.objectCreate(proto);
    var apply = Function.prototype.apply;
    var out = apply.call(target, obj, argList);
    return out || obj;
  }
  return construct;
}();
$jscomp.polyfill('Reflect.construct', function(orig) {
  return $jscomp.construct;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.defineProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, attributes) {
    try {
      Object.defineProperty(target, propertyKey, attributes);
      var desc = Object.getOwnPropertyDescriptor(target, propertyKey);
      if (!desc) {
        return false;
      }
      return desc.configurable === (attributes.configurable || false) && desc.enumerable === (attributes.enumerable || false) && ('value' in desc ? desc.value === attributes.value && desc.writable === (attributes.writable || false) : desc.get === attributes.get && desc.set === attributes.set);
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.deleteProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    if (!$jscomp.owns(target, propertyKey)) {
      return true;
    }
    try {
      return delete target[propertyKey];
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.getOwnPropertyDescriptor', function(orig) {
  return orig || Object.getOwnPropertyDescriptor;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.getPrototypeOf', function(orig) {
  return orig || Object.getPrototypeOf;
}, 'es6', 'es5');
$jscomp.findDescriptor = function(target, propertyKey) {
  var obj = target;
  while (obj) {
    var property = Reflect.getOwnPropertyDescriptor(obj, propertyKey);
    if (property) {
      return property;
    }
    obj = Reflect.getPrototypeOf(obj);
  }
  return undefined;
};
$jscomp.polyfill('Reflect.get', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, opt_receiver) {
    if (arguments.length <= 2) {
      return target[propertyKey];
    }
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (property) {
      return property.get ? property.get.call(opt_receiver) : property.value;
    }
    return undefined;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.has', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    return propertyKey in target;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.isExtensible', function(orig) {
  if (orig) {
    return orig;
  }
  if ($jscomp.ASSUME_ES5 || typeof Object.isExtensible == 'function') {
    return Object.isExtensible;
  }
  return function() {
    return true;
  };
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.preventExtensions', function(orig) {
  if (orig) {
    return orig;
  }
  if (!($jscomp.ASSUME_ES5 || typeof Object.preventExtensions == 'function')) {
    return function() {
      return false;
    };
  }
  var polyfill = function(target) {
    Object.preventExtensions(target);
    return !Object.isExtensible(target);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.set', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, value, opt_receiver) {
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (!property) {
      if (Reflect.isExtensible(target)) {
        target[propertyKey] = value;
        return true;
      }
      return false;
    }
    if (property.set) {
      property.set.call(arguments.length > 3 ? opt_receiver : target, value);
      return true;
    } else {
      if (property.writable && !Object.isFrozen(target)) {
        target[propertyKey] = value;
        return true;
      }
    }
    return false;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.setPrototypeOf', function(orig) {
  if (orig) {
    return orig;
  } else {
    if ($jscomp.setPrototypeOf) {
      var setPrototypeOf = $jscomp.setPrototypeOf;
      var polyfill = function(target, proto) {
        try {
          setPrototypeOf(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      };
      return polyfill;
    } else {
      return null;
    }
  }
}, 'es6', 'es5');
$jscomp.polyfill('Set', function(NativeSet) {
  function isConformant() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !NativeSet || typeof NativeSet != 'function' || !NativeSet.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeSet = NativeSet;
      var value = Object.seal({x:4});
      var set = new NativeSet($jscomp.makeIterator([value]));
      if (!set.has(value) || set.size != 1 || set.add(value) != set || set.size != 1 || set.add({x:4}) != set || set.size != 2) {
        return false;
      }
      var iter = set.entries();
      var item = iter.next();
      if (item.done || item.value[0] != value || item.value[1] != value) {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0] == value || item.value[0].x != 4 || item.value[1] != item.value[0]) {
        return false;
      }
      return iter.next().done;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeSet && $jscomp.ES6_CONFORMANCE) {
      return NativeSet;
    }
  } else {
    if (isConformant()) {
      return NativeSet;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var PolyfillSet = function(opt_iterable) {
    this.map_ = new Map;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
    this.size = this.map_.size;
  };
  PolyfillSet.prototype.add = function(value) {
    value = value === 0 ? 0 : value;
    this.map_.set(value, value);
    this.size = this.map_.size;
    return this;
  };
  PolyfillSet.prototype['delete'] = function(value) {
    var result = this.map_['delete'](value);
    this.size = this.map_.size;
    return result;
  };
  PolyfillSet.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  PolyfillSet.prototype.has = function(value) {
    return this.map_.has(value);
  };
  PolyfillSet.prototype.entries = function() {
    return this.map_.entries();
  };
  PolyfillSet.prototype.values = function() {
    return this.map_.values();
  };
  PolyfillSet.prototype.keys = PolyfillSet.prototype.values;
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  PolyfillSet.prototype[Symbol.iterator] = PolyfillSet.prototype.values;
  PolyfillSet.prototype.forEach = function(callback, opt_thisArg) {
    var set = this;
    this.map_.forEach(function(value) {
      return callback.call(opt_thisArg, value, value, set);
    });
  };
  return PolyfillSet;
}, 'es6', 'es3');
$jscomp.checkStringArgs = function(thisArg, arg, func) {
  if (thisArg == null) {
    throw new TypeError("The 'this' value for String.prototype." + func + ' must not be null or undefined');
  }
  if (arg instanceof RegExp) {
    throw new TypeError('First argument to String.prototype.' + func + ' must not be a regular expression');
  }
  return thisArg + '';
};
$jscomp.polyfill('String.prototype.codePointAt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(position) {
    var string = $jscomp.checkStringArgs(this, null, 'codePointAt');
    var size = string.length;
    position = Number(position) || 0;
    if (!(position >= 0 && position < size)) {
      return void 0;
    }
    position = position | 0;
    var first = string.charCodeAt(position);
    if (first < 55296 || first > 56319 || position + 1 === size) {
      return first;
    }
    var second = string.charCodeAt(position + 1);
    if (second < 56320 || second > 57343) {
      return first;
    }
    return (first - 55296) * 1024 + second + 9216;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.endsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'endsWith');
    searchString = searchString + '';
    if (opt_position === void 0) {
      opt_position = string.length;
    }
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = searchString.length;
    while (j > 0 && i > 0) {
      if (string[--i] != searchString[--j]) {
        return false;
      }
    }
    return j <= 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.fromCodePoint', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    var result = '';
    for (var i = 0; i < arguments.length; i++) {
      var code = Number(arguments[i]);
      if (code < 0 || code > 1114111 || code !== Math.floor(code)) {
        throw new RangeError('invalid_code_point ' + code);
      }
      if (code <= 65535) {
        result += String.fromCharCode(code);
      } else {
        code -= 65536;
        result += String.fromCharCode(code >>> 10 & 1023 | 55296);
        result += String.fromCharCode(code & 1023 | 56320);
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'includes');
    return string.indexOf(searchString, opt_position || 0) !== -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.repeat', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(copies) {
    var string = $jscomp.checkStringArgs(this, null, 'repeat');
    if (copies < 0 || copies > 1342177279) {
      throw new RangeError('Invalid count value');
    }
    copies = copies | 0;
    var result = '';
    while (copies) {
      if (copies & 1) {
        result += string;
      }
      if (copies >>>= 1) {
        string += string;
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.stringPadding = function(padString, padLength) {
  var padding = padString !== undefined ? String(padString) : ' ';
  if (!(padLength > 0) || !padding) {
    return '';
  }
  var repeats = Math.ceil(padLength / padding.length);
  return padding.repeat(repeats).substring(0, padLength);
};
$jscomp.polyfill('String.prototype.padEnd', function(orig) {
  if (orig) {
    return orig;
  }
  var padEnd = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return string + $jscomp.stringPadding(opt_padString, padLength);
  };
  return padEnd;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.padStart', function(orig) {
  if (orig) {
    return orig;
  }
  var padStart = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return $jscomp.stringPadding(opt_padString, padLength) + string;
  };
  return padStart;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.startsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'startsWith');
    searchString = searchString + '';
    var strLen = string.length;
    var searchLen = searchString.length;
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = 0;
    while (j < searchLen && i < strLen) {
      if (string[i++] != searchString[j++]) {
        return false;
      }
    }
    return j >= searchLen;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.arrayFromIterator = function(iterator) {
  var i;
  var arr = [];
  while (!(i = iterator.next()).done) {
    arr.push(i.value);
  }
  return arr;
};
$jscomp.arrayFromIterable = function(iterable) {
  if (iterable instanceof Array) {
    return iterable;
  } else {
    return $jscomp.arrayFromIterator($jscomp.makeIterator(iterable));
  }
};
$jscomp.inherits = function(childCtor, parentCtor) {
  childCtor.prototype = $jscomp.objectCreate(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
  if ($jscomp.setPrototypeOf) {
    var setPrototypeOf = $jscomp.setPrototypeOf;
    setPrototypeOf(childCtor, parentCtor);
  } else {
    for (var p in parentCtor) {
      if (p == 'prototype') {
        continue;
      }
      if (Object.defineProperties) {
        var descriptor = Object.getOwnPropertyDescriptor(parentCtor, p);
        if (descriptor) {
          Object.defineProperty(childCtor, p, descriptor);
        }
      } else {
        childCtor[p] = parentCtor[p];
      }
    }
  }
  childCtor.superClass_ = parentCtor.prototype;
};
$jscomp.polyfill('WeakSet', function(NativeWeakSet) {
  function isConformant() {
    if (!NativeWeakSet || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var set = new NativeWeakSet([x]);
      if (!set.has(x) || set.has(y)) {
        return false;
      }
      set['delete'](x);
      set.add(y);
      return !set.has(x) && set.has(y);
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeWeakSet && $jscomp.ES6_CONFORMANCE) {
      return NativeWeakSet;
    }
  } else {
    if (isConformant()) {
      return NativeWeakSet;
    }
  }
  var PolyfillWeakSet = function(opt_iterable) {
    this.map_ = new WeakMap;
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
  };
  PolyfillWeakSet.prototype.add = function(elem) {
    this.map_.set(elem, true);
    return this;
  };
  PolyfillWeakSet.prototype.has = function(elem) {
    return this.map_.has(elem);
  };
  PolyfillWeakSet.prototype['delete'] = function(elem) {
    return this.map_['delete'](elem);
  };
  return PolyfillWeakSet;
}, 'es6', 'es3');
try {
  if (Array.prototype.values.toString().indexOf('[native code]') == -1) {
    delete Array.prototype.values;
  }
} catch (e) {
}
Ext.define('ExtDb.Ajax', {statics:{JWT_TOKEN_NAME:'jwt.token', baseUrl:'/', jwtToken:undefined, getDefaultHeaders:function() {
  var result = {'Accept':'application/json', 'Content-Type':'application/json'};
  if (this.jwtToken) {
    result['Authorization'] = 'Bearer ' + this.jwtToken;
  }
  return result;
}, toJson:function(str) {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return undefined;
  }
}, apiUrl:function(url) {
  url = url ? url : '';
  if (/^http/i.test(url)) {
    return url;
  }
  if (/^\/\//.test(url)) {
    return url;
  }
  var base_url = this.baseUrl;
  if (!base_url) {
    base_url = '/';
  }
  if (!base_url.endsWith('/')) {
    base_url += '/';
  }
  if (url.startsWith('/')) {
    url = url.substr(1, url.length - 1);
  }
  return base_url + url;
}, get:function(url) {
  var $jscomp$async$this = this;
  var options;
  var response;
  var text;
  var json;
  var jerr;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
    switch($jscomp$generator$context.nextAddress) {
      case 1:
        options = {headers:$jscomp$async$this.getDefaultHeaders(), method:'GET'};
        return $jscomp$generator$context.yield(window.fetch($jscomp$async$this.apiUrl(url), options), 2);
      case 2:
        response = $jscomp$generator$context.yieldResult;
        if (!!response.ok) {
          $jscomp$generator$context.jumpTo(3);
          break;
        }
        return $jscomp$generator$context.yield(response.text(), 4);
      case 4:
        text = $jscomp$generator$context.yieldResult;
        json = $jscomp$async$this.toJson(text);
        if (json) {
          jerr = FHIRata.Util.extractError(json);
          throw jerr;
        } else {
          throw new Error('Ajax GET call failed with code ' + response.status + '. Server says: ' + text);
        }
      case 3:
        return $jscomp$generator$context.yield(response.json(), 5);
      case 5:
        return $jscomp$generator$context['return']($jscomp$generator$context.yieldResult);
    }
  });
}, post:function(url, data) {
  var $jscomp$async$this = this;
  var options;
  var response;
  var text;
  var json;
  var jerr;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
    switch($jscomp$generator$context.nextAddress) {
      case 1:
        options = {headers:$jscomp$async$this.getDefaultHeaders(), method:'POST'};
        if (data) {
          options.body = JSON.stringify(data);
        }
        return $jscomp$generator$context.yield(window.fetch($jscomp$async$this.apiUrl(url), options), 2);
      case 2:
        response = $jscomp$generator$context.yieldResult;
        if (!!response.ok) {
          $jscomp$generator$context.jumpTo(3);
          break;
        }
        return $jscomp$generator$context.yield(response.text(), 4);
      case 4:
        text = $jscomp$generator$context.yieldResult;
        json = $jscomp$async$this.toJson(text);
        if (json) {
          jerr = ExtDb.Error.toError(json);
          throw jerr;
        } else {
          throw new Error('Ajax POST call failed with code ' + response.status + '. Server says: ' + text);
        }
      case 3:
        return $jscomp$generator$context.yield(response.json(), 5);
      case 5:
        return $jscomp$generator$context['return']($jscomp$generator$context.yieldResult);
    }
  });
}, put:function(url, data) {
  var $jscomp$async$this = this;
  var options;
  var response;
  var text;
  var json;
  var jerr;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
    switch($jscomp$generator$context.nextAddress) {
      case 1:
        options = {headers:$jscomp$async$this.getDefaultHeaders(), method:'POST'};
        if (data) {
          options.body = JSON.stringify(data);
        }
        return $jscomp$generator$context.yield(window.fetch($jscomp$async$this.apiUrl(url), options), 2);
      case 2:
        response = $jscomp$generator$context.yieldResult;
        if (!!response.ok) {
          $jscomp$generator$context.jumpTo(3);
          break;
        }
        return $jscomp$generator$context.yield(response.text(), 4);
      case 4:
        text = $jscomp$generator$context.yieldResult;
        json = $jscomp$async$this.toJson(text);
        if (json) {
          jerr = FHIRata.Util.extractError(json);
          throw jerr;
        } else {
          throw new Error('Ajax PUT call failed with code ' + response.status + '. Server says: ' + text);
        }
      case 3:
        return $jscomp$generator$context.yield(response.json(), 5);
      case 5:
        return $jscomp$generator$context['return']($jscomp$generator$context.yieldResult);
    }
  });
}, 'delete':function(url, data) {
  var $jscomp$async$this = this;
  var options;
  var response;
  var text;
  var json;
  var jerr;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
    switch($jscomp$generator$context.nextAddress) {
      case 1:
        options = {headers:$jscomp$async$this.getDefaultHeaders(), method:'DELETE'};
        if (data) {
          options.body = JSON.stringify(data);
        }
        return $jscomp$generator$context.yield(window.fetch($jscomp$async$this.apiUrl(url), options), 2);
      case 2:
        response = $jscomp$generator$context.yieldResult;
        if (!!response.ok) {
          $jscomp$generator$context.jumpTo(3);
          break;
        }
        return $jscomp$generator$context.yield(response.text(), 4);
      case 4:
        text = $jscomp$generator$context.yieldResult;
        json = $jscomp$async$this.toJson(text);
        if (json) {
          jerr = FHIRata.Util.extractError(json);
          throw jerr;
        } else {
          throw new Error('Ajax DELETE call failed with code ' + response.status + '. Server says: ' + text);
        }
      case 3:
        return $jscomp$generator$context.yield(response.json(), 5);
      case 5:
        return $jscomp$generator$context['return']($jscomp$generator$context.yieldResult);
    }
  });
}}});
Ext.define('ExtDb.AsyncLoader', {statics:{load:function(url) {
  return new Promise(function(resolve, reject) {
    var scriptElement = document.querySelector("script[src\x3d'" + url + "']");
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.onload = function() {
        resolve();
      };
      scriptElement.onerror = function() {
        reject();
      };
      scriptElement.setAttribute('src', url);
      document.body.appendChild(scriptElement);
    } else {
      resolve();
    }
  });
}, loadCss:function(url) {
  return new Promise(function(resolve, reject) {
    var linkElement = document.querySelector("link[href\x3d'" + url + "']");
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.onload = function() {
        resolve();
      };
      linkElement.onerror = function() {
        reject();
      };
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('href', url);
      document.body.appendChild(linkElement);
    } else {
      resolve();
    }
  });
}, loadAll:function(urls) {
  var arr = [];
  if (typeof urls === 'string') {
    if (/\.js$/i.test(urls)) {
      arr.push(this.load(urls));
    } else {
      if (/\.css$/i.test(urls)) {
        arr.push(this.loadCss(urls));
      }
    }
  } else {
    if (Array.isArray(urls)) {
      for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        if (/\.js$/i.test(url)) {
          arr.push(this.load(url));
        } else {
          if (/\.css$/i.test(url)) {
            arr.push(this.loadCss(url));
          }
        }
      }
    }
  }
  return Promise.all(arr);
}}});
Ext.define('ExtDb.ErrorMessageBox', {extend:'Ext.window.Window', modal:true, title:'Error', width:400, height:160, layout:'border', bodyPadding:10, config:{message:undefined, stack:undefined}, initComponent:function() {
  this.callParent(arguments);
  this.down('#lblMessage').setText(this.getMessage());
  this.down('#txtStack').setValue(this.getStack());
}, items:[{xtype:'container', region:'west', width:60, layout:{type:'vbox', pack:'start', align:'start'}, border:0, items:[{xtype:'component', cls:'x-message-box-icon x-message-box-error'}]}, {xtype:'container', region:'center', layout:'border', items:[{xtype:'container', region:'north', height:80, layout:'fit', items:[{xtype:'label', itemId:'lblMessage'}]}, {xtype:'container', region:'center', layout:'fit', items:[{xtype:'textarea', itemId:'txtStack', inputAttrTpl:'wrap\x3d"off"', scrollable:true, 
style:'white-space:nowrap; overflow: scroll;'}]}]}], fbar:[{xtype:'button', text:'Details', handler:function() {
  this.up('window').setHeight(300);
}}, {text:'OK', handler:function() {
  this.up('window').fireEvent('ok');
  this.up('window').close();
}}]});
Ext.define('ExtDb.Error', {requires:['ExtDb.ErrorMessageBox'], statics:{_prevExtErrorHandler:undefined, _prevWindowErrorHandler:undefined, _extErrorHandler:function(err) {
  var error = this.toError(err);
  this.errorMessageBox(error);
}, _windowErrorHandler:function(event) {
  var error = this.toError(event);
  this.errorMessageBox(error);
}, toError:function(e) {
  if (!e) {
    return new Error('Unexpected error');
  }
  if (typeof e === 'string' || e instanceof String) {
    return new Error(e);
  }
  if (e instanceof Error) {
    return e;
  }
  if (e instanceof ErrorEvent) {
    return e.error;
  }
  if (e.responseText) {
    var json = null;
    try {
      json = JSON.parse(e.responseText);
    } catch (jex) {
      json = undefined;
    }
    if (json && json.message) {
      return new Error(json.message);
    }
    return new Error(e.responseText);
  }
  if (e instanceof Ext.Error) {
    return new Error(e.toString());
  }
  if (e instanceof Ext.form.action.Action) {
    if (e.result && e.result.message) {
      return new Error(e.result.message);
    }
  }
  if (e instanceof Ext.data.Batch) {
    var exceptions = e.getExceptions();
    if (exceptions.length !== 0) {
      return this.extractError(exceptions[0]);
    }
  }
  if (e instanceof Ext.data.operation.Operation) {
    var error = e.getError();
    if (!error) {
      return new Error('Unexpected error of type Operation (operation.error \x3d\x3d null)');
    }
    if (error.response) {
      var response = error.response;
      if (response.responseJson) {
        var result = new Error(response.responseJson.message);
        result.stack = response.responseJson.stack;
        return result;
      }
      if (response.responseText) {
        return new Error(response.responseText);
      }
      if (response.statusText) {
        return new Error(response.statusText + ' ' + response.status);
      }
      if (response.status) {
        return new Error('HTTP Error ' + response.status);
      }
      return new Error('Unexpected error of type Operation (error.response.responseJson \x3d\x3d null, error.response.responseText \x3d\x3d null)');
    } else {
      return new Error('Unexpected error of type Operation (error.response \x3d\x3d null)');
    }
  }
  var err;
  if (e.message) {
    err = new Error(e.message);
    err.stack = e.stack || e.stackTrace;
    return err;
  }
  if (e.msg) {
    err = new Error(e.msg);
    if (e.stack) {
      err.stack = e.stack;
    }
    return err;
  }
  console.log('Unknown error: ' + e);
  return new Error('Unknown error: ' + e);
}, raiseError:function(e) {
  var error = this.toError(e);
  if (error) {
    throw error;
  }
}, errorMessageBox:function(e) {
  var error = this.toError(e);
  var messageBox = new ExtDb.ErrorMessageBox({message:error.message, stack:error.stack});
  messageBox.show();
}, enableGlobalExceptionHandler:function() {
  this._prevExtErrorHandler = Ext.Error.handle;
  Ext.Error.handle = this._extErrorHandler;
  window.addEventListener('error', this._windowErrorHandler);
}, disableGlobalExceptionHandler:function() {
  if (this._prevExtErrorHandler) {
    Ext.Error.handle = this._prevExtErrorHandler;
    window.removeEventListener('error', this._windowErrorHandler);
  }
}}});
Ext.define('ExtDb.FontAwesome', {requires:['ExtDb.AsyncLoader'], statics:{_faUrl:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/', version:'6.1.1', enable:function() {
  var baseUrl = this._faUrl + this.version;
  var urls = [baseUrl + '/css/all.min.css', baseUrl + '/js/all.min.js'];
  ExtDb.AsyncLoader.loadAll(urls).then(function() {
  })['catch'](function(err) {
    alert(err);
  });
}}});
Ext.define('ExtDb.MessageBox', {statics:{alert:function(title, message) {
  return new Promise(function(resolve, reject) {
    Ext.Msg.show({title:title, message:message, buttons:Ext.Msg.OK, icon:Ext.Msg.INFO, fn:function(btn) {
      resolve(btn);
    }});
  });
}, prompt:function(title, message) {
  return new Promise(function(resolve, reject) {
    Ext.Msg.prompt(title, message, function(btn, text) {
      if (btn === 'ok') {
        resolve(text);
      }
    });
  });
}, question:function(title, message) {
  return new Promise(function(resolve, reject) {
    Ext.Msg.show({title:title, message:message, buttons:Ext.Msg.YESNOCANCEL, icon:Ext.Msg.QUESTION, fn:function(btn) {
      resolve(btn);
    }});
  });
}, confirm:function(title, message) {
  return new Promise(function(resolve, reject) {
    Ext.Msg.show({title:title, message:message, buttons:Ext.Msg.YESNO, icon:Ext.Msg.QUESTION, fn:function(btn) {
      resolve(btn);
    }});
  });
}, error:function(title, message) {
  return new Promise(function(resolve, reject) {
    Ext.Msg.show({title:title, message:message, buttons:Ext.Msg.OK, icon:Ext.Msg.ERROR, fn:function(btn) {
      resolve(btn);
    }});
  });
}}});
Ext.define('ExtDb.Version', {statics:{getVersion:function() {
  return '1.0.0.0';
}}});
Ext.define('ExtDb.app.ModalViewController', {requres:['ExtDb.Error'], extend:'Ext.app.ViewController', control:{'#':{beforeclose:function() {
  var view = this.getView();
  var rv = this.handleModalFormClosing();
  return rv;
}}, 'form':{validitychange:function(sender, valid) {
  this.getViewModel().set('formValid', valid);
}}}, isFormValid:function() {
  var view = this.getView();
  if (!view) {
    return true;
  }
  var forms = view.query('form');
  if (!forms || !Array.isArray(forms) || !forms.length) {
    return true;
  }
  for (var i = 0; i < forms.length; i++) {
    var form = forms[i];
    var formValid = form.isValid();
    if (!formValid) {
      return false;
    }
  }
  return true;
}, hasChanges:function() {
  var me = this;
  var viewModel = me.getViewModel();
  if (!viewModel) {
    return false;
  }
  var data = viewModel.getData();
  if (data) {
    for (var key in data) {
      var value = viewModel.get(key);
      if (value instanceof Ext.data.Model) {
        var modelChanges = value.getChanges();
        if (modelChanges && Object.keys(modelChanges) && Object.keys(modelChanges).length) {
          return true;
        }
      }
    }
  }
  return false;
}, handleModalFormClosing:function() {
  var me = this;
  var view = me.getView();
  if (view.allowClose) {
    return true;
  }
  var isFormValid = me.isFormValid();
  var hasChanges = me.hasChanges();
  if (isFormValid === false && hasChanges === true) {
    Ext.Msg.show({title:'Question', message:'Form has invalid values. Close anyway?', buttons:Ext.Msg.YESNO, icon:Ext.Msg.QUESTION, fn:function(btn) {
      if (btn === 'yes') {
        view.allowClose = true;
        view.close();
      } else {
        view.allowClose = false;
      }
    }});
    return false;
  }
  if (hasChanges === true) {
    Ext.Msg.show({title:'Question', message:'You are closing a form that has unsaved changes. Do you want to save changes?', buttons:Ext.Msg.YESNOCANCEL, icon:Ext.Msg.QUESTION, fn:function(btn) {
      if (btn === 'yes') {
        try {
          me.saveRecord();
          view.allowClose = true;
          view.close();
        } catch (saveex) {
          ExtDb.MessageBox.error(saveex.message);
          view.allowClose = false;
        }
      } else {
        if (btn === 'no') {
          view.allowClose = true;
          view.close();
        } else {
          if (btn === 'cancel') {
            view.allowClose = false;
          }
        }
      }
    }});
    return false;
  }
  view.allowClose = true;
  view.close();
  return false;
}, getRecord:function() {
  var viewModel = this.getViewModel();
  if (viewModel) {
    return viewModel.get('record');
  }
  return undefined;
}, setRecord:function(record) {
  var viewModel = this.getViewModel();
  if (viewModel) {
    viewModel.set('record', record);
  }
}, createRecord:function(args) {
  var viewModel = this.getViewModel();
  if (viewModel && args) {
    this.setRecord(args);
  }
}, editRecord:function(args) {
  var viewModel = this.getViewModel();
  if (viewModel && args) {
    this.setRecord(args);
  }
}, saveRecord:function() {
  var record = this.getRecord();
  record.commit();
  this.fireEvent('saved', this, record);
  var view = this.getView();
  if (view) {
    view.fireEvent('saved', view, record);
  }
  view.allowClose = true;
  view.close();
}, cancelRecord:function() {
  var view = this.getView();
  if (view && view.close) {
    view.close();
  }
}});
Ext.define('ExtDb.app.ModalViewModel', {extend:'Ext.app.ViewModel', data:{formValid:false}});
Ext.define('ExtDb.component.AceCodeEditor', {requires:['ExtDb.AsyncLoader'], extend:'Ext.container.Container', alias:'widget.acecodeeditor', border:false, config:{value:null, url:null, mode:'json'}, publishes:['value'], _editor:null, _beautify:null, updateValue:function(value) {
  if (!value) {
    value = '';
  }
  if (this._editor) {
    var editorValue = this._editor.getValue();
    if (!editorValue) {
      editorValue = '';
    }
    if (value !== editorValue) {
      this._editor.setValue(value);
      this._editor.clearSelection();
    }
  }
}, ace_id:null, initComponent:function() {
  this.callParent(arguments);
  this.ace_id = 'ace_' + Ext.data.identifier.Uuid.createRandom()();
  this.setHtml('\x3cdiv id\x3d"' + this.ace_id + '" style\x3d"position:absolute;top:0;right:0;bottom:0;left:0;border:0"\x3e\x3c/div\x3e');
}, listeners:{render:function() {
  this.initAce();
}, resize:function() {
  if (this._editor) {
    this._editor.resize(true);
  }
}}, sleep:function(ms) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, ms);
  });
}, setMode:function(value) {
  this.callParent(arguments);
  if (this._editor && this._editor.session) {
    this._editor.session.setMode('ace/mode/' + value);
  }
}, initAce:function() {
  var me = this;
  var mode = me.getMode() || 'json';
  me._editor = window.ace.edit(me.ace_id);
  window.ace.require('ace/worker/xml');
  window.ace.require('ace/worker/html');
  window.ace.require('ace/worker/json');
  me._beautify = window.ace.require('ace/ext/beautify');
  me._editor.setTheme('ace/theme/chrome');
  me._editor.session.setMode('ace/mode/' + mode);
  var initialValue = me.initialConfig && me.initialConfig.value || me.getValue && me.getValue();
  if (initialValue) {
    me.updateValue(initialValue);
  }
  var url = me.initialConfig && me.initialConfig.url || me.getUrl && me.getUrl();
  if (url) {
    me.loadUrl(url);
  }
  me._editor.on('change', function(e) {
    var editorValue = me._editor.getValue();
    if (!editorValue) {
      editorValue = '';
    }
    var thisValue = me.getValue();
    if (!thisValue) {
      thisValue = '';
    }
    if (editorValue !== thisValue) {
      me.setValue(editorValue);
      me.fireEvent('change', me, editorValue);
    }
  });
}, beautify:function() {
  this._beautify.beautify(this._editor.session);
}, insert:function(text) {
  this._editor.insert(text);
}, loadUrl:function(url) {
  var me = this;
  window.fetch(url).then(function(response) {
    response.text().then(function(text) {
      me.setValue(text);
    })['catch'](function(e) {
      throw e;
    });
  })['catch'](function(e) {
    throw e;
  });
}});
Ext.define('ExtDb.grid.Panel', {extend:'Ext.grid.Panel', alias:['widget.extdbgrid', 'widget.extdbgridpanel'], config:{checked:[]}, publishes:['checked'], selModel:{selType:'checkboxmodel', mode:'MULTI'}, initComponent:function() {
  this.callParent(arguments);
  this._extend();
}, _extend:function() {
  var me = this;
  me.handleKeys();
}, handleKeys:function() {
  var grid = this;
  grid.on('selectionchange', function(sender, selected) {
    this.setChecked(selected || []);
  });
  grid.on('rowdblclick', function(sender, record, element, rowIndex) {
    grid.fireEvent('onedit', sender, record, element, rowIndex);
  });
  grid.on('containerkeydown', function(sender, e) {
    if (e.getKey() === Ext.event.Event.INSERT) {
      return grid.fireEvent('oninsert', sender);
    }
  });
  grid.on('rowkeydown', function(sender, record, element, rowIndex, e) {
    if (e.getKey() === Ext.event.Event.INSERT) {
      return grid.fireEvent('oninsert', sender);
    }
    if (e.getKey() === Ext.event.Event.DELETE) {
      if (record) {
        return grid.fireEvent('ondelete', record, element, rowIndex, e);
      }
    }
    if (e.getKey() === Ext.event.Event.F2) {
      if (record) {
        return grid.fireEvent('onedit', record, element, rowIndex, e);
      }
    }
    if (e.getKey() === Ext.event.Event.F5) {
      e.preventDefault();
      var result = grid.fireEvent('onrefresh', sender);
      if (!result) {
        return false;
      }
      var store = me.getStore();
      if (store) {
        store.reload();
      }
    }
  });
}});
