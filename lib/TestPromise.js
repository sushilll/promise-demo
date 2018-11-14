'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
    code Refactor
    handle Function in then cb
*/
var TestPromise = function TestPromise(cb) {
    _classCallCheck(this, TestPromise);

    _initialiseProps.call(this);

    this.handlers = [];
    try {
        cb(this.resolve, this.reject, this.handlers);
    } catch (e) {
        console.log('err', e);

        this.rejectedVal = e;
    }

    // console.log('inner:',this);
};

/* const p = new TestPromise( ( resolve, reject,handlers ) => {
    console.log('exec');
    setTimeout( () => {
        
        // throw new Error('testError');
        console.log('handlers',handlers);
        reject(1);
    }, 1000 );
    // console.log('promise');
} )
 */

// p
// .then( v=>{console.log('then1',v); return 2;} )
// .catch( e=> console.log('catch1:',e) )
// .then( v=> console.log('then2:',v)    )
// .then( v=> console.log('then3:',v)    )
// .then( (v,a,handlers)=> console.log('handlers:',handlers) )


/* 
    handle async action

*/
// console.log("fetch:",fetch('https://jsonplaceholder.typicode.com/todos/1'));

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.state = 'pending';
    this.value = null;
    this.rejectedVal = null;

    this.resolve = function (value) {
        if (_this.state === 'pending') {
            _this.state = 'resolved';
            _this.value = value;
            _this.handlers.forEach(_this.handle);
            _this.handlers = [];
        }
    };

    this.reject = function (value) {
        if (_this.state === 'pending') {
            _this.state = 'rejected';
            _this.rejectedVal = value;
            _this.handlers.forEach(_this.handle);
            // this.handlers = [];
        }
    };

    this.handle = function (cb) {
        if (_this.state !== 'rejected') try {
            _this.value = cb(_this.value);
        } catch (e) {
            _this.reject(e);
        }
    };

    this.then = function (cb) {
        if (!_this.rejectedVal && _this.state === 'pending') _this.handlers.push(cb);else if (!_this.rejectedVal) {
            try {
                _this.value = cb(_this.value);
            } catch (e) {
                _this.rejectedVal = e;
            }
        }

        return _this;
    };

    this.catch = function (cb) {
        if (_this.rejectedVal) {
            _this.rejectedVal = cb(_this.rejectedVal);
            _this.rejectedVal = false;
            _this.handlers = [];
        }
        return _this;
    };
};

var o = new TestPromise(function (res, rej) {
    return res(fetch('https://jsonplaceholder.typicode.com/todos/1'));
});

console.log(o);

o.then(function (v) {
    return console.log("then:", v);
});