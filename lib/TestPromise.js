'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestPromise = function TestPromise(cb) {
    _classCallCheck(this, TestPromise);

    _initialiseProps.call(this);

    try {
        cb(this.resolve, this.reject);
    } catch (e) {
        console.log('err', e);

        this.rejectedVal = e;
    }

    // console.log('inner:',this);
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.state = 'pending';
    this.value = null;
    this.rejectedVal = null;
    this.handlers = [];

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
            _this.handlers = [];
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
        }
        return _this;
    };
};

var p = new TestPromise(function (resolve, reject) {
    setTimeout(function () {
        console.log('exec');
        throw new Error('testError');
        resolve(1);
    }, 1000);
    // console.log('promise');
});

p.then(function (v) {
    console.log('then1', v);return 2;
}).catch(function (e) {
    return console.log('catch1:', e);
}).then(function (v) {
    return console.log('then2:', v);
}).catch(function (e) {
    return console.log('catch2:', e);
});