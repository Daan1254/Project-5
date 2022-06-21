
let acces_token;
let userid;

export function getCurrentToken(callback) {
    if (callback) {
        callback(acces_token)
    } else {
        return acces_token
    }
    
}



export function setToken(token) {
    // console.log("Token has been set: " + token)
    acces_token = token
}

export function getUser(callback){
    if (callback) {
        callback(userid)
    } else {
        return userid
    }
}

export function setUser(id){
    userid = id;
}