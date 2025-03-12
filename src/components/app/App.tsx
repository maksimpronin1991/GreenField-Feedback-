import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormPage from '../../pages/form/form'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
