const members = require("./members");
// console.log(members);

const getOnline = members => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            data = members.filter(member => member.location=='online')
            resolve(data);
        }, 500)
    });
}

const getOffline = members => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            setTimeout(()=>{
                data = members.filter(member => member.location=='offline')
                resolve(data);
            }, 500);
        }, 500);
    })
}

const getYB = members => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            setTimeout(()=>{
                data = members.filter(member => member.group=='YB')
                resolve(data);
            }, 500);
        }, 500);
    });
};

const getOB = members => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            data = members.filter(member => member.group=='OB')
            resolve(data);
        }, 500);
    });
};

// getOnline(members).then(getOB).then(console.log);
// getYB(members).then(getOffline).then(console.log);

const asyncOnlineOB = async (members) => {
    let result = await getOnline(members);
    result = await getOB(result);
    console.log(result);
}

const asyncOfflineYB = async (members) => {
    let result = await getOffline(members);
    result = await getYB(result);
    console.log(result);
}

asyncOnlineOB(members);
asyncOfflineYB(members);