class TestPromise {
    constructor( executer ) {
        
        this.handleResolve = null;
        this.handleReject = null;

        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);

        try{
            executer( this.resolve, this.reject );
        }
        catch(e){
            this.handleReject(e);
        }
    }

    resolve ( value ) {
        this.handleResolve(value);
    }

    reject( value ) {
        this.handleReject(value);
    }

    then( onSuccess ) {
        this.handleResolve = onSuccess;
        return this;
    }

    catch( onError ){
        this.handleReject = onError;
    }

}

const p = new TestPromise( ( resolve, reject ) => {
    setTimeout( () => {
        console.log('promise');
        resolve(5);
    }, 1000 );
} )

/* const q = new TestPromise( ( resolve, reject ) => {
    setTimeout( () => {
        console.log('promise');
        reject(5);
    }, 2000 );
} ) */


p.then(e=>console.log('then',e) )

// q.catch(e=>console.log('catch',e) )
