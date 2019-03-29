// This is where the API for the app will be defined, obviously
const apiModule = (function() {

    const { getToken } = require('./auth.module');

    function getUser() {
        return new Promise(resolve => {
            const data = {
                email: "api@api.com",
                password: "",
                id: ""
            };
            resolve(data);
        });
    };

    function signup(email, password) {
        const data = {
            token: "3456",
            id: "userId" + Math.floor(Math.random() * 1000),
            email,
            password,
            characters: []
        }
        
        // return new Promise(resolve => {
        //     resolve(data);
        // })
    };

    function login(email, password) {
        // User logs in, recieves token, store token in auth module (make sure you've got good error handling)


        const data = {
            token: "3456",
            id: "userId",
            email,
            password
        }
        return new Promise(resolve => {
            resolve(data);
        })
    }

    function getCharacter(id) {
        // Make request with authModule.request
        // Redirect to login page if someone isn't logged in (authenticated)

        
        // return new Promise(resolve => {
        //     const data = STORE.currentUser.characters.filter(char => char.id === id)[0];
        //     resolve(data);
        // });
    };

    function getCharacters() {
        // THis only needs to return the stuff that will show up in the characters list
        // (only thing that calls this function)
        return new Promise(resolve => {
            const data = [
                {
                    name: "",
                    attributes: {
                        race: "",
                        charClass: "",
                    },
                    id: ""
                },
            ];
            resolve(data);
        })
    }

    function postCharacter() {
        return new Promise(resolve => {
            const data = {
                // ...character,
                name: "",
                attributes: {
                    race: "",
                    charClass: "",
                    accent: "",
                    quirk: ""
                },
                stats: {
                    STR: "10",
                    CON: "10",
                    DEX: "10",
                    WIS: "10",
                    CHA: "10",
                    INT: "10"
                },
                background: "",
                id: Math.floor(Math.random() * 1000)
            };
            resolve(data);
        })
    };

    function putCharacter(character) {
        return new Promise(resolve => {
            resolve(character);
        })
    };

    function deleteCharacter(id) {
        return new Promise(resolve =>{
            resolve();
        })
    };

    return {
        getUser,
        login,
        signup,
        getCharacter,
        getCharacters,
        postCharacter,
        putCharacter,
        deleteCharacter
    };
})();

// Nav Drawer new character button will POST a new character (and close the drawer)
// clicking on an existing character will close the drawer
// PUT character will be hooked up to save button
// DELETE character will be in the little tabs in the nav drawer (maybe a trash can button)
// Try making a "are you sure?" thing that pops up before deletion (maybe an absolutely positioned Div)
// Write tests for your endpoints as you go