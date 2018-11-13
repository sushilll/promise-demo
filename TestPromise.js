class TestPromise {
    constructor( cb ) {
        try {
            cb( this.resolve, this.reject );
        }
        catch(e){
            console.log('err',e);
            
            this.rejectedVal = e;
        }

        // console.log('inner:',this);
    }

    state = 'pending';
    value = null;
    rejectedVal = null;
    handlers = [];

    resolve = value => {
        if (this.state === 'pending') {
            this.state = 'resolved';
            this.value = value; 
            this.handlers.forEach(this.handle);
            this.handlers = [];
        }
    }

    reject = value => {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.rejectedVal = value;
            this.handlers = [];
        }
    }

    handle = cb => {
        if(this.state !== 'rejected')
            try{
                this.value = cb(this.value);
            }
            catch(e) {
                this.reject(e);
            }
    }

    then = cb => {
        if( !this.rejectedVal && this.state === 'pending')
            this.handlers.push(cb);
        else if( !this.rejectedVal ) {
            try {
                this.value = cb(this.value);
            }
            catch(e) {
                this.rejectedVal = e;
            }
        }
            

        return this;
    }

    catch = cb => {
        if(this.rejectedVal) {
            this.rejectedVal = cb(this.rejectedVal);
            this.rejectedVal = false;
        }
        return this;
    }

}

const p = new TestPromise( ( resolve, reject ) => {
    setTimeout( () => {
        console.log('exec');
        throw new Error('testError');
        resolve(1);
    }, 1000 );
    // console.log('promise');
} )


p
.then( v=>{console.log('then1',v); return 2;} )
.catch( e=> console.log('catch1:',e) )
.then( v=> console.log('then2:',v)    )
.catch( e=> console.log('catch2:',e) )
    