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
import messaging from '@react-native-firebase/messaging';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

const persistedStore = persistStore(store);
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});
const ReduxApp = () => (

    <AutocompleteDropdownContextProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
                <App />
            </PersistGate>
        </Provider>
    </AutocompleteDropdownContextProvider>
)
AppRegistry.registerComponent(appName, () => ReduxApp);
