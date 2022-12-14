import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {
    Button,
    Collapse,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 70,
    }
}))

export const Form = (props) => {
    const [id, setID] = useState(null)
    const [batch, setBatch] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [errorMsg, setError] = useState('')
    const [successMsg, setSuccess] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)

    const AMOUNT = 500;

    const classes = useStyles()

    const batchOnChange = (e) => {
        setBatch(e.target.value)
    }

    const nameOnChange = (e) => {
        setName(e.target.value)
    }

    const ageOnChange = (e) => {
        setAge(e.target.value)
    }

    const submitDetails = () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                Name: name,
                Age: age,
                Batch: batch
            })
        }
        fetch('/api/create-form', options)
            .then((response) => response.json()).then((data) => {
            console.log(data)
            if (data.id != null) {
                setID(data.id)
                setIsSubmit(true)
                setSuccess('Success')
                alert('We Successfully Received Your Details, Please complete your payment now')
            } else if (data.error !== '') {
                alert(data.error)
            } else {
                setError('Error Updating Room')
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
                alert(`Payment Completed, Here is your Unique REFERENCE ID: ${id} , Please note down this Reference ID because you will need this later on when you want to change your batch or paying fees`)
            } else if (data.error !== '') {
                alert(data.error)
            } else {
                alert('Something went wrong on our side')
            }
            props.history.push(`/`)
        })
    }

    const categoryDB = [
        {
            label: "Choose a batch",
            value: "Info"
        },
        {
            label: '6AM-7AM',
            value: 'Morning-1'
        },
        {
            label: '7AM-8AM',
            value: 'Morning-2'
        },
        {
            label: '8AM-9AM',
            value: 'Morning-3'
        },
        {
            label: "5AM-6PM",
            value: 'Evening-4'
        }
    ]

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
                    Join Our Yoga Classes Today For Just 500rs !!
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField label='Name' placeholder='Enter Your Name' value={name}
                           variant='outlined' onChange={nameOnChange}/>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField type="number" label='Age' placeholder='Enter Your Age' value={age}
                           variant='outlined' onChange={ageOnChange}/>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl className={classes.formControl}>
                    <InputLabel>Batch</InputLabel>
                    <Select onChange={batchOnChange}>
                        {categoryDB.map((option, i) => (
                            <MenuItem key={i} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' color='primary' onClick={submitDetails}>Submit Details</Button>
            </Grid>

            <Grid item xs={12} align="center">
                <Typography variant='h5' component='h5'>
                    Payment
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField label='Name' placeholder='Enter Your Name' value={name}
                           variant='outlined' onChange={nameOnChange} disabled={true}/>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField type="number" label='Amount' placeholder='Enter Your Age' value={AMOUNT}
                           variant='outlined' disabled={true}/>
            </Grid>

            <Grid item xs={12} align="center">
                <Button variant='contained' color='primary' onClick={completePayment} disabled={!isSubmit}>Complete
                    Payment and submit form</Button>
            </Grid>
        </Grid>
    );
};

export default Form;