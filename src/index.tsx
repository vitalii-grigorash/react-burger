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
import { HashRouter } from 'react-router-dom';
import { socketMiddleware } from './utils/socket-middleware';

import {
  connect as WsConnect,
  disconnect as WsDisconnect,
  wsConnecting as WsConnecting,
  wsOpen as WsOpen,
  wsClose as WsClose,
  wsMessage as WsNessage,
  wsError as WsError
} from "./services/ws-orders/actions";

import {
  connectProfile as WsConnectProfile,
  disconnectProfile as WsDisconnectProfile,
  wsConnectingProfile as WsConnectingProfile,
  wsOpenProfile as WsOpenProfile,
  wsCloseProfile as WsCloseProfile,
  wsMessageProfile as WsNessageProfile,
  wsErrorProfile as WsErrorProfile
} from "./services/ws-orders-profile/actions";

const wsActions = {
  wsConnect: WsConnect,
  wsDisconnect: WsDisconnect,
  wsConnecting: WsConnecting,
  onOpen: WsOpen,
  onClose: WsClose,
  onMessage: WsNessage,
  onError: WsError
};

const wsActionsProfile = {
  wsConnect: WsConnectProfile,
  wsDisconnect: WsDisconnectProfile,
  wsConnecting: WsConnectingProfile,
  onOpen: WsOpenProfile,
  onClose: WsCloseProfile,
  onMessage: WsNessageProfile,
  onError: WsErrorProfile
}

const liveTableMiddleware = socketMiddleware(wsActions);
const liveTableMiddlewareProfile = socketMiddleware(wsActionsProfile);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, liveTableMiddleware, liveTableMiddlewareProfile)));

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
