import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import Projects from './pages/Projects'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/projects' element={<Projects />} />
        </Routes>

    );
}

export default App;



