
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from './redux-toolkit/store.jsx'
import NotificationProvider from './components/NotificationProvider/index.jsx'
import "./components/Layout/layout.css";
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <NotificationProvider/>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
