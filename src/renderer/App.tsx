import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react'
import { createRoot } from 'react-dom/client';
import Main from './Main';
import './css/app.css';
import { Provider } from 'react-redux';
import { store } from './features/store';
import theme from './utils/theme';

const App = () => {
    return <Provider store={store}>
        <ChakraProvider>
            <Main />
        </ChakraProvider>
    </Provider>
}

export default App

const root = createRoot(document.getElementById('root'))
root.render(<><ColorModeScript initialColorMode={theme.config.initialColorMode} /><App /></>);