import { useState, useEffect } from 'react';
import './Employees.css';
import {
    Box, Grid, Paper, Stack, Table, TableContainer, TableHead, TableCell,
    TableRow, TableBody, Button, styled, Typography, Card, CardContent, CardActions, Switch, FormControlLabel, FormGroup
} from '@mui/material'
import { getEmployeeList, deleteEmployeeData } from '../sevrices/employeeapi';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 20px 0px 0px 50px;
`;

const TableHeader = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #3a5aba;
        color: #FFFFFF;
    }
`;

const TableRowStyled = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;
const columns = [
    { id: 'id', label: 'Employee ID' },
    { id: 'name', label: 'Name' },
    {
        id: 'manager',
        label: 'Manager',
    },
    {
        id: 'org',
        label: 'Organization Details',
    },
    {
        id: 'email',
        label: 'Email',
        align: 'right',
    },
    {
        id: 'phone',
        label: 'Phone',
        align: 'right',
    },
];


const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const deleteUserData = async (id) => {
        await deleteEmployeeData(id);
        getAllEmployees();
    }

    const getAllEmployees = async () => {
        let response = await getEmployeeList();
        setEmployees(response.data);
    }

    const handleSwitcherChange = () => {
        setChecked(!checked)
    }
    return (

        <Paper sx={{ width: '100%', height: '965px', overflow: 'hidden'}}>
            <Typography variant='h3' className={'headerStyle'}>Employee Records</Typography>
            <Stack style={{marginLeft: 70, marginBottom: 20}} spacing={2} direction="row">
                <Button style={{ backgroundColor: '#3a5aba' }} component={Link} to='/add' variant="contained" backgroundColor="#3a5aba" color="primary">
                    Add New Employee
                </Button>
                <FormGroup>
                    <FormControlLabel control={<Switch
                        checked={checked}
                        label={checked ? "Table View" : "Grid View"}
                        onChange={handleSwitcherChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        style={{ color: '#3a5aba' }}
                    />} label={checked ? "Switch to Grid View" : " Switch to Table View"} />
                </FormGroup>
            </Stack>
            {checked ?
                <TableContainer className="paperContainer" sx={{ maxHeight: 950 }}>
                    <StyledTable stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableHeader>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell>Actions</TableCell>
                            </TableHeader>
                        </TableHead>
                        <TableBody>
                            {employees.map((emp) => (
                                <TableRowStyled key={emp.id}>
                                    <TableCell>{emp.id.slice(0, 7)}</TableCell>
                                    <TableCell>{emp.name}</TableCell>
                                    <TableCell>{emp.manager}</TableCell>
                                    <TableCell>{emp.org}</TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                    <TableCell>{emp.phone}</TableCell>
                                    <TableCell>
                                        <Stack spacing={2} direction="row">
                                            <Button color="primary" variant="outlined" component={Link} to={`/edit/${emp.id}`}>Edit</Button>
                                            <Button color="secondary" variant="contained" style={{ backgroundColor: '#b12f2f' }}
                                                onClick={() => deleteUserData(emp.id)}>Delete</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRowStyled>
                            ))}
                        </TableBody>
                    </StyledTable>
                </TableContainer> :
                <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
                    <Grid container spacing={{ xs: 3, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {employees.map((emp) => (
                            <Grid item xs={2} sm={4} md={4} key={emp.id}>
                                <Card sx={{ maxWidth: 450 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {emp.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Phone: {emp.phone} | Email ID: {emp.email}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Organiation: {emp.org} | Manager: {emp.manager}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Stack spacing={2} direction="row">
                                            <Button color="primary" variant="outlined" component={Link} to={`/edit/${emp.id}`}>Edit</Button>
                                            <Button color="secondary" variant="contained" style={{ backgroundColor: '#b12f2f' }}
                                                onClick={() => deleteUserData(emp.id)}>Delete</Button>
                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Grid>

                        ))}
                    </Grid>
                </Box>
            }           
        </Paper>
    )
}

export default EmployeesList;