const axios = require('axios');
const { token_medium, token_discord } = require('./config.json');

const userna = 'aristizabal.ocampo'; // reemplaza username con el nombre de usuario del usuario que deseas obtener


setInterval(async () => {
    const username = await obtenerUsuario(userna);
    const url = `https://api.medium.com/v1/users/${username}/publications`;
    const lastPublicationId = await ultimaPublicacion();

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token_medium}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);
    // const newPublicationId = data.data[0].id;
    const newPublicationId = data.data;

    if (newPublicationId !== lastPublicationId) {
        console.log('El usuario ha publicado un nuevo artículo');
        lastPublicationId = newPublicationId;
    }
}, 6000); // Intervalo de tiempo en milisegundos (60 segundos en este ejemplo)

async function ultimaPublicacion() {
    const publicationsUrl = `https://api.medium.com/v1/users/${username}/publications`;

    const publicationsResponse = await fetch(publicationsUrl, {
        headers: {
            'Authorization': `Bearer ${token_medium}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const publicationsData = await publicationsResponse.json();
    if (publicationsData){

        // return publicationsData.data[0].id;
        console.log(publicationsData);
        return publicationsData.data;
    }else{
        console.log("No hay articulos");
    }
}

async function obtenerUsuario(username) {
    const url = `https://api.medium.com/v1/users/${username}`;

const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token_medium}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const data = await response.json();
console.log(data);
return data.data.id;
}

// const url = 'https://api.medium.com/v1/webhooks';
// const token = 'tu_token_de_acceso_a_Medium';

// const payload = {
//   "data": {
//     "attributes": {
//       "url": "https://tu_url_de_webhook",
//       "events": ["newPost"],
//       "targetUrl": "https://tu_url_de_destino"
//     },
//     "type": "webhook"
//   }
// };

// axios.post(url, payload, {
//   headers: {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   },
// })
// .then(response => console.log(response.data))
// .catch(error => console.log(error));
