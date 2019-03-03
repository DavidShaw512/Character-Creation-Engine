const commonModule = (function() {

    function renderNavBar() {
        return `
            <nav class="nav" role="navigation">
                <button class="nav-characters-button"><span class="fas fa-bars"></span></button>
                <p class="nav-title">CCE &nbsp;<span class="fas fa-dungeon"></span></p>
            </nav>
        `
    }

    function _openNavDrawer(state) {
        navDrawerModule.open(state);
    }

    function renderLayoutNav(state, children) {
        const navBar = renderNavBar(state);
        // const navDrawer = navDrawerModule.renderNavDrawer(state);
        // - then put ${navDrawer} back into the 'return' under the ${navbar}
        // Attach event handlers before 'return'
        // dont forget about event delegation - attach handlers to higher level elements
        
        return `
            ${navBar}
            
            <main role="main">
                ${children}
            </main>
            `
    }

    function renderLayoutNoNav(children) {
        return `
            <main role="main">
                ${children}
            </main>
        `
    }

    return {
        renderLayoutNav,
        renderLayoutNoNav
    }
})();