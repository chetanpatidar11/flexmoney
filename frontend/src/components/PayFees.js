import React, {useState} from "react";
import {Button, Collapse, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 70,
    }
}))

export const PayFees = () => {
    const [id, setID] = useState(null)
    const [errorMsg, setError] = useState('')
    const [successMsg, setSuccess] = useState('')

    const classes = useStyles()

    const AMOUNT = 500

    const idOneChange = (e) => {
        setID(e.target.value)
    }

    const checkStatus = () => {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }
        if (id == null) {
            alert("Please Enter Your Reference ID")
        }
        fetch(`/api/check/${id}`, options)
            .then((response) => response.json()).then((data) => {
            console.log(data)
            if (!data.is_fees_paid && data.error === '') {
                alert(`Please continue and play your fees for this month`)
            } else if (data.is_fees_paid && data.error === '') {
                alert("No need to pay, you're already done with your payment")
            } else {
                alert(data.error)
            }
        })
    }

    const completePayment = () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                FormUser: id,
                Amount: AMOUNT,
            })
        }
        fetch('/api/payment-form', options)
            .then((response) => response.json()).then((data) => {
            console.log(data)
            if (!data.error) {
                alert(`Yay! thanks for be with us this month too`)
            } else if (data.error !== '') {
                alert(data.error)
            } else {
                alert('Something went wrong on our side')
            }
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={errorMsg !== '' || successMsg !== ''}>
                    {successMsg !== '' ? (<Alert severity='success' onClose={() => {
                        setSuccess('')
                    }}>{successMsg}</Alert>) : (<Alert severity='danger' onClose={() => {
                        setError('')
                    }}>{errorMsg}</Alert>)}
                </Collapse>
                <Typography variant='h4' component='h4'>
                    Pay your fees
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField type="number" label='Reference ID' placeholder='Enter Your Age' value={id}
                           variant='outlined' onChange={idOneChange}/>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField type="number" label='Amount' placeholder='Enter Your Age' value={AMOUNT}
                           variant='outlined' disabled={true}/>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' color='primary' onClick={checkStatus}>Please first your fees status from
                    here</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' color='primary' onClick={completePayment}>Pay</Button>
            </Grid>
        </Grid>
    );
};

export default PayFees;