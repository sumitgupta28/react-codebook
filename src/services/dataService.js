
function getUserSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbId = JSON.parse(sessionStorage.getItem("cbid"));
    return { cbId, token };
}

export async function getUserOrder(params) {
    const { cbId, token } = getUserSession();
    const newLocal = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${cbId}`, newLocal);
    if (!response.ok) {
        throw { message: response.statusText, statusCode: response.statusCode } //eslint-disable-line
    }

    const orderData = await response.json();
    return orderData;
}

export async function createOrder(cartList, total, user) {
    const { token } = getUserSession();
    const order = {
        products: cartList,
        total: total,
        quantity: cartList.length,
        created_dt: new Date(),
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw { message: response.statusText, statusCode: response.statusCode } //eslint-disable-line
    }
    const orderData = await response.json();
    return orderData;
}


export async function getLoggedInUserDetails() {
    const { cbId, token } = getUserSession();

    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    };
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${cbId}`, requestOptions);
    if (!response.ok) {
        throw { message: response.statusText, statusCode: response.statusCode } //eslint-disable-line
    }
    const data = await response.json();
    return data;
}