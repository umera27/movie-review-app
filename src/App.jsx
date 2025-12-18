import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Favorites from './Pages/Favorites'
import NavBar from './Components/NavBar'
import {MovieProvider} from './context/MovieContext'


function App(){
  return (
    <MovieProvider>
     <header>
      <NavBar />
     </header>
     <main className='main-content'>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
     </main>
    </MovieProvider>
  )
}

export default App