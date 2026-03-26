
const URL = 'https://jsonplaceholder.typicode.com/users/1'

//POST
 
fetch(URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'id': 11,
        'name': 'John Doe',
        'email': 'john.doe@example.com',
        'username': 'johndoe'
    })
})
.then(response => {
    console.log(response.status)
    return response.json()
})
.then(data => 
    console.log(data))