import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home'
import Clientes from './pages/Clientes'
import Funcionarios from './pages/Funcionarios'
import Navbar from './components/Navbar'

function App() {
  const [telaAtual, setTelaAtual] = useState('home');

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f8fafc', margin: 0 }}>
      <Navbar setTelaAtual={setTelaAtual} />
      
      <main>
        {telaAtual === 'home' && <Home />}
        {telaAtual === 'clientes' && <Clientes />}
        {telaAtual === 'funcionarios' && <Funcionarios />}
      </main>
    </div>
  )
}

export default App
