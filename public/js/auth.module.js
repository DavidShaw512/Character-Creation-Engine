const authModule = (function() {
    const getToken = () => {
        return localStorage.getItem("token");
    }

    const storeToken = (token) => {
        localStorage.setItem("token", token);
    }

    const logOut = () => {
        localStorage.removeItem("token");
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

    return { getToken, storeToken, logOut, request }
})();