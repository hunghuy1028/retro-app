import ListBoard from "../listBoards";
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Board from "../boards/main";
import NotFoundPage from "./notFoundPage";
import Login from "../User/NotLogin/login"
import SignUp from "../User/NotLogin/signUp";
import HomePage from "./homepage";
import Profile from "../User/Logged/profile";
import passwordChange from "../User/Logged/passwordChange";

export default function App()
{


    return(
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/dashboard" exact component={ListBoard}/>
                    <Route path="/users/profile" component={Profile}/>
                    <Route path="/users/changePassword" component={passwordChange}/>
                    <Route path="/boards" component={(match) => <Board match = {match}/>}/>
                    <Route path="/login" component={(location) => <Login location={location}/>}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route component={NotFoundPage}/>
                </Switch>

            </Router>
        </React.Fragment>
    )
}