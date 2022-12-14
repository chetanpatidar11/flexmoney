import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {
    Button,
    Collapse,
    FormControl,
    Grid,
    InputLabel,
    Link,
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

export const ChangeBatch = () => {
    const [id, setID] = useState(null)
    const [batch, setBatch] = useState("")
    const [errorMsg, setError] = useState('')
    const [successMsg, setSuccess] = useState('')

    const classes = useStyles()

    const batchOnChange = (e) => {
        setBatch(e.target.value)
    }

    const idOneChange = (e) => {
        setID(e.target.value)
    }

    const changeBatch = () => {
        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                Batch: batch
            })
        }
        fetch(`/api/change-batch/${id}`, options)
            .then((response) => response.json()).then((data) => {
                console.log(data)
                if (!data.error) {
                    alert('Successfully Changed Batch')
                } else if (data.error !== '') {
                    alert(data.error)
                }
                else {
                    alert('Something went wrong on our side')
                }
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
                    Change Your Batch Here
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField type="number" label='Reference ID' placeholder='Enter Your Age' value={id}
                           variant='outlined' onChange={idOneChange}/>
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
                <Button variant='contained' color='primary' onClick={changeBatch}>Submit Details</Button>
            </Grid>
        </Grid>
    );
};

export default ChangeBatch;