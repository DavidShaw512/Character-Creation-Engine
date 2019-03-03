// EVENTS ON CHARACTER BUILD PAGE:
// Randomize (generate attribs/stats), Save (POST Character), Open nav drawer
"use strict"

const characterModule = (function() {
    // Private

    let _render = false;
    
    function _generateCharacterForm() {
        return `
        <form class="build-form" id="js-build-form">
            <p class="build-box-header">
                {Name Input Value}
            </p>
            <p class="build-paragraph">
                Name: <input type="text" class="build-input input-name" id="input-name" placeholder="Leroy Jenkins"><br>
                Race: <input type="text" class="build-input input-race" id="input-race" placeholder="Human"><br>
                Class: <input type="text" class="build-input input-class" id="input-class" placeholder="Barbarian"><br>
                Accent: <input type="text" class="build-input input-accent" id="input-accent" placeholder="Loud"><br>
                Quirk: <input type="text" class="build-input input-quirk" id="input-quirk" placeholder="Is very impatient">
                <br>
                <div class="stats">
                    <div class="stat">
                        <input type="number" class="stat-input" value="10"><br>
                        STR
                    </div> 
                    <div class="stat">
                        <input type="number" class="stat-input" value="10"><br>
                        CON
                    </div> 
                    <div class="stat">
                        <input type="number" class="stat-input" value="10"><br>
                        DEX
                    </div> 
                    <div class="stat">
                        <input type="number" class="stat-input" value="10"><br>
                        CHA
                    </div> 
                    <div class="stat">
                        <input type="number" class="stat-input" value="10"><br>
                        WIS
                    </div> 
                    <div class="stat">
                        <input type="number" class="stat-input" value="10"><br>
                        INT
                    </div> 
                </div>
                <br>
                <strong>Background:</strong><br>
                <textarea class="character-background-box"></textarea>
            </p>
        </form>
        `
    }
    
    // this function will call to the API to retrieve the default randomizable attributes
    function _randomizeAttributes() {
        
    }

    function _randomizeStatNumber() {
        return Math.floor(Math.random() * 6) * 3 + 3;
        // return ((Math.floor(Math.random()) * 6) * 3) + 2;
    }
    
    function _randomizeAllStats() {
        
        const statFields = document.getElementsByClassName("stat-input");
            
        for (let i = 0; i < statFields.length; i += 1) {
            statFields[i].value = _randomizeStatNumber();
            console.log(statFields[i].value);
        };
    }
    
    function _randomizeCharacter() {
        $("#js-randomize-button").click(event => {
            event.preventDefault;
            _randomizeAllStats();
            // _randomizeAttributes();
        })
        
    
    }

    // this will POST the character if new, or PUT the character if editing an existing one
    function _saveCharacter(state) {
        $("#js-save-button").click(event => {
            event.preventDefault;
            const name = "Bill";
            const attributes = {
                race: Human,
                class: Rogue,
                quirk: "Likes milk"
            };
            const stats = {};
            const background = "";
            const newCharacter = {
                name,
                attributes,
                stats,
                background
            };
            state.user.characters.push(newCharacter);
        });
        
    }
    
    function _toggleNavDrawer(state) {
        state.navDrawerOpen = true;
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    };

    function renderCharacterPage(state) {
        const buildForm = _generateCharacterForm();
        const characterPageContent = `
            <div class="page-container">
                <header class="build-page-header" role="banner">
                    <h1>Build a New Character</h1>
                </header>
                <div class="button-container">
                    <button class="randomize-button" id="js-randomize-button">
                        <span class="fas fa-dice"></span><br>
                        Randomize
                    </button>
                    <button class="save-button" id="js-save-button">
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
        _randomizeCharacter();
        _saveCharacter();
        // _toggleNavDrawer();
        // THis is gonna be handled by the
    }

    return {
        render: renderCharacterPage,
        initiate
    }


})()

