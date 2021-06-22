import { BrowserRouter , Route, Switch } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

const Routing = () => {
    return(
        <BrowserRouter>
        <div>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route exact path='/Signup' component={Signup}></Route>
            </Switch>
        </div>
        </BrowserRouter>
    )
}

export default Routing