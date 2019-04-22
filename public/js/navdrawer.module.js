// EVENTS ON NAV DRAWER:
// Render nav drawer on menu click, GET character
// Render all the current user's characters in a list in the menu
// Upon clicking a character, open the build page with all fields filled with existing character's info
"use strict"

const navDrawerModule = (function() {

    let _render = false;

    const blankCharacter = {
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
    }

    // function _getUser() {
    //     return apiModule.getUser();
    // }

    // This function grabs a character from the (already populated) store/state
    // function _getCharacter(state) {
    //     $(".character-list-item").click(function(event) {
    //         event.preventDefault();
    //         return apiModule.getCharacter(state);
    //     })
        
    // }

    function _getCharacters() {
        
        return apiModule.getCharacters();
    }

    function _generateCharacterList(state) {
        console.log("Current user: " + state.currentUser);
        return state.currentUser.characters.map(character => {
            console.log(character, character.name);
            return `<li class="character-list-item" data-id="${character._id || character.id}">
                ${character.name} the 
                ${character.attributes.race} 
                ${character.attributes.charClass}
                </li>`
        })
        .join("")
    }

    // This function renders the character page (With all fields filled in), and closese the drawer
    function _openCharacter(state) {
        $(".character-list-item").click(function(event) { 
            event.preventDefault();
            state.navDrawerOpen = false;
            console.log(event);
            const id = $(this).attr("data-id");
            apiModule.getCharacter(id)
                .then(character => {
                    state.currentCharacter = character;
                    _render(state);
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        })
    };

    // function _deleteCharacter(state) {
    //     $(".character-delete-button").click(event => {
    //         event.preventDefault;
    //         const id = $(this).closest("<li>");
    //         console.log(id);
    //         // apiModule.deleteCharacter(id)
    //         //     .then(response => {
    //         //         state.currentUser.characters.filter(char => char.id !== newCharacter.)
    //         //     })
    //     })
    // }

    function _logout(state) {
        $('#js-logout-button').click(event => {
            event.preventDefault();
            console.log("Logout clicked");
            state.currentCharacter = blankCharacter;
            authModule.logOut();
            state.navDrawerOpen = false;
            state.currentPage = "login";
            _render(state)
        });
    }

    function _postCharacter(character) {
        return apiModule.postCharacter(character);
    };

    function _clickNewCharacter(state) {
        
        $("#js-new-character-button").click(event => {
            event.preventDefault();
            console.log("New Character clicked");
            state.navDrawerOpen = false;
            console.log("Nav Drawer should close");
            apiModule.postCharacter(blankCharacter)
                .then(blankCharacter => {
                    // Use a helper function to randomize the new blank character
                    state.currentCharacter = blankCharacter;
                    state.currentUser.characters = [...state.currentUser.characters, blankCharacter]
                    commonModule.randomizeCharacter(state);
                    _render(state);
                })
                .catch(error => {
                    console.log("Error: ", error);
                });
        })
    }

    function _open(state) {
        state.navDrawerOpen = true;
        _generateCharacterList(state);
        console.log("opening nav drawer");
        _render(state);
    }

    function _close(state) {
        $(".drawer-close-button").click(function(event) {
            event.preventDefault;
            state.navDrawerOpen = false;
            console.log("closing nav drawer");
            _render(state)
        });
    };

    // Public

    function initiate(mainRender, state) {
        if (!_render) {
            _render = mainRender;
        };

        // This might cause some issues, keep an eye out
        // _getCharacters(state)
        //     .then(characters => {
        //         state.characters = characters;
        //         _render(state);
        //     });

        // _getUser(state)
        //     .then(user => {
        //         state.currentUser = user;
        //         _render(state);
        //     });

        
    };

    

    function renderNavDrawer(state) {
        const userEmail = state.currentUser.email;
        const characterList = _generateCharacterList(state);
        const position = state.navDrawerOpen ? 0 : -260;
        const navDrawerContent = `
            <div class="nav-drawer" style="left: ${position}px" id="js-nav-drawer">
                <button class="drawer-close-button" id="js-drawer-close-button"><span class="fas fa-times"></span></button>
                <h2 class="nav-drawer-user" id="js-nav-drawer-user">Logged in:<br>
                <span class="user-email">${userEmail}</span></h2>
                <button class="logout-button" id="js-logout-button">Logout <span class="fas fa-door-open"></span></button>
                <hr>
                <h3>My characters:</h3>
                <section role="region" class="nav-drawer-characters" id="js-nav-drawer-characters">
                    <ul class="character-list" id="js-character-list">
                        ${characterList}
                    </ul>
                </section>
                <button class="new-character-button" id="js-new-character-button">New Character</button>
            </div>
        `;

        // const navDrawer = commonModule.renderLayoutNav(navDrawerContent)
        return navDrawerContent;

    }

    function attachEventHandlers(state) {
        _close(state);
        _clickNewCharacter(state);
        _openCharacter(state);
        _logout(state);
        // _deleteCharacter(state);
    // same as the other module (common)
}

    return {
        attachEventHandlers,
        render: renderNavDrawer,
        open: _open,
        close: _close,
        _logout,
        _clickNewCharacter,
        _openCharacter,
        // _deleteCharacter,
        initiate
    }


})();

