import React from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export default function HomePage()
{
    return(
        <React.Fragment>
            <h1>Đây là homepage</h1>
            <Link to="/login">
                <Button>
                    Đăng nhập
                </Button>
            </Link>

            <Link to="/signup">
                <Button>
                    Đăng kí
                </Button>
            </Link>

        </React.Fragment>

    )
}