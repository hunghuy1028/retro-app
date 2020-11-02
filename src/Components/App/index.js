import ListBoard from "../listBoards";
import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Board from "../boards";
import Button from "@material-ui/core/Button";
import notFoụndPage from "./notFoundPage";
import NotFoundPage from "./notFoundPage";

export default function App()
{
    return(
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/user" exact component={ListBoard}/>
                    <Route path="/board" component={(match) => <Board match = {match}/>}/>
                    <Route component={NotFoundPage}/>
                </Switch>

            </Router>
        </React.Fragment>
    )
}