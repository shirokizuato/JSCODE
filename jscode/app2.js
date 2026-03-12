const promise = new Promise((resolve, reject)=>{
    let driver = true;

    if(driver){
        setTimeout(()=>{
            resolve("Driver has arrives");
        }, 3000);
    
    }
    else{
        reject("Declined");
    }
});

promise
.then(result => console.log(result))
.catch(error => console.log(error));
    