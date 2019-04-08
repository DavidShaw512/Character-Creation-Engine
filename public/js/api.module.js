// This is where the API for the app will be defined, obviously


const apiModule = (function() {

    const { 
        getToken,
        storeToken,
        request
    } = authModule;



    function getUser() {

        // Old stuff:
        // return new Promise(resolve => {
        //     const data = {
        //         email: "api@api.com",
        //         password: "",
        //         id: ""
        //     };
        //     resolve(data);
        // });
    };

    function signup(email, password) {
        const newUser = {
            email,
            password,
            characters: []
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        return fetch(`/auth/signup`, options)
            .then(response => response.json())
            .then(responseJson => console.log("Success:", JSON.stringify(responseJson)))
            .catch(error => console.log("Error:", error))

        // OLD STUFF:
        // const data = {
        //     token: "3456",
        //     id: "userId" + Math.floor(Math.random() * 1000),
        //     email,
        //     password,
        //     characters: []
        // }
        
        // return new Promise(resolve => {
        //     resolve(data);
        // })
    };

    function login(email, password, rememberMe) {
        // User logs in, recieves token, store token in auth module (make sure you've got good error handling)
        const userData = {
            email,
            password
        }
        const url = `/auth/login`;
        const options = {
            method: 'POST',
            body: JSON.stringify(userData)
        }
        return request(url, options)
            .then(response => response.json())
            .then(responseJson => {
                console.log("Logging in...");
                storeToken(responseJson.authToken);
                return responseJson.user;
            })
            .catch(error => console.log("Error:", error));



        // Old stuff:
        // const data = {
        //     token: "3456",
        //     id: "userId",
        //     email,
        //     password
        // }
        // return new Promise(resolve => {
        //     resolve(data);
        // })
    }

    function getCharacter(id) {
        // Make request with authModule.request
        // Redirect to login page if someone isn't logged in (authenticated)
        const url = `/api/characters/${id}`;
        const options = {
            method: 'GET'
        };

        // request contains all of the fetch stuff, no need to be explicit about it here
        request(url, options)
            .then(response => response.json())

        // Old stuff:
        // return new Promise(resolve => {
        //     const data = STORE.currentUser.characters.filter(char => char.id === id)[0];
        //     resolve(data);
        // });
    };

    function getCharacters() {
        // THis only needs to return the stuff that will show up in the characters list
        // (only thing that calls this function)
        const token = getToken();
        console.log(token);
        const url = '/api/characters';
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        }

        return fetch(url, options)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(jsonCharacters => console.log(jsonCharacters))
            .catch(error => console.log("Error!", error));
        // return new Promise(resolve => {
        //     const data = [
        //         {
        //             name: "",
        //             attributes: {
        //                 race: "",
        //                 charClass: "",
        //             },
        //             id: ""
        //         },
        //     ];
        //     resolve(data);
        // })
    }

    function postCharacter(character) {
        const token = getToken();
        const url = `/api/characters`;
        const options = {
            method: 'POST',
            body: JSON.stringify(character),
            headers: {
                'Authentication': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(responseJson => console.log("Success!", responseJson));
            // .catch(err => console.log(err));

        // Old stuff:
        // return new Promise(resolve => {
        //     const data = {
        //         // ...character,
        //         name: "",
        //         attributes: {
        //             race: "",
        //             charClass: "",
        //             accent: "",
        //             quirk: ""
        //         },
        //         stats: {
        //             STR: "10",
        //             CON: "10",
        //             DEX: "10",
        //             WIS: "10",
        //             CHA: "10",
        //             INT: "10"
        //         },
        //         background: "",
        //         id: Math.floor(Math.random() * 1000)
        //     };
        //     resolve(data);
        // })
    };

    function putCharacter(character) {


        // Old stuff:
        return new Promise(resolve => {
            resolve(character);
        })
    };

    function deleteCharacter(id) {
        const token = authModule.getToken();
        const url = `/api/characters/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(responseJson => console.log("Delete Success!", responseJson))
            .catch(error => console.log("Error!", error))

        // Old stuff:
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