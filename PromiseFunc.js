/* 
    promise( cb )
        cb( res, rej )
            res(cb) => change state, return cb result
            rej => change state, return cb result


*/

function PromiseFunc ( cb ) {

    let resolve = function( cb ) {

    }

    let reject = function( cb ) {

    }

    cb( resolve, reject );
}