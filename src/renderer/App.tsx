import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import ReactDOM from 'react-dom';
import Main from './Main';

console.log('Render react')

const App = () => {
    return <ChakraProvider>
        <Main />
    </ChakraProvider>
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))