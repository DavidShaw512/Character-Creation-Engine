const authModule = (function() {
    const getToken = () => {
        return localStorage.getItem("token");
    }

    const getUser = () => {
        return localStorage.getItem("user");
    }

    const storeToken = (token) => {
        localStorage.setItem("token", token);
    }

    const storeUser = (user) => {
        localStorage.setItem("user", user);
    }

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    const request = (url, options) => {
        const token = getToken();
        const bearer = `Bearer ${token}`;
        return fetch(url, {
            ...options,
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json"
            }
        })
    }

    return { getToken, getUser, storeToken, storeUser, logOut, request }
})();