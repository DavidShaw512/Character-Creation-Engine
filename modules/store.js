const STORE = {
    currentPage: "character",
    currentUser: {
        email: "",
        password: "",
        id: ""
    },
    characters: [],
    currentCharacter: {
        name: "",
        attributes: {
            race: "",
            charClass: "",
            accent: "",
            quirk: ""
        },
        stats: {
            STR: 10,
            CON: 10,
            DEX: 10,
            WIS: 10,
            CHA: 10,
            INT: 10
        },
        background: ""
    },
    navDrawerOpen: false
}