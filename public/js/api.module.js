const apiModule = (function() {

    const { 
        getToken,
        storeToken,
        storeUser,
        request
    } = authModule;



    function getUser() {
        
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
    };

    function login(email, password, rememberMe) {
        // User logs in, recieves token, store token in auth module (make sure you've got good error handling)
        const userData = {
            email,
            password,
            rememberMe
        }
        const url = `/auth/login`;
        const options = {
            method: 'POST',
            body: JSON.stringify(userData)
        }
        return request(url, options)
            .then(response => response.json())
            .then(responseJson => {
                storeToken(responseJson.authToken);
                storeUser(responseJson.user);
                return responseJson.user;
            })
            .catch(error => console.log("Error:", error));
    }

    function getCurrentUser() {
        const url = `/api/users/me`;
        const options = {
            method: 'GET'
        };

        return request(url, options)
            .then(response => response.json())
    }

    function getCharacter(id) {
        // Make request with authModule.request
        // Redirect to login page if someone isn't logged in (authenticated)
        const url = `/api/characters/${id}`;
        const options = {
            method: 'GET'
        };

        // request contains all of the fetch stuff, no need to be explicit about it here
        return request(url, options)
            .then(response => response.json())
    };

    function getCharacters() {
        // THis only needs to return the stuff that will show up in the characters list
        // (only thing that calls this function)
        const url = '/api/characters';
        const options = {
            method: 'GET'
        }

        return request(url, options)
            .then(response => {
                return response.json();
            })
            // .then(jsonCharacters => console.log(jsonCharacters))
            .catch(error => console.log("Error!", error));
    }

    function postCharacter(character) {
        const url = `/api/characters`;
        const options = {
            method: 'POST',
            body: JSON.stringify(character)
        };

        return request(url, options)
            .then(response => response.json())
            .then(responseJson => {
                return responseJson;
            })
            .catch(err => console.log(err));
    };

    function putCharacter(character) {
        const url = `/api/characters/${character.id}`;
        const options = {
            method: 'PUT',
            body: JSON.stringify(character)
        };

        return request(url, options)
            .then(response => response.json())
            .then(responseJson => {
                // console.log("Character updated", responseJson);
            })
            .catch(err => console.log(err));
    };

    function deleteCharacter(characterId) {
        const url = `/api/characters/${characterId}`;
        const options = {
            method: 'DELETE'
        };

        return request(url, options)
            .then(response => response.json())
            .catch(error => console.log("Error!", error));
    };

    return {
        getUser,
        login,
        getCurrentUser,
        signup,
        getCharacter,
        getCharacters,
        postCharacter,
        putCharacter,
        deleteCharacter
    };
})();