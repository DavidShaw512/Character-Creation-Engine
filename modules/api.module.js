// This is where the API for the app will be defined, obviously
const apiModule = (function() {
    function getUser() {
        return new Promise(resolve => {
            const data = {
                email: "Api@test.com"

            };
            resolve(data);
        });
    };

    function postUser() {
        return new Promise((resolve, reject) => {

        })
    };

    function getCharacter() {
        return new Promise(resolve => {
            const data = {

            };
            resolve(data);
        });
    };

    function getCharacters() {
        return new Promise(resolve => {
            const data = [
                {
                    name: "Bill",
                    attributes: {
                        race: "Human",
                        charClass: "Cleric"
                    }
                },
                {
                    name: "Sharon",
                    attributes: {
                        race: "Dwarf",
                        charClass: "Barbarian"
                    }
                } 
            ];
            resolve(data);
        })
    }

    function postCharacter() {

    };

    function putCharacter() {

    };

    function deleteCharacter() {

    };

    return {
        getUser,
        postUser,
        getCharacter,
        getCharacters,
        postCharacter,
        putCharacter,
        deleteCharacter
    };
})();