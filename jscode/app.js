const promise = new Promise((resolve, reject)=>{
    let driver = true;

    if (driver){
        resolve("Driver has arrived");
    }
    else{
        reject("Declined");
    }
})

promise
.then(result => console.log(result))
.catch(error => console.log(error));