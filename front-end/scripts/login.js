
$(".btn").click(() => {
    let username = $("#login-user").val()
    let password = $("#login-pass").val()


    tryLogin(username, password, (statement) => {
        if (statement) {
            notify('succes', "Login Succes", 2500)
        } else {
            notify('error', "Login gefaald", 2500)
        }
    })
})


const tryLogin = async (username, password, callback) => {
    const response = await fetch("http://node7.consulhosting.nl:24187/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                username: username,
                password: password
            }
        )
    })

    if (response.status === 200) {
        callback(true)
    } else {
        callback(false)
    }
}