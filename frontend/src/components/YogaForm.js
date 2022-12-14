import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Form from "./Form";
import ChangeBatch from "./ChangeBatch";
import PayFees from "./PayFees";
import {Button, ButtonGroup, Grid, Typography} from "@material-ui/core";


function HomeFormPage() {
    return <BrowserRouter>
        <Switch>
            <Route exact path="/" render={() => {
                return renderHomePage();
            }
            }/>
            <Route path='/form' component={Form}/>
            <Route path='/change-batch' component={ChangeBatch}/>
            <Route path='/pay-fees' component={PayFees}/>
        </Switch>
    </BrowserRouter>
}

function renderHomePage() {
    return (
        <Grid container spacing={3} align='center'>
            <Grid item xs={12}>
                <Typography variant='h3' component='h3'>
                    Welcome to FlexMoney Yoga Classes
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup variant='contained' color='primary'>
                    <Button color='secondary' to='/pay-fees' component={Link}>
                        Wanna continue your subscription?
                    </Button>
                    <Button color='primary' to='/form' component={Link}>
                        Join Us
                    </Button>
                    <Button color='secondary' to='/change-batch' component={Link}>
                        Wanna change your batch timing?
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}

export default HomeFormPage;