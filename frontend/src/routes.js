
const api = '/api/v1';

 const routes = {
     apiLogin: () => [api, 'login'].join('/'),
     apiRegister: () => [api, 'register'].join('/'),
     apiData: () => [api, 'data'].join('/'),
     rootPage: () => '/',
     login: () => '/login',
 }

 export default routes;