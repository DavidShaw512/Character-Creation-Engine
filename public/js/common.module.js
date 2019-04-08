const commonModule = (function() {

    function renderNavBar() {
        return `
            <nav class="nav" role="navigation">
                <button class="nav-drawer-button"><span class="fas fa-bars"></span></button>
                <p class="nav-title">Logout &nbsp;<span class="fas fa-dungeon"></span></p>
            </nav>
        `;
    }

    function _openNavDrawer(state) {
        $(".nav-drawer-button").click(function(event) {
            event.preventDefault;
            navDrawerModule.open(state);
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
            _openNavDrawer(state);
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

    return {
        attachEventHandlers,
        renderLayoutNav,
        renderLayoutNoNav
    }
})();