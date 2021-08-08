/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */import messaging from '@react-native-firebase/messaging';




import React, { useState, useEffect, Fragment } from 'react';
import 'react-native-gesture-handler';

import { ThemeProvider } from 'styled-components/native'
import { lightTheme } from 'themes/LightTheme'
import AppNavigation from 'navigation/AppNavigation';
import { UserContext } from 'context/UserContext';
import { PrivateModeProvider } from 'context/PrivateModeContext'
import OnlineOnlyModal from 'components/shared/OnlineOnlyModal';
import { NetworkContext } from 'context/NetworkContext';
import { FilterProvider } from 'context/FilterContext'
import { ModalContext } from 'context/ModalContext';

declare const global: { HermesInternal: null | {} };

const App = () => {
  const [user, setUser] = useState('')
  const [access, setAccess] = useState('')

  const [connectionType, setConnectionType] = useState('unknown');
  const [isConnected, setIsConnected] = useState(true);
  const [onlineOnlyModalActive, setOnlineOnlyModalActive] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <UserContext.Provider value={{ user, setUser, access, setAccess }}>
          <PrivateModeProvider>
            <FilterProvider>
              <NetworkContext.Provider value={{ connectionType, setConnectionType, isConnected, setIsConnected }}>
                <ModalContext.Provider value={{ emailModal, setEmailModal }}>
                  <OnlineOnlyModal
                    transparent={true}
                    animationType="fade"
                    visible={onlineOnlyModalActive}
                    isConnected={isConnected}
                    setVisible={setOnlineOnlyModalActive} />
                  <AppNavigation />
                </ModalContext.Provider>
              </NetworkContext.Provider>
            </FilterProvider>
          </PrivateModeProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
