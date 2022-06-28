const Locals = {
    NL : {
        welcome_msg   : "Welkom",
        noAccount     : "Heeft u nog geen account?",
        register      : "Registreren",
        futherAsGuest : "Ga verder als gast zonder account",
        lgn_go        : "Ga Verder",
        lgn_btn_text  : "Inloggen",
        select_lang   : "Selecteer Taal"
    }, 
     
    ENG : { 
        welcome_msg   : "Welcome",
        noAccount     : "Don't have an account?",
        register      : "Register",
        futherAsGuest : "Login without an account",
        lgn_go        : "Next",
        lgn_btn_text  : "Login",
        select_lang   : "Select your Language"

    },
}

let currentLocal = "NL"


export function getLocals()  {
    return Locals[currentLocal]
}


export function setLocal(Language) {
    console.log("Language set: " + Language)
    currentLocal = Language
}