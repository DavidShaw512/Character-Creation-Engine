// EVENTS ON SIGNUP PAGE:
// Submit new user info (POST user), switch over to Character Build page

const signupModule = (function() {
    // Private

    let _render = false;
    
    function _renderForm() {
        return `
            <form>
                <input type="email" class="signup-field" id="js-signup-email" placeholder="Email"><br>
                <input type="password" class="signup-field" id="js-signup-password" placeholder="Password"><br>
                <button class="signup-button" id="js-signup-button">Sign Up</button>
            </form>
        `;
    };

    function _submitUser(state) {

        $('#js-signup-button').click(function(event) {
            event.preventDefault();
            const newEmail = document.getElementById("js-signup-email").value;
            const newPassword = document.getElementById("js-signup-password").value;
            console.log(newEmail);
            apiModule.signup(newEmail, newPassword)
                .then(() => {
                    state.currentPage = "login";
                    render(state);
                })
                .catch(err => {
                    console.log(err);
                    // handle errors here
                })
            // apiModule.postUser("this new user");

            // THIS CODE IS THE NEW WAY OF CHANGING PAGES, WITH A ROUTER:
            // let rootDiv = document.getElementById('root');
            // rootDiv.innerHTML = routes[window.location.character];

            // THIS CODE IS THE OLD WAY OF CHANGING PAGES, WITHOUT THE ROUTER:
            
        })
        
        
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    };

    function renderSignupPage(state) {
        const signupForm = _renderForm();
        const signupPageContent = `
            <div class="page-container">
                <header role="banner">
                        <h1>Create New User</h1>
                </header>
                <div class="login-box" role="section">
                    ${signupForm}
                </div>
            </div>
        `;

        const signupPage = commonModule.renderLayoutNoNav(signupPageContent);
        $("#root").append(signupPage);
        _renderForm();
        _submitUser(state);
    }

    return {
        render: renderSignupPage,
        initiate
    }
    
})();

