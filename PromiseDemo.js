var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function PromiseDemo(fn) {
  // store state which can be PENDING, FULFILLED or REJECTED
  var state = PENDING;

  // store value once FULFILLED or REJECTED
  var value = null;

  // store sucess & failure handlers
  var handlers = [];

  function fulfill(result) {
    state = FULFILLED;
    value = result;
    handlers.forEach(handle);
    handlers = null;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
    handlers.forEach(handle);
    handlers = null;
  }

  function getThen(value) {
    var t = typeof value;
    if (value && (t === 'object' || t === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        return then;
      }
    }
    return null;
  }

  function resolve(result) {
    try {
      var then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject)
        return
      }
      fulfill(result);
    } catch (e) {
      reject(e);
    }
  }

  function doResolve(fn, onFulfilled, onRejected) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return
        done = true
        onFulfilled(value)
      }, function (reason) {
        if (done) return
        done = true
        onRejected(reason)
      })
    } catch (ex) {
      if (done) return
      done = true
      onRejected(ex)
    }
  }

  function handle(handler) {
    if (state === PENDING) {
      handlers.push(handler);
    } else {
      if (state === FULFILLED &&
        typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(value);
      }
      if (state === REJECTED &&
        typeof handler.onRejected === 'function') {
        handler.onRejected(value);
      }
    }
  }

  this.done = function (onFulfilled, onRejected) {
    // ensure we are always asynchronous
    setTimeout(function () {
      handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      });
    }, 0);
  }

  this.then = function (onFulfilled, onRejected) {
    var self = this;
    return new PromiseDemo(function (resolve, reject) {
       self.done(function (result) {
        if (typeof onFulfilled === 'function') {
          try {
            return resolve(onFulfilled(result));
          } catch (ex) {
            return reject(ex);
          }
        } else {
          return resolve(result);
        }
      }, function (error) {
        if (typeof onRejected === 'function') {
          try {
            return resolve(onRejected(error));
          } catch (ex) {
            return reject(ex);
          }
        } else {
          return reject(error);
        }
      });
    });
  }

  doResolve(fn, resolve, reject);
  // console.log("inner:",this);
  
}

/* 

  PromiseDemo constructor
    doResolve(fn, res, rej)
      res(value) // aka onFulfilled
        getThen(result aka value)
          null // value !== function
        fulfill(result aka value) = changes state, set value, call handlers
          handlers.forEach(handle);
            handle = check state, call handler.onFulfilled / handler.onRejected

  then = return new PromiseDemo Obj = pass this as self
            executer
              return self.done(onFulfilled, onRejected) = check onFulfilled and call resolve / rej
                handle({onFulfilled, onRejected})
                
*/

const p = new PromiseDemo((res,rej)=>{
  
  console.log('promise');
  // res(1);
  /* setTimeout( () => {
    // console.log('promise');
    res(5);
}, 1000 ); */
})

// p.then(e=>console.log('then',e) );

// setTimeout(() => {
  p.then(e=>{console.log('then1',e); return 2;} )
    .then(e=> {console.log("then2",e);  throw new Error()  })

// }, 1000);