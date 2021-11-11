import { BrowserRouter, Switch, Route } from "react-router-dom";


import Home from "../pages/Home";
import SignIn from "../pages/SignIn";


function routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" component={SignIn}/>
            </Switch>
        
        </BrowserRouter>

    )
}

export default routes;