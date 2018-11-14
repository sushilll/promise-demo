/* 
    code Refactor
    change to es5
    handle Function in then cb
*/



class TestPromise {
    constructor( cb ) {
        this.state = 'pending';
        this.value = null;
        this.rejectedVal = null;

        this.handlers = [];
        try {
            cb( this.resolve, this.reject ,this.handlers);
        }
        catch(e){
            // console.log('err',e);
            this.rejectedVal = e;
        }
        // console.log('inner:',this);
    }

    state = 'pending';
    value = null;
    rejectedVal = null;
   

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
            // this.handlers.forEach(this.handle);
            // this.handlers = [];
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
        if( !this.rejectedVal && this.state === 'pending') {
            this.handlers.push(cb); }
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
            this.handlers = [];
        }
        return this;
    }

}

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


    // console.log("fetch:",fetch('https://jsonplaceholder.typicode.com/todos/1'));
    
    const o = new Promise( (res,rej)=>res(fetch('https://jsonplaceholder.typicode.com/todos/1')) );

    console.log(o);

    o
    .then( v=>console.log("then:",v)    )