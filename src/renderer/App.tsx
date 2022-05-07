import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import { createRoot } from 'react-dom/client';
import Main from './Main';
import './css/app.css';

console.log('Render react')

const App = () => {
    return <ChakraProvider>
        <Main />
    </ChakraProvider>
}

export default App

const root = createRoot(document.getElementById('root'))
root.render(<App />);