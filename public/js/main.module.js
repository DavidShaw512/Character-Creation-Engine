function render(currentState) {
    $("#root").empty();
    // check here if there is a token, if there is you can bypass login and go straight to character page
    // check in the store, if token is there redirect to character page
    switch(currentState.currentPage) {
        case "login":
            console.log("Rendering login page");
            // use auth module to get token
            const token = authModule.getToken();
            if (token) {
                apiModule.getCurrentUser()
                    .then(user => {
                        currentState.currentUser = user;
                        currentState.currentPage = "character";
                        render(currentState);
                    })
                    .catch(error => {
                        currentState.currentPage = "login";
                        render(currentState);
                    })
            } else {
                currentState.currentPage = "login";
                loginModule.render(currentState);
            }
            break;
        case "signup":
            console.log("Rendering signup page");
            signupModule.render(currentState);
            break;
        case "character":
            characterModule.render(currentState);
            console.log("Rendering character build page");
            break;
    };
}

function main() {
    loginModule.initiate(render);
    signupModule.initiate(render);
    characterModule.initiate(render);
    navDrawerModule.initiate(render, STORE);
    render(STORE);
}

$(function() {
    main();
    console.log("App loaded");
})

// Go one page at a time, get things rendering