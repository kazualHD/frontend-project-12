import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';

import Layout from './components/AppLayout.jsx';
import LoginPage from './pages/Login.jsx';
import MainPage from './pages/MainPage.jsx';
import NotFoundPage from './pages/Error.jsx';
import RequireAuth from './components/SecureRoute.jsx';
import SignupPage from './pages/SignUp.jsx';
import { AuthProvider } from './contexts/AuthorizatContext.jsx';
import store from './slices/index.js';
import routes from './routes';
import { SocketApiProvider } from './contexts/SocketContext';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.REACT_APP_ROLLBAR_ENVIROMENT,
};

const App = ({ socket }) => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <Provider store={store}>
          <SocketApiProvider socket={socket}>
            <BrowserRouter>
              <Routes>
                <Route path={routes.rootPage()} element={<Layout />}>
                  <Route
                    path={routes.rootPage()}
                    element={<RequireAuth><MainPage /></RequireAuth>}
                  />
                  <Route path={routes.loginPage()} element={<LoginPage />} />
                  <Route path={routes.signupPage()} element={<SignupPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </SocketApiProvider>
        </Provider>
      </AuthProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
