// EVENTS ON LOGIN PAGE: 
// Submit login credentials/move on to character build page, click on to signup page

const loginModule = (function() {
    // private

    let _render = false;

    function _handleSubmitCredentials(state) {
        $('#js-login-button').click(function(event) {
            event.preventDefault();
            const email = document.getElementById("js-email").value;
            const password = document.getElementById("js-password").value;
            // const rememberMe = document.getElementById("js-remember-me").value; PASS THIS INTO THE LOGIN FUNCTION
            apiModule.login(email, password)
                .then(response => {
                    console.log(response);
                    state.currentUser = response // make sure it's actually returning the user so this makes sense;
                    state.currentPage = "character";
                    console.log(STORE);
                    render(state);
                    // Make a 'remember me' option
                })
                .catch(err => {
                    console.log(err);
                    // Handle authentication errors here
                    // Put a loading spinner in case it's laggy, turns on in transit
                    // and turns off on success/error
                })
        })
    }
    
    function _handleClickSignUp(state) {
        $('#js-new-user-link').click(function(event) {
            event.preventDefault();

            // THIS CODE IS THE NEW WAY OF CHANGING PAGES, WITH A ROUTER:
            // let rootDiv = document.getElementById('root');
            // rootDiv.innerHTML = routes[window.location.signup];

            // THIS CODE IS THE OLD WAY OF CHANGING PAGES, WITHOUT THE ROUTER:
            state.currentPage = "signup";
            render(state);
        })
        
        
        
    }

    // public
    
    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    };

    function renderLoginPage(state) {
        const loginPageContent = `
            <div class="page-container">
                <header role="banner">
                        <h1>Character Creation Engine</h1>
                </header>
                <div class="login-box" role="section">
                    <form id="login-form">
                        <input type="email" class="login-field" id="js-email" placeholder="Email"><br>
                        <input type="password" class="login-field" id="js-password" placeholder="Password"><br>
                        <button class="login-button" id="js-login-button">Login</button>
                    </form>
                </div>
                <p class="new-user-link">New to us? <button id="js-new-user-link" style="border: 1px dotted">Sign up here</button></p>
            </div>
        `
    
        const loginPage = commonModule.renderLayoutNoNav(loginPageContent);
        $('#root').append(loginPage);
        _handleSubmitCredentials(state);
        _handleClickSignUp(state);
    };

    return {
        render: renderLoginPage,
        initiate
    }
})();

