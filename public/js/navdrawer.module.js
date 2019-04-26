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
    };

    function _generateCharacterList(state) {
        console.log("Current users characters: " + state.currentUser.characters);
        return state.currentUser.characters.map(character => {
            return `<li class="character-list-item" data-id="${character._id || character.id}">
                <img class="character-icon" src="../img/${character.attributes.charClass}.png">
                <span class="character-name">${character.name}</span><br> 
                <span class="character-description">${character.attributes.race} ${character.attributes.charClass}</span>
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

    function _clickNewCharacter(state) {
        
        $("#js-new-character-button").click(event => {
            event.preventDefault();
            console.log("New Character clicked");
            state.navDrawerOpen = false;
            console.log("Nav Drawer should close");
            apiModule.postCharacter({
                name: commonModule._randomize(randomNames),
                attributes: {
                    race: commonModule._randomize(randomRaces),
                    charClass: commonModule._randomize(randomClasses),
                    accent: commonModule._randomize(randomVoices),
                    quirk: commonModule._randomize(randomQuirks)
                },
                stats: {
                    STR: commonModule._randomizeStatNumber(),
                    CON: commonModule._randomizeStatNumber(),
                    DEX: commonModule._randomizeStatNumber(),
                    WIS: commonModule._randomizeStatNumber(),
                    CHA: commonModule._randomizeStatNumber(),
                    INT: commonModule._randomizeStatNumber()
                },
                background: commonModule._randomize(randomBackgrounds)
            })
                .then(randomCharacter => {
                    state.currentCharacter = randomCharacter;
                    state.currentUser.characters = [...state.currentUser.characters, randomCharacter]
                    // commonModule.randomizeCharacter(state);
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
            // state.navDrawerOpen = false;
            $("#js-nav-drawer").addClass("drawer-closed-on-mobile");
            console.log("closing nav drawer");
            // _render(state)
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
        // const position = state.navDrawerOpen ? 0 : -260;    this goes in nav drawer below: style="left: ${position}px"
        const navDrawerContent = `
            <div class="nav-drawer drawer-closed-on-mobile" id="js-nav-drawer">
                <div class="nav-header">
                    <button class="drawer-close-button" id="js-drawer-close-button"><span class="fas fa-times"></span></button>
                    <p class="nav-drawer-user" id="js-nav-drawer-user">
                    <span class="user-email">${userEmail}</span> <br class="logout-linebreak">
                    <button class="logout-button" id="js-logout-button"><span class="fas fa-door-open"></span> <span class="fas fa-arrow-left"></span></button>
                    </p>
                </div>
                
                <section role="region" class="nav-drawer-characters" id="js-nav-drawer-characters">
                    <h3 class="my-characters">My characters:</h3>
                    <ul class="character-list" id="js-character-list">
                        <li class="character-list-item" id="js-new-character-button">
                            <img class="character-icon" src="../img/d20.png">
                            <span class="new-character">New Character</span><br> 
                            <span class="character-description"> Make a new character!</span>
                        </li>
                        ${characterList}
                    </ul>
                </section>
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

