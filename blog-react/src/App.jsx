import { useState } from 'react'
import { BrowserRouter as Br , Routes , Route  } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Dash from './components/dash'
import './App.css'
import Addpost from './components/addpost'
import Singlepost from './components/singlepost'
import Updatepost from './components/updatepost'
import Users from './pages/users'

function App() {
const [get,setGet] = useState(null)

return(
<>
            <Br>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path='/dashboard' element={<Dash/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/addpost' element={<Addpost/>}/>
                        <Route path='/post/:id' element={<Singlepost/>}/>
                        <Route path='/postbyid/:ids' element={<Updatepost/>}></Route>
                        <Route path="/allusers" element={<Users/>}/>
                    </Routes>
            </Br>



</>)
}

export default App
