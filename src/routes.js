import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import Filme from './pages/Filme';
import Erro from './pages/Erro';
import Favoritos from './pages/Favoritos';

//Components
import Header from './component/header';

function RoutesApp(){
    return(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/filme/:id" element={ <Filme/> } />
            <Route path='/favoritos' element={ <Favoritos/> } />
            
            <Route path="*" element={ <Erro/> }/>
        </Routes>
    </BrowserRouter>
    )
}

export default RoutesApp;