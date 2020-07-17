import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';


const mystyle2 = {
    position: "absolute",
    left: "80px",
    height: "40px",
    right: "0px",
    bottom: "0px",
    top: "100px",
};

const UsePagination = (data) => {

    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.data.length / 5);

    function currentData() {
        const begin = (currentPage - 1) * 5;
        const end = begin + 5;
        return data.data.slice(begin, end);
    }

    function next() {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }

    return (
        <div className="App">

            <br />
            <div className="mb-8">
                <div className="text-left mb-3">
                    <button style={mystyle2} className="text-left btn btn-success" onClick={() => data.abrirModalInsertar()}>Add Employee</button>
                </div>
                <div>
                </div>
            </div>

            <br /><br />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData().map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.employeeName}</td>
                            <td>{data.setColorBySalary(employee.employeeSalary)}</td>
                            <td>{employee.employeeAge}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => data.selectEmployee(employee, 'Duplicate')}>Duplicate</button>{"   "}
                                <button className="btn btn-primary" onClick={() => data.selectEmployee(employee, 'Edit')}>Edit / Detail</button> {"   "}
                                <button className="btn btn-danger" onClick={() => data.selectEmployee(employee, 'Delete')}>Delete</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <Modal isOpen={data.modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Edit Employee</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            name="id"
                            value={data.selectedEmployee && data.selectedEmployee.id}
                        />
                        <br />

                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="employeeName"
                            value={data.selectedEmployee && data.selectedEmployee.employeeName}
                            onChange={data.handleChange}
                        />
                        <br />

                        <label>Salary</label>
                        <input
                            className="form-control"
                            type="text"
                            name="employeeSalary"
                            value={data.selectedEmployee && data.selectedEmployee.employeeSalary}
                            onChange={data.handleChange}
                        />
                        <br />

                        <label>Age</label>
                        <input
                            className="form-control"
                            type="text"
                            name="employeeAge"
                            value={data.selectedEmployee && data.selectedEmployee.employeeAge}
                            onChange={data.handleChange}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => data.editEmployee()}>
                        Actualizar
      </button>
                    <button className="btn btn-danger" onClick={() => data.selectEmployee(data.selectedEmployee, 'Eliminar')}>Delete</button>
                    <button
                        className="btn btn-danger"
                        onClick={() => data.setModalEditar(false)}
                    >
                        Cancelar
      </button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={data.modalEliminar}>
                <ModalBody>
                    Estás Seguro que deseas eliminar el Empleado {data.selectedEmployee && data.selectedEmployee.employeeName}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => data.deleteEmployee()}>
                        Sí
      </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => data.setModalEliminar(false)}
                    >
                        No
      </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={data.modalDuplicate}>
                <ModalBody>
                    Estás Seguro que deseas duplicar el Empleado {data.electedEmployee && data.selectedEmployee.employeeName}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => data.createEmployee(data.selectedEmployee)}>
                        Sí
      </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => data.setModalDuplicate(false)}
                    >
                        No
      </button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={data.modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Insertar Empleado</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">

                        <label>name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="employeeName"
                            value={data.selectedEmployee ? data.selectedEmployee.employeeName : ''}
                            onChange={data.handleChange}
                        />
                        <br />

                        <label>Salary</label>
                        <input
                            className="form-control"
                            type="text"
                            name="employeeSalary"
                            value={data.selectedEmployee ? data.selectedEmployee.employeeSalary : ''}
                            onChange={data.handleChange}
                        />
                        <br />

                        <label>Age</label>
                        <input
                            className="form-control"
                            type="text"
                            name="employeeAge"
                            value={data.selectedEmployee ? data.selectedEmployee.employeeAge : ''}
                            onChange={data.handleChange}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary"
                        onClick={() => data.createEmployee(null)}>
                        Insertar
      </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => data.setModalInsertar(false)}
                    >
                        Cancelar
      </button>
                </ModalFooter>
            </Modal>
            <button className="btn btn-primary" onClick={prev}>prev</button>{"   "}
            <button className="btn btn-primary" onClick={next}>next</button>
        </div>
    )
}

export default UsePagination;