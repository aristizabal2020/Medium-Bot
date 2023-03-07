const axios = require('axios');
const { token_medium, token_discord } = require('./config.json');

const username = 'aristizabal.ocampo'; // reemplaza con el nombre de usuario del usuario que deseas obtener

axios.get(`https://api.medium.com/v1/resolve?username=${username}`, {
  headers: {
    'Authorization': `Bearer ${token_medium}`, // reemplaza con tu access token
    'Content-Type': 'application/json'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));