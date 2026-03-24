const promise1 = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        setTimeout(() => {
            resolve("Task 1 Completed");
        }, 2000);
    } else {
        reject("Task 1 Failed");
    }
});

const promise2 = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        setTimeout(() => {
            resolve("Task 2 Completed");
        }, 3000);
    } else {
        reject("Task 2 Failed");
    }
});

const promise3 = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        setTimeout(() => {
            resolve("Task 3 Completed");
        }, 5000);
    } else {
        reject("Task 3 Failed");
    }
});

Promise.all([promise1, promise2, promise3])
    .then(result => console.log(result))
    .catch(error => console.log(error));