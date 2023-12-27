import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    realm: "Wineyard",
    url: "http://localhost:8080/",
    clientId: "vineyard-frontend"
  })

keycloak.init({onLoad:  'login-required'})
  .then((authenticated) => {
    if (authenticated) {
        console.log('User is authenticated')
    } else {
        console.log('User isn`t authenticated')
    }
  })
  .catch((error) => console.error('Keycloak initialization failed:', error));

export default keycloak