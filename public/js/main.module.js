function render(currentState) {
    $("#root").empty();
    switch(currentState.currentPage) {
        case "login":
            console.log("Rendering login page");
            loginModule.render(currentState);
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
    navDrawerModule.initiate(render, STORE);
    loginModule.initiate(render);
    signupModule.initiate(render);
    characterModule.initiate(render);
    render(STORE);
}

$(function() {
    main();
    console.log("App loaded");
})

// Go one page at a time, get things rendering