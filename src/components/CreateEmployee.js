import { useState } from 'react';
import './Employees.css';
import { Paper, FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, Stack} from '@mui/material';
import { addEmployeeData } from '../sevrices/employeeapi';
import { useNavigate, Link } from 'react-router-dom';

const initialValue = {
    name: '',
    manager: '',
    org: '',
    email: '',
    phone: ''
}

const FormContainer = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
        margin-bottom: 30px;
`;

const CreateEmployee = () => {
    const [employee, setEmployee] = useState(initialValue);
    const { name, manager, org, email, phone } = employee;
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setEmployee({...employee, [e.target.name]: e.target.value})
    }

    const addEmploymentRecord = async() => {
        await addEmployeeData(employee);
        navigate('/');
    }

    return (
        <Paper sx={{ width: '100%', height: '970px', overflow: 'hidden' }}>
            <FormContainer>
            <Typography variant='h3' className={'headerStyle'}>Add Employee Data</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Manager Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='manager' value={manager} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Organisation Details</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='org' value={org} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl>
            <FormControl>
            <Stack spacing={2} direction="row">
                <Button component={Link} to='/' variant="outlined"> Back </Button>
                <Button 
                 color="primary" 
                 variant="contained" 
                 style={{marginRight:10, backgroundColor: '#3a5aba', float:'right'}}
                 onClick={() => addEmploymentRecord()}>
                 Create
                </Button>
            </Stack>
            </FormControl>
            </FormContainer>
        </Paper>
    )
}

export default CreateEmployee;