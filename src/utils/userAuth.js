export const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
    })
    .then((resp) => {
        try {
            if (resp.status === 201) {
                return resp.json();
            }
        } catch(e){
            return e
        }
    })
    .then((res) => {
        return res
    })
    .catch((err) => console.log(err))
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',   
        body: JSON.stringify({email, password})
    })
    .then((resp) => {
        return resp.json()
    })
    .then((data) => {
        if (data.token) {
            localStorage.setItem('jwt', data.token);
            return data
        } else {
            return;
        }
    })
    .catch(err => console.log(err))
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        credentials: 'include',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
}