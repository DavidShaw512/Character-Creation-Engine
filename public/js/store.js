const STORE = {
    currentPage: "landing",
    currentUser: {
        id: "",
        email: "",
        password: "",
        characters: []
    },
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
        background: "",
        id: ""
    },
    navDrawerOpen: false
}