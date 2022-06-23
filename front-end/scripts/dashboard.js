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

let allUsers;

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
            allUsers = users
            users.forEach((item, key) => {
                
                x += `<tr><td>${item.username}</td><td>${item.email}</td><td>${roles[item.roleid - 1].role}</td><td style="color: red;" onclick="deleteuser(${item.id})">X</td><td><i onclick="goto('edit_user', ${key})" class="fas fa-edit"></i></td></tr>`
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


const addUser = async () => {
    const username = $("#add-user").val()
    const password = $("#add-pass").val()
    const userRole = $("#user_role").val()
    const email    = $("#add-email").val()

    try {
        const response = await fetch("http://node7.consulhosting.nl:24187/addUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            },

            body: JSON.stringify({
                username: username,
                password: password,
                userRole: userRole,
                email: email
            })
        })


        if (response.status == 200) {
            let json = await  response.json()
            acces_token = json.acces_token
            loadUsers()
            goto('gebruikers')
        } else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.log(e)
    }
}

let prestaties;

const loadPrestaties = async () => {
    try {
        await loadUsers();
        await loadExercises();

        const response = await fetch("http://node7.consulhosting.nl:24187/prestaties", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            }
        })
    
        if (response.status == 200) {
            const json = await response.json(); 
            acces_token = json.acces_token
            prestaties = json.prestaties
            
            let x = ''
            x += `<tr><th>Gebruiker</td><th>OefeningID</th><th>Datum</th><th>Starttijd</th><th>Eindtijd</th><th>Reps</th><th></th><th></th></tr>`

            prestaties.forEach((item, key) => {
                x += `<tr><td>${item.userid}</td><td>${item.oefeningid}</td><td>${item.datum}</td><td>${item.starttijd}</td><td>${item.eindtijd}</td><td>${item.reps}</td><td style="color: red;" onclick="deleteprestatie(${item.id})">X</td><td><i onclick="goto('edit_prestatie', ${key})" class="fas fa-edit"></i></td></tr>`
            })
            
            $(".tabel-prestaties").html("")
            $(".tabel-prestaties").append(x)
        } else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.error(e)
    }
    
}

const addPrestatie = async () => {
    const userid = $("#add-prestatie-user").val()
    const oefeningid = $("#add-oefening").val()
    const datum = $("#add-datum").val()
    const starttijd    = $("#add-starttijd").val()
    const eindtijd    = $("#add-eindtijd").val()
    const reps    = $("#add-reps").val()

    console.log(userid)
    try {
        const response = await fetch("http://node7.consulhosting.nl:24187/addPrestatie", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            },

            body: JSON.stringify({
                userid: userid,
                oefeningid: oefeningid,
                datum: datum,
                starttijd: starttijd,
                eindtijd: eindtijd,
                reps: reps
            })
        })


        if (response.status == 200) {
            let json = await  response.json()
            acces_token = json.acces_token
            loadPrestaties()
            goto('prestaties')
        } else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.log(e)
    }
}
const editPrestatie = async () => {
    const userid = $("#edit-prestatie-user").val()
    const oefeningid = $("#edit-oefening").val()
    const datum = $("#edit-datum").val()
    const starttijd    = $("#edit-starttijd").val()
    const eindtijd    = $("#edit-eindtijd").val()
    const reps    = $("#edit-reps").val()


    try {
        const response = await fetch("http://node7.consulhosting.nl:24187/editPrestatie", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            },

            body: JSON.stringify({
                userid: userid,
                oefeningid: oefeningid,
                datum: datum,
                starttijd: starttijd,
                eindtijd: eindtijd,
                reps: reps,
                id: cur_prestatie
            })
        })


        if (response.status == 200) {
            let json = await response.json()
            acces_token = json.acces_token
            loadPrestaties()
            goto('prestaties')
        } else {
            notify("error", "Unauthorized", 2500)

        }
    } catch(e) {
        console.error(e)
    }
}


const deleteprestatie = async (id) => {
    try {
            const response = await fetch("http://node7.consulhosting.nl:24187/prestaties/delete/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            }
        })

        if (response.status == 200) {
            notify("succes", "Prestatie met id " + id + " succesvol verwijderd", 2500)
            let json = await response.json()
            acces_token = json.acces_token
            loadPrestaties()

        }
        else {
            notify("error", "Unauthorized", 2500)
        }
    } catch(e) {
        console.error(e)
    }
    
}
let cur_user;
let cur_prestatie;

const loadUserData = (id) => {
    let user = allUsers[id]
    cur_user = user.id
    $("#edit-user").val(user.username)
    $("#edit-pass").val(user.password)
    $("#edit_user_role").val(user.roleid).change();
    $("#edit-email").val(user.email)
}
const loadPrestatieData = (id) => {
    let prestatie = prestaties[id]
    cur_prestatie = prestatie.id

    let datum = new Date(prestatie.datum).toLocaleDateString('zh-Hans-CN');


    $("#edit-prestatie-user").val(prestatie.userid).change();
    $("#edit_oefening").val(prestatie.roleid).change();
    $("#edit-datum").val(datum);
    $("#edit-starttijd").val(prestatie.starttijd);
    $("#edit-eindtijd").val(prestatie.eindtijd);
    $("#edit-reps").val(prestatie.reps);
}


const editUser = async () => {

    const username = $("#edit-user").val()
    const password = $("#edit-pass").val()
    const userRole = $("#edit_user_role").val()
    const email    = $("#edit-email").val()


    try {
        const response = await fetch("http://node7.consulhosting.nl:24187/editUser", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': acces_token
            },

            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                userRole: userRole,
                id: cur_user
            })
        })


        if (response.status == 200) {
            let json = await response.json()
            acces_token = json.acces_token
            loadUsers()
            goto('gebruikers')
        } else {
            notify("error", "Unauthorized", 2500)

        }
    } catch(e) {
        console.error(e)
    }
}

const goto = (goto, id) => {
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
    } else if (goto == 'new_user') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-add-gebruikers").fadeIn(250)
            last_page = 'dashboard-add-gebruikers'
            $("#add-user").val("")
            $("#add-pass").val("")
            $("#user_role").val("")
            $("#add-email").val("")
        })
    } else if (goto == 'edit_user') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-edit-gebruikers").fadeIn(250)
            last_page = 'dashboard-edit-gebruikers'
            $("#add-user").val("")
            $("#add-pass").val("")
            $("#user_role").val("")
            $("#add-email").val("")
            loadUserData(id)
        })
    }
    else if (goto == 'prestaties') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-prestaties").fadeIn(250)
            last_page = 'dashboard-prestaties'
            loadPrestaties()
        })
    }
    else if (goto == 'new_prestatie') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-add-prestaties").fadeIn(250)
            last_page = 'dashboard-add-prestaties'
            let selectInhoud_user = '';
            let selectInhoud_oefening = '';
            users.forEach((item) => {
                selectInhoud_user += `<option value="${item.id}">${item.username}</option>`
            })
            oefeningen.forEach((item) => {
                selectInhoud_oefening += `<option value="${item.id}">${item.name}</option>`
            })
            $("#add-prestatie-user").html("")
            $("#add-prestatie-user").append(selectInhoud_user)
            $("#add-oefening").html("")
            $("#add-oefening").append(selectInhoud_oefening)
        })
    } 
    else if (goto == 'edit_prestatie') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-edit-prestaties").fadeIn(250)
            last_page = 'dashboard-edit-prestaties'
            let selectInhoud_user = '';
            let selectInhoud_oefening = '';
            users.forEach((item) => {
                selectInhoud_user += `<option value="${item.id}">${item.username}</option>`
            })
            oefeningen.forEach((item) => {
                selectInhoud_oefening += `<option value="${item.id}">${item.name}</option>`
            })
            $("#edit-prestatie-user").html("")
            $("#edit-prestatie-user").append(selectInhoud_user)
            $("#edit-oefening").html("")
            $("#edit-oefening").append(selectInhoud_oefening)
            loadPrestatieData(id)
        })
    }
}



$(window).ready(() => {
    $(".dashboard-oefeningen").hide()
})