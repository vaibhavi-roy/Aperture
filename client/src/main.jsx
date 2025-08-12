import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { App as AntApp } from 'antd'
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css'
import './index.css'
import store from './redux/store.js';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AntApp>
      <App />
    </AntApp>
  </Provider>,
)