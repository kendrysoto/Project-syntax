import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchEmployees, fetchEmployeesId } from '../redux/AsyncActions';
import UsePagination from './UsePagination';



const Table = ({ Data, fetchEmployees }) => {

    useEffect(() => {
        fetchEmployees()
    }, [])

    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalDuplicate, setModalDuplicate] = useState(false);
    const [averageSalary, setAverageSalary] = useState(0);
    const [data, setData] = useState(Data);

    const [selectedEmployee, setSelectedEmployee] = useState({
        id: '',
        employeeName: '',
        employeeSalary: '',
        employeeAge: ''
    });

    const selectEmployee = (employee, caso) => {
        setSelectedEmployee(employee);
        if (caso === 'Edit') {
            setModalEditar(true)
        } else if (caso === 'Delete') {
            setModalEliminar(true)
        } else if (caso === 'Duplicate') {
            setModalDuplicate(true)
        }
    }

    const averageSalaryEmployee = () => {
        let sum = Data.reduce((previous, current) => current.employeeSalary += previous.employeeSalary);
        setAverageSalary(sum / Data.length);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedEmployee((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const setColorBySalary = (salary) => {
        var salaryNumber = parseFloat(salary);
        if (salaryNumber > 3000) {
            return <p className="text-success">€{salaryNumber}</p>
        } else if (3000 >= salaryNumber && salaryNumber >= 1000) {
            return <p className="text-primary">€{salaryNumber}</p>
        } else if (1000 > salaryNumber) {
            return <p className="text-danger">€{salaryNumber}</p>
        }
    }

    const editEmployee = () => {
        fetch('https://labsserviceemployee.azurewebsites.net/employees/' + selectedEmployee.id, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    'id': selectedEmployee.id,
                    'employeeName': selectedEmployee.employeeName,
                    'employeeSalary': selectedEmployee.employeeSalary,
                    'employeeAge': parseInt(selectedEmployee.employeeAge),
                    'profileImage': ''
                }
            ),
            headers: {
                "content-type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(response => response.json())
            .then(jsondata => {
                fetchEmployees()
            })
            .catch(error => {
                console.log(error)
            })
        setModalEditar(false);

    }

    const deleteEmployee = () => {
        fetch('https://labsserviceemployee.azurewebsites.net/employees/' + selectedEmployee.id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(jsondata => {
                fetchEmployees()
            })
            .catch(error => {
                console.log(error)
            })
        setModalEliminar(false);
        setModalEditar(false);
    }

    const abrirModalInsertar = () => {
        setSelectedEmployee(null);
        setModalInsertar(true);
    }

    const createEmployee = (copyEmployee) => {
        if (copyEmployee) {
            setSelectedEmployee(copyEmployee)
        }
        console.log(selectedEmployee)
        fetch('https://labsserviceemployee.azurewebsites.net/employees', {
            method: 'POST',
            body: JSON.stringify(
                {
                    'employeeName': selectedEmployee.employeeName,
                    'employeeSalary': selectedEmployee.employeeSalary,
                    'employeeAge': parseInt(selectedEmployee.employeeAge),
                    'profileImage': ''
                }
            ),
            headers: {
                "content-type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(response => response.json())
            .then(jsondata => {
                fetchEmployees()


            })
            .catch(error => {
                console.log(error)
            })

        setModalInsertar(false);
        setModalDuplicate(false)
    }

    const itemsPerPage2 = 2;

    return (
        <div className="App">
            <UsePagination
                itemsPerPage2={itemsPerPage2}
                modalEditar={modalEditar}
                setModalEditar={setModalEditar}
                modalEliminar={modalEliminar}
                setModalEliminar={setModalEliminar}
                modalInsertar={modalInsertar}
                setModalInsertar={setModalInsertar}
                modalDuplicate={modalDuplicate}
                setModalDuplicate={setModalDuplicate}
                averageSalary={averageSalary}
                setAverageSalary={setAverageSalary}
                data={Data}
                setData={setData}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
                selectEmployee={selectEmployee}
                averageSalaryEmployee={averageSalaryEmployee}
                setSelectedEmployee={setSelectedEmployee}
                handleChange={handleChange}
                setColorBySalary={setColorBySalary}
                editEmployee={editEmployee}
                deleteEmployee={deleteEmployee}
                abrirModalInsertar={abrirModalInsertar}
                createEmployee={createEmployee}
            >
            </UsePagination>
        </div>
    );
};

const mapStatetoProps = state => {
    return {
        Data: state.Em,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchEmployees: () => dispatch(fetchEmployees()),
        fetchEmployeesId: (id) => dispatch(fetchEmployeesId(id))
    }
}

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(Table);