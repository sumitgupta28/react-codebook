export async function userLogin(authDetail) {
    const requestOptions = {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(authDetail)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/login`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, statusCode: response.statusCode } //eslint-disable-line
    }
    const data = await response.json();

    if (data.accessToken) {
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }
    return data;
}



export async function logoutUser() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cbid");
}

export async function regiesterUser(authDetail) {
    const requestOptions = {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(authDetail)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, statusCode: response.statusCode } //eslint-disable-line
    }

    const data = await response.json();
    return data;
}