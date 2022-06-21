let oefeningen;
const loadExercises = async () => {
    try {
        const response = await fetch("http://node7.consulhosting.nl:24187/oefeningen", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            }
        })
    
        if (response.status == 200) {
            const json = await response.json(); 
            acces_token = json.acces_token
            oefeningen = json.oefeningen
            $(".oefening-count").html(oefeningen.length)
    
            let x = ``
            oefeningen.forEach((item , key) => {
                x += `<div class="exercise-item"><img src="${item.picture}" alt=""><div class="exercise-detail-container"><div class="exercise-title">${item.name}</div><div class="exercise-description">${item.description}</div><div class="exercise-btn-container"><div class="exercise-btn edit-btn" onclick="edit(${item.id}, ${key})">Wijzigen</div><div class="exercise-btn delete-btn" onclick="del(${item.id})">Verwijderen</div></div></div></div>`
            })
            $(".dashboard-oefeningen-grid").html("")
            $(".dashboard-oefeningen-grid").append(x)
        } else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.error(e)
    }
    
}


const del = async (id) => {
    try {
            const response = await fetch("http://node7.consulhosting.nl:24187/oefeningen/delete/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            }
        })

        if (response.status == 200) {
            notify("succes", "Oefening met id " + id + " succesvol verwijderd", 2500)
            let json = await response.json()
            acces_token = json.acces_token
            loadExercises()

        }
        else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.error(e)
    }
    
}

let last_page = "dashboard-home";

let edit_id;

const deleteuser = async (id) => {
    try {
            const response = await fetch("http://node7.consulhosting.nl:24187/users/delete/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            }
        })

        if (response.status == 200) {
            notify("succes", "Gebruiker met id " + id + " succesvol verwijderd", 2500)
            let json = await response.json()
            acces_token = json.acces_token
            loadUsers()

        }
        else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.error(e)
    }
    
}

const edit = (id, key) => {
    edit_id = id
    last_page = "dashboard-edit-oefening"
    if (!oefeningen[key]) {notify("error", "Er is een fout opgetreden", 2500); return;} 
    $("#dashboard-edit-imgSource").attr("src", oefeningen[key].picture)
    $(".dashboard-edit-inner-title").val(oefeningen[key].name)
    $(".dashboard-edit-inner-description").val(oefeningen[key].description)     
    $(".dashboard-oefeningen").fadeOut(250, () => {
        $(".dashboard-edit-oefening").fadeIn(250, () => {

        })
    })
}

const editSource = () => {
    let src = $(".dashboard-edit-srcChanger").val()

    $(".dashboard-edit-imgSource").attr("src", src)
    console.log('ran')

}


$(".dashboard-edit-srcChanger").on("input", function(){
    let src = $(".dashboard-edit-srcChanger").val()
    $("#dashboard-edit-imgSource").attr("src", src)
});


const confirmChanges = async () => {
    let title = $(".dashboard-edit-inner-title").val()
    let description = $(".dashboard-edit-inner-description").val()
    let imgSource = $(".dashboard-edit-srcChanger").val()

    try {
        console.log(acces_token)
        let response = await fetch("http://node7.consulhosting.nl:24187/oefeningen/edit/" + edit_id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            },
            body: JSON.stringify({
                name: title,
                description: description,
                picture: imgSource
            })
        })
    
    
        if (response.status == 200) {
            let json = await response.json()
            acces_token = json.acces_token
            notify("succes", "oefening succesvol geupdate")

            $(".dashboard-edit-oefening").fadeOut(250, () => {
                $(".dashboard-oefeningen").fadeIn(250)
                loadExercises()
            })
        } else {
            notify("error", "Unauthorized", 2500)
        }
    }
    catch(e) {
        console.error(e)
    }
    
}

const create = () => {
    last_page = "dashboard-create-oefening"
    $(".dashboard-oefeningen").fadeOut(250, () => {
        $(".dashboard-create-oefening").fadeIn(250, () => {

        })
    })
}
const sendcreatereq = async () => {
    let title = $(".dashboard-create-inner-title").val()
    let description = $(".dashboard-create-inner-description").val()
    let imgSource = $(".dashboard-create-inner-url").val()

    try {
        console.log(acces_token)
        let response = await fetch("http://node7.consulhosting.nl:24187/oefeningen/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            },
            body: JSON.stringify({
                name: title,
                description: description,
                picture: imgSource
            })
        })
    
    
        if (response.status == 200) {
            let json = await response.json()
            acces_token = json.acces_token
            notify("succes", "oefening succesvol aangemaakt")

            $(".dashboard-create-oefening").fadeOut(250, () => {
                $(".dashboard-oefeningen").fadeIn(250)
                loadExercises()
            })
        } else {
            notify("error", "Unauthorized", 2500)
        }
    }
    catch(e) {
        console.error(e)
    }
    
}

let users;
let roles;
const loadRoles = async () => {
    try {
        const response = await fetch("http://node7.consulhosting.nl:24187/roles", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            }
        })
    
        if (response.status == 200) {
            const json = await response.json(); 
            acces_token = json.acces_token
            roles = json.roles
            
        } else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.error(e)
    }
    
}

const loadUsers = async () => {
    try {
        await loadRoles();
        const response = await fetch("http://node7.consulhosting.nl:24187/users", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            }
        })
    
        if (response.status == 200) {
            const json = await response.json(); 
            acces_token = json.acces_token
            users = json.users
            
            let x = ''
            x += `<tr><th>Username</td><th>Email</th><th>Rol</th><th></th><th></th></tr>`
            users.forEach((item) => {
                x += `<tr><td>${item.username}</td><td>${item.email}</td><td>${roles[item.roleid - 1].role}</td><td style="color: red;" onclick="deleteuser(${item.id})">X</td><td><i class="fas fa-edit"></i></td></tr>`
            })
            $(".tabel").html("")
            $(".tabel").append(x)
        } else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.error(e)
    }
    
}

const goto = (goto) => {
    console.log(goto)
    if (goto == 'home') {
        console.log(last_page)
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-home").fadeIn(250)
            last_page = "dashboard-home"

        })
    } else if (goto == 'oefeningen') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-oefeningen").fadeIn(250)
            last_page = "dashboard-oefeningen"
            console.log(last_page)
            loadExercises()
        })
    }
    else if (goto == 'gebruikers') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-gebruikers").fadeIn(250)
            last_page = "dashboard-gebruikers"
            loadUsers()
        })
    }
}



$(window).ready(() => {
    $(".dashboard-oefeningen").hide()
})