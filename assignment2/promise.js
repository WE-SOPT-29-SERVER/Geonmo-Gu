const promise = new Promise((resolve, reject)=>{
    const age = 15;
    if(age>20) {
        resolve(age);
    }
    else {
        reject("나이가 너무 어립니다.");
    }
})

promise
    .then((resolved)=>{
        console.log(resolved);
    })
    .catch((error)=>{
        console.log(error);
    })
