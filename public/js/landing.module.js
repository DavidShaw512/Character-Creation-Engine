"use strict"

const landingModule = (function() {
    // Private

    let _render = false;

    function _goToLogin(state) {
        $('#js-landing-login-button').click(function(event) {
            event.preventDefault();
            state.currentPage = 'login';
            render(state)
        });
    };

    function _goToSignup(state) {
        $('#js-landing-signup-button').click(function(event) {
            event.preventDefault();
            state.currentPage = 'signup';
            render(state)
        });
    };



    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    };

    function renderLandingPage(state) {
        const landingPageContent = `
            <div class="auth-container">
                <header class="auth-header" role="banner">
                        <h1>
                            <img class="main-logo" src="../img/d20-icons-circle.png"><br>
                            <span class="red">C</span>haracter <span class="red">C</span>reation <span class="red">E</span>ngine
                        </h1>
                </header>
                <div class="login-box" role="section">
                    <p>Quickly randomize DnD 5e characters, or customize them to make them your own!</p>
                    <p>Demo login credentials:<br/>
                    test@test.com<br/>
                    tester</p>
                    <button class="landing-button landing-login-button" id="js-landing-login-button">Login</button><br>
                    <button class="landing-button landing-signup-button" id="js-landing-signup-button">Signup</button>
                </div>
            </div>
        `;


        const landingPage = commonModule.renderLayoutNoNav(landingPageContent);
        $("#root").append(landingPage);
        _goToLogin(state);
        _goToSignup(state);
    }

    return {
        render: renderLandingPage,
        initiate
    };
})();