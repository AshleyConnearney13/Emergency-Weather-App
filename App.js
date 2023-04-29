import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import LoginNavigation from './src/navigation/LoginNavigation';

function App() {
    return (
        <NavigationContainer>
            <LoginNavigation />
        </NavigationContainer>
    );
}

export default App;