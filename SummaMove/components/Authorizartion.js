
let acces_token;

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