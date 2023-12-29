import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    realm: "Wineyard",
    url: "http://localhost:8080/",
    clientId: "vineyard-frontend"
  })

keycloak.init({onLoad:  'login-required'})
  .then((authenticated) => {
    if (authenticated) {
        console.log('SCAFFOLD :: User is authenticated')
        sessionStorage.setItem('wineyard-token', keycloak.token!);
    } else {
        console.log('SCAFFOLD :: User isn`t authenticated')
    }
  })
  .catch((error) => console.error('SCAFFOLD :: Keycloak initialization failed:', error));

export default keycloak