
let acces_token;

$(".btn").click(() => {
    let username = $("#login-user").val()
    let password = $("#login-pass").val()


    tryLogin(username, password, (statement) => {
        if (statement) {
            notify("succes", "Login succes", 5000)
            $(".container").fadeOut(250, () => {
                $(".dashboard-container").fadeIn(250)
                load(username)
            })
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
        let json = await response.json()
        acces_token = json.acces_token
        callback(true)
    } else {
        callback(false)
    }
}