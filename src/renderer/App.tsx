import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import { createRoot } from 'react-dom/client';
import Main from './Main';
import './css/app.css';
import Provider from './context/StoreContext';

const App = () => {
    return <Provider>
        <ChakraProvider>
            <Main />
        </ChakraProvider>
    </Provider>
}

export default App

const root = createRoot(document.getElementById('root'))
root.render(<App />);