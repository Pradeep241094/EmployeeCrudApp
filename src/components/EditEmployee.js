import { useState, useEffect } from 'react';
import './Employees.css';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeList, editEmployeeData } from '../sevrices/employeeapi';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const initialValue = {
    name: '',
    manager: '',
    org: '',
    email: '',
    phone: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditEmployee = () => {
    const [employee, setEmployeeData] = useState(initialValue);
    const { name, manager, org , email, phone } = employee;
    const { id } = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        loadEmployeeDetails();
    }, []); // no dependencies

    const loadEmployeeDetails = async() => {
        const response = await getEmployeeList(id);
        setEmployeeData(response.data);
    }

    const editEmployee = async() => {
        const response = await editEmployeeData(id, employee);
        navigate('/');
    }

    const onChangeValue = (e) => {
        console.log(e.target.value);
        setEmployeeData({...employee, [e.target.name]: e.target.value})
    }

    return (
            <Paper sx={{ width: '100%', height: '970px', overflow: 'hidden' }}>
            <Container>
            <Typography variant="h4">Update Employee Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onChangeValue(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Manager Name</InputLabel>
                <Input onChange={(e) => onChangeValue(e)} name='manager' value={manager} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Organization Details</InputLabel>
                <Input onChange={(e) => onChangeValue(e)} name='org' value={org} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onChangeValue(e)} name='email' value={email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onChangeValue(e)} name='phone' value={phone} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <Stack spacing={2} direction="row">
            <Button  className='action_btn' component={Link} to='/' variant="outlined"> Back </Button>
             <Button className='action_btn' style={{ marginRight: 10, backgroundColor: '#3a5aba' }}  variant="contained" color="primary" onClick={() => editEmployee()}>Update</Button>
            </Stack>
            </FormControl>
            </Container>
            </Paper>
    )
}

export default EditEmployee;