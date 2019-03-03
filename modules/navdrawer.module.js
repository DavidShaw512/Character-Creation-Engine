// EVENTS ON NAV DRAWER:
// Render nav drawer on menu click, GET character
// Render all the current user's characters in a list in the menu
// Upon clicking a character, open the build page with all fields filled with existing character's info
"use strict"

const navDrawerModule = (function() {

    let _render = false;

    // This function grabs a character from the (already populated) store/state
    function _getCharacter(state) {
        apiModule.getCharacter();
    }

    function _getCharacters() {
        
        return apiModule.getCharacters();
    }

    function _generateCharacterList(state) {
        const character = getCharacter();

    }

    // This function renders the character page? (With all fields filled in)
    function _openCharacter(state, id) {
        _getCharacter(id)
            .then(character => {
                state.character = character;
                _render(state);
            })
    };

    function _open(state) {
        state.navDrawerOpen = true;
        _render(state);
    }

    function _close(state) {
        state.navDrawerOpen = false;
        _render(state)
    };

    function initiate(state, mainRender) {
        if (!_render) {
            _render = mainRender;
        };

        // This might cause some issues, keep an eye out
        _getCharacters(state)
            .then(characters => {
                state.characters = characters;
                _render(state);
            })
    };

    function renderNavDrawer(state) {
        const userEmail = "";
        const characterList = _generateCharacterList(state);
        const navDrawerContent = `
            <div class="nav-drawer" id="js-nav-drawer">
                <h2 class="nav-drawer-user" id="js-nav-drawer-user">${userEmail}</h2>
                <h3>My characters:</h3>
                <section role="region" class="nav-drawer-characters" id="js-nav-drawer-characters">
                    ${characterList}
                </section>
            </div>
        `;

        // const navDrawer = commonModule.renderLayoutNav(navDrawerContent)
        return navDrawerContent;

    }

    return {
        render: renderNavDrawer,
        open: _open,
        initiate
    }


})

