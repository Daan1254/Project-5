let oefeningen;
const loadExercises = async () => {
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
        $(".oefening-count").val(oefeningen.lenght)
        last_page = "dashboard-home"

        let x = `<table><tr><th>Oefening naam</th><th>Oefening omschrijving</th><th>Afbeelding</th><th>Wijzigen</th><th>Verwijderen</th></tr>`
        oefeningen.forEach((item , key) => {
            x += `<tr><td>${item.name}</td><td>${item.description}</td><td><img id="table-img" src=${item.picture} alt=""></td><td><div onclick="edit(${item.id})" class="update-btn">Wijzigen</div></td><td class="flex-center"><div onclick="delete(${item.id})" class="delete-btn">Verwijderen</div></td></tr>`
        })
        $(".dashboard-oefeningen-grid").html("")
        $(".dashboard-oefeningen-grid").append(x)
    } else {
        notify("error", "Unauthorized", 2500)
    }
}


let last_page = "dashboard-home";


const goto = (goto) => {
    console.log(goto)
    if (goto == 'home') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-home").fadeIn(250)
            last_page = "dashboard-home"

        })
    } else if (goto == 'oefeningen') {
        $(`.${last_page}`).fadeOut(250, () => {
            $(".dashboard-oefeningen").fadeIn(250)
            last_page = "dashboard-oefeningen"
            loadExercises()
        })
    }
}



$(window).ready(() => {
    $(".dashboard-oefeningen").hide()
})