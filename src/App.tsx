import { ChakraProvider } from '@chakra-ui/react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home'


function App() {


  return (
      <ChakraProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
      </ChakraProvider>
  )
}

export default App
