export async function tryLogin(username, password, callback) {
    // let username = user.target.value
    // let password = pass.target.value

    const response = await fetch("http://node7.consulhosting.nl:24187/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(
            {
                username: username,
                password: password
            }
        )
    })

    let json = await response.json()
    if (response.status === 200) {
        callback(true)
    } else {
        callback(false)
    }



}
