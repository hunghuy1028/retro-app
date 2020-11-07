import ListBoard from "../listBoards";
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Board from "../boards/main";
import NotFoundPage from "./notFoundPage";
import MyAppBar from "./header";
import Login from "../User/login"
import SignUp from "../User/signUp";
import HomePage from "./homepage";

export default function App()
{
    return(
        <React.Fragment>
            <Router>
                <MyAppBar/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/users" exact component={ListBoard}/>
                    <Route path="/boards" component={(match) => <Board match = {match}/>}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route component={NotFoundPage}/>
                </Switch>

            </Router>
        </React.Fragment>
    )
}