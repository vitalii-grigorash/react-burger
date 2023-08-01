import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './components/app/app';
import './index.css';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './utils/socket-middleware';
import { socketMiddlewareProfile } from './utils/socket-middleware-profile';
import { TWSActions, TWSActionsProfile } from './utils/hooks';
import { WsError, WsStatus, WsUpdateOrders } from './services/ws-orders/actions';
import { WsErrorProfile, WsStatusProfile, WsUpdateOrdersProfile } from './services/ws-orders-profile/actions';

const wsActions: TWSActions = {
  onError: WsError,
  onStatus: WsStatus,
  onMessage: WsUpdateOrders
}

const wsActionsProfile: TWSActionsProfile = {
  onErrorProfile: WsErrorProfile,
  onStatusProfile: WsStatusProfile,
  onMessageProfile: WsUpdateOrdersProfile
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions), socketMiddlewareProfile(wsActionsProfile))));

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
