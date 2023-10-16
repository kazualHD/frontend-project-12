import React from 'react';
import Login from './pages/Login';
import ErrroPage from './pages/Error';
import MainPage from './pages/MainPage';
import UseUserHoc from './components/Hoc';
import {Provider} from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import {AuthProvider} from './contexts/authorizationContext';
import store from './slices/index.js';

const App = () => {
    return (
        <AuthProvider>
        <Provider store={store}>  
        <BrowserRouter>
        <Routes>
        <Route path={routes.rootPage()} element={<UseUserHoc><MainPage /></UseUserHoc>} />
        <Route path={routes.login()} element={<Login />} />
        <Route path='*' element={<ErrroPage/>} />
        </Routes>
        </BrowserRouter>
        </Provider>
        </AuthProvider>
    )
}
export default App;