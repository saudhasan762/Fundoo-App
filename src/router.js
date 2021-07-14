import { BrowserRouter , Route, Switch } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Example from './Pages/Example'
import ExampleTwo from './Pages/ExampleTwo'
import ProtectedRoute from './ProtectedRoute'

const Routing = () => {
    return(
        <BrowserRouter>
        <div>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route exact path='/Signup' component={Signup}></Route>
                <ProtectedRoute path='/Dashboard' component={Dashboard}></ProtectedRoute>
            </Switch>
        </div>
        </BrowserRouter>
    )
}

export default Routing