export const serverCall = (route, method, body) =>{
    return fetch(`https://face-detect-jb.fly.dev/${route}`, {
      method,
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
}

