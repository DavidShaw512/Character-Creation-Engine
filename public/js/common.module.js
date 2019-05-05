const commonModule = (function() {

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
    function renderNavBar() {
        return `
            <nav class="nav" role="navigation">
                <button class="nav-drawer-button"><span class="fas fa-bars"></span></button>
                <p class="nav-title">CCE &nbsp;<span class="fas fa-dice-d20"></span></p>
            </nav>
        `;
    }

    function _openNavDrawer(state) {
        $(".nav-drawer-button").click(function(event) {
            event.preventDefault;
            $("#js-nav-drawer").removeClass("drawer-closed-on-mobile");
            // navDrawerModule.open(state);
        });
    }

    function renderLayoutNav(state, children) {
        const navBar = renderNavBar(state);
        const navDrawer = navDrawerModule.render(state);
        // - then put ${navDrawer} back into the 'return' under the ${navbar}
        // Attach event handlers before 'return'
        // dont forget about event delegation - attach handlers to higher level elements
        
        $(".nav-drawer-button").click(function(event) {
            event.preventDefault;
            // _openNavDrawer(state);
            $("#js-nav-drawer").removeClass("drawer-closed-on-mobile");
        })

        return `
            ${navBar}
            ${navDrawer}
            <main role="main">
                ${children}
            </main>
            `
    }

    function attachEventHandlers(state) {
        _openNavDrawer(state);
        navDrawerModule.attachEventHandlers(state);
    }

    function renderLayoutNoNav(children) {
        return `
            <main role="main">
                ${children}
            </main>
        `
    }

    function _randomize(arr) {
        const randomIndex = (Math.floor(Math.random() * arr.length));
        return arr[randomIndex];
        // Possible feature: user customizes the randomizable features and attributes
    }

    function _randomizeAttributes(state) {
        const name = document.getElementById("input-name");
        const race = document.getElementById("input-race");
        const charClass = document.getElementById("input-charClass");
        const accent = document.getElementById("input-accent");
        const quirk = document.getElementById("input-quirk");
        const background = document.getElementById("input-background");

        state.currentCharacter.name = _randomize(randomNames);
        state.currentCharacter.attributes.race = _randomize(randomRaces);
        state.currentCharacter.attributes.charClass = _randomize(randomClasses);
        state.currentCharacter.attributes.accent = _randomize(randomVoices);
        state.currentCharacter.attributes.quirk = _randomize(randomQuirks);
        state.currentCharacter.background = _randomize(randomBackgrounds);

        name.value = state.currentCharacter.name;
        race.value = state.currentCharacter.attributes.race;
        charClass.value = state.currentCharacter.attributes.charClass;
        accent.value = state.currentCharacter.attributes.accent;
        quirk.value = state.currentCharacter.attributes.quirk;
        background.innerHTML = state.currentCharacter.background;
    }

    function _randomizeStatNumber() {
        return Math.floor(Math.random() * 6) * 3 + 3;
    }
    
    function _randomizeAllStats(state) {
        const statFields = state.currentCharacter.stats;
        statFields.STR = _randomizeStatNumber();
        statFields.CON = _randomizeStatNumber();
        statFields.DEX = _randomizeStatNumber();
        statFields.WIS = _randomizeStatNumber();
        statFields.CHA = _randomizeStatNumber();
        statFields.INT = _randomizeStatNumber();
    }

    function randomizeCharacter(state) {
        _randomizeAllStats(state);
        _randomizeAttributes(state)
    }

    return {
        attachEventHandlers,
        renderLayoutNav,
        renderLayoutNoNav,
        randomizeCharacter,
        _randomize,
        _randomizeStatNumber,
        blankCharacter
    }
})();