import './App.css';
import TransactionTable from './projeto/Formulario'; 
import CadastroConta from './projeto/insertData'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  

  return (
    <div>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<TransactionTable />} />
                <Route path="/cadastro" element={<CadastroConta />} />
            </Routes>
            </BrowserRouter>
      </div>
    
  )
}

export default App;
