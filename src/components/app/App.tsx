import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormPage from '../../pages/form/form'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage user={{
          firstName: 'Max',
          lastName: 'Trodcki',
          photo: null
        }} item={{
          name: 'Blue boxes',
        }} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
