/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const persistedStore = persistStore(store);

const ReduxApp = () => (
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistedStore}> */}
        <App />
        {/* </PersistGate> */}
    </Provider>
)
AppRegistry.registerComponent(appName, () => ReduxApp);
