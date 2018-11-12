class SamplePromise
{

   constructor(data=()=>{})
   {


    // this.resolve = value=>console.log('resolve:',value);
    // this.reject = value=>console.log('reject:',value)

    try{
        data(this.resolve,this.reject);
       throw "errr";
    } 
    catch(error){
        console.log(error);
    }
   }
   

   resolve(a)
   {
     console.log(a);
     return a;
   }

   reject()
   {
    console.log(b)
   }

   then()
   {
      const a=this.resolve(2);
      console.log('ok',a);
   }

}
let a=new SamplePromise((resolve,reject)=>{
    resolve("ok");
})

a.then( v=>console.log(v) )