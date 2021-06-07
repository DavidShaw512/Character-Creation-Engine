// EVENTS ON CHARACTER BUILD PAGE:
// Randomize (generate attribs/stats), Save (POST Character), Open nav drawer
"use strict"

const characterModule = (function() {
    // Private

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
            STR: 10,
            CON: 10,
            DEX: 10,
            WIS: 10,
            CHA: 10,
            INT: 10
        },
        background: "",
        id: ""
    };
    
    function _generateCharacterForm(state) {
        // Make the list of stats a ul instead of a bunch of divs
        // add value="${state.character.name}" into the attributes
        return `
        <form class="build-form" id="js-build-form">
            <p class="build-paragraph">
                
                <label class="input-label" for="input-name">Name</label><br>
                <input data-state="name" type="text" label="Name" class="build-input text-input input-name" id="input-name" value="${state.currentCharacter.name}"><br>
                
                <div class="attrib-div">
                    <label class="input-label" for="input-race">Race</label><br>
                    <input data-state="attributes.race" type="text" class="build-input text-input input-race" id="input-race" value="${state.currentCharacter.attributes.race}"><br>
                </div>
                <div class="attrib-div class-div">
                    <label class="input-label" for="input-charClass">Class</label><br>
                    <input data-state="attributes.charClass" type="text" class="build-input text-input input-class" id="input-charClass" value="${state.currentCharacter.attributes.charClass}"><br>
                </div>
                
                <label class="input-label" for="input-accent">Voice</label><br>
                <input data-state="attributes.accent" type="text" class="build-input text-input input-accent" id="input-accent" value="${state.currentCharacter.attributes.accent}"><br>
                
                <label class="input-label" for="input-quirk">Quirk</label><br>
                <input data-state="attributes.quirk" type="text" class="build-input text-input input-quirk" id="input-quirk" value="${state.currentCharacter.attributes.quirk}">
                <br>
                <div class="stats">
                    <div class="stat">
                        <input data-state="stats.STR" type="number" class="build-input stat-input" id="input-STR" value="${state.currentCharacter.stats.STR}"><br>
                        STR
                    </div> 
                    <div class="stat">
                        <input data-state="stats.CON" type="number" class="build-input stat-input" id="input-CON" value="${state.currentCharacter.stats.CON}"><br>
                        CON
                    </div> 
                    <div class="stat">
                        <input data-state="stats.DEX" type="number" class="build-input stat-input" id="input-DEX" value="${state.currentCharacter.stats.DEX}"><br>
                        DEX
                    </div> 
                    <div class="stat">
                        <input data-state="stats.CHA" type="number" class="build-input stat-input" id="input-CHA" value="${state.currentCharacter.stats.CHA}"><br>
                        CHA
                    </div> 
                    <div class="stat">
                        <input data-state="stats.WIS" type="number" class="build-input stat-input" id="input-WIS" value="${state.currentCharacter.stats.WIS}"><br>
                        WIS
                    </div> 
                    <div class="stat">
                        <input data-state="stats.INT" type="number" class="build-input stat-input" id="input-INT" value="${state.currentCharacter.stats.INT}"><br>
                        INT
                    </div> 
                </div>
                <label for="input-background" class="input-label">Why be an adventurer?</label><br>
                <textarea data-state="background" class="character-background-box build-input" id="input-background">${state.currentCharacter.background}</textarea>
            </p>
        </form>
        `
    };

    function _randomizeCharacter(state) {
        // Think about moving this out of here and into common, so it's a helper function that can be called anywhere
        $("#js-randomize-button").on("click", event => {
            event.preventDefault;
            commonModule.randomizeCharacter(state);
            render(state);
        });
    }

    function _customizeCharacter(state) {
        $("input, textarea").change(function() {
            const path = $(this).attr("data-state").split(".");
            if (path.length === 1) {
                state.currentCharacter[path[0]] = $(this).val();
            } else {
                state.currentCharacter[path[0]][path[1]] = $(this).val();
            };
        })
    }

    // this will PUT the character - POST new characters will be taken care of by the NavDrawer "New Char" button.
    // If id exists on character, use PUT - if no Id exists, use POST
    // After saving, don't clear the current character - instead, keep the same character pulled up for further edits
    // Use the thinkful resources, ask people on slack
    function _saveCharacter(state) {
        $("#js-save-button").click(event => {
            event.preventDefault;
            const newCharacter = state.currentCharacter;
            if (newCharacter.id) {
                apiModule.putCharacter(newCharacter)
                    .then(response => {
                        state.currentUser.characters = state.currentUser.characters.map(char => {
                            return (char.id || char._id) === newCharacter.id ? {...char, ...newCharacter} : char
                        })
                    })
                    .then(() => {
                        render(state);
                    })
            } else {
                apiModule.postCharacter(newCharacter)
                    .then(response => {
                        state.currentUser.characters = [...state.currentUser.characters, response];
                        state.currentCharacter = response;
                        render(state);
                    })

            }
            render(state);  
        })
    };

    function _clickDelete() {
        $("#js-delete-button").click(event => {
            event.preventDefault();
            $("#js-popup-window").removeClass("hidden");
        });
    };

    function _yesDelete(state) {
        $("#js-yes-delete").click(event => {
            event.preventDefault;
            $("#js-popup-window").addClass("hidden");
            const doomedCharacter = state.currentCharacter;
            apiModule.deleteCharacter(doomedCharacter.id)
                .then(response => {
                    // state.currentCharacter = blankCharacter;
                    // render(state);
                    
                });
            // console.log("Current user BEFORE filter: ", STORE.currentUser);
            state.currentUser.characters = state.currentUser.characters.filter(char => (char._id || char.id) !== doomedCharacter.id);
            // console.log("Current user AFTER filter: ", STORE.currentUser);
            state.currentCharacter = {
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
            };
            render(state);
        });
    };

    function _noDelete() {
        $("#js-no-delete").click(function(event) {
            event.preventDefault();
            $("#js-popup-window").addClass("hidden");
        });
    };
    

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    };

    function renderCharacterPage(state) {
        const properHeader = state.currentCharacter.id ? "Edit Your Character" : "Build a New Character";
        const headerImage = state.currentCharacter.attributes.charClass;
        const buildForm = _generateCharacterForm(state);
        const characterPageContent = `
            <div class="page-container">
                <header class="build-page-header" role="banner">
                    <h1 id="js-build-page-header-text"><img src="../img/${headerImage || "d20"}.png" class="build-logo"><br>
                    ${properHeader}</h1>
                </header>
                
                <div class="button-container">
                    <div class="popup-window hidden" id="js-popup-window">
                        <div class="delete-popup" id="js-delete-popup">
                            <p>Are you sure?<br>
                            <button class="popup-button yes-delete" id="js-yes-delete">Yes</button>
                            <button class="popup-button no-delete" id="js-no-delete">No</button>
                            </p>
                        </div>
                    </div>
                    <button class="randomize-button build-button" id="js-randomize-button">
                        <span class="fas fa-dice"></span><br>
                        Randomize
                    </button>
                    <button class="delete-button build-button" id="js-delete-button">
                        <span class="fas fa-skull-crossbones"></span><br>
                        Delete
                    </button>
                    <button class="save-button build-button" id="js-save-button">
                        <span class="fas fa-save"></span><br>
                        Save
                    </button>
                </div>
                <div class="build-box" role="section">
                    ${buildForm}
                </div>
            </div>
        `

        const characterPage = commonModule.renderLayoutNav(state, characterPageContent);
        $('#root').append(characterPage);
        commonModule.attachEventHandlers(state);
        _randomizeCharacter(state);
        _customizeCharacter(state);
        _saveCharacter(state);
        _clickDelete();
        _yesDelete(state);
        _noDelete();
        // _toggleNavDrawer();
        // THis is gonna be handled by the
    }

    return {
        render: renderCharacterPage,
        initiate
    }


})();

