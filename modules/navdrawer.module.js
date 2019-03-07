// EVENTS ON NAV DRAWER:
// Render nav drawer on menu click, GET character
// Render all the current user's characters in a list in the menu
// Upon clicking a character, open the build page with all fields filled with existing character's info
"use strict"

const navDrawerModule = (function() {

    let _render = false;

    function _getUser() {
        return apiModule.getUser();
    }

    function _generateUser(state) {
        return `${state.currentUser.email}`
    }

    // This function grabs a character from the (already populated) store/state
    function _getCharacter(state) {
        apiModule.getCharacter();
    }

    function _getCharacters() {
        
        return apiModule.getCharacters();
    }

    function _generateCharacterList(state) {
        return state.characters.map(character => {
            return `<li class="character-list-item">
                ${character.name}<br>
                ${character.attributes.race}<br>
                ${character.attributes.charClass}
                </li>`
        })
        .join("")

    }

    // This function renders the character page? (With all fields filled in)
    function _openCharacter(state, id) {
        _getCharacter(id)
            .then(character => {
                state.currentCharacter = character;
                _render(state);
            })
            .catch(error => console.log(error));
    };

    function _open(state) {
        state.navDrawerOpen = true;
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
        _getCharacters(state)
            .then(characters => {
                state.characters = characters;
                _render(state);
            });

        _getUser(state)
            .then(user => {
                state.currentUser = user;
                _render(state);
            })
    };

    

    function renderNavDrawer(state) {
        const userEmail = _generateUser(state);
        const characterList = _generateCharacterList(state);
        const position = state.navDrawerOpen ? 0 : -250;
        const navDrawerContent = `
            <div class="nav-drawer" style="left: ${position}px" id="js-nav-drawer">
                <button class="drawer-close-button" id="js-drawer-close-button"><span class="fas fa-times"></span></button>
                <h2 class="nav-drawer-user" id="js-nav-drawer-user">Logged in:<br>
                ${userEmail}</h2>
                <hr>
                <h3>My characters:</h3>
                <section role="region" class="nav-drawer-characters" id="js-nav-drawer-characters">
                    <ul class="character-list">
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
    // same as the other module (common)
}

    return {
        attachEventHandlers,
        render: renderNavDrawer,
        open: _open,
        close: _close,
        initiate
    }


})();

