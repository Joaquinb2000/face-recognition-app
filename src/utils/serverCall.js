export const serverCall = (route, method, body) =>{
    return fetch(`/${route}`, {
      method,
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
}

