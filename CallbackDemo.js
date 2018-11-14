// var fs = require('fs');

/* function readJSONSync(filename) {
    // return JSON.parse(fs.readFileSync(filename, 'utf8'));
    let a = JSON.parse(fs.readFileSync(filename, 'utf8'));
    return a;
}

function readJSON(filename, callback){
    fs.readFile(filename, 'utf8', function (err, res){
      if (err) return callback(err);
      callback(null, JSON.parse(res));
    });
  }

let filename = "./mock.json"; */

/*  console.log(
    // readJSON(filename, ()=>console.log('callback')),
    readJSONSync(filename)
    
); */

// console.log('after');

const p = new Promise( (res,rej) =>{
    console.log('exec');
    
    setTimeout(() => {
        // throw new Error('tet');
        console.log('async');
        rej(4);
    }, 1000);
} );

 p.then( v=> console.log('then1',v) )
    .then( v=>console.log('then3:',v) )
   .catch( e=> {console.log('catch:',e); return 'catch 1' }   )
    .then( v=> console.log('then2:', v) ) 
 
    //console.log(p);
    