import axios from 'axios';

// with the concept of using json-server library which acts as a local database

const employeesUrl = 'http://localhost:8080/employees'

export const getEmployeeList = async (id) => {
  id = id || '';
  try {
      return await axios.get(`${employeesUrl}/${id}`);
  } catch (error) {
      console.log('Error while calling getEmplyees api ', error);
  }
}

export const addEmployeeData = async (employee) => {
  return await axios.post(`${employeesUrl}`, employee);
}

export const deleteEmployeeData = async (id) => {
  return await axios.delete(`${employeesUrl}/${id}`);
}

export const editEmployeeData = async (id, employee) => {
  return await axios.put(`${employeesUrl}/${id}`, employee)
}
