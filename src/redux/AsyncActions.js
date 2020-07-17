import axios from 'axios';
import * as types from './action-types';
import config from '../config.json';

export const fetchEmployees = () => {
    return (dispactch) => {
        dispactch(fetchEmployeesRequest)
        axios.get("https://labsserviceemployee.azurewebsites.net/employees")
            .then(response => {
                const dataE = response.data
                dispactch(fetchEmployeesSucces(dataE))
            })
            .catch(error => {
                const errorMsg = error.payload
                dispactch(fetchEmployeesFailure(errorMsg))
            })
    }
}


export const fetchEmployeesId = (id) => {
    console.log("***********")
    return (dispactch) => {
        dispactch(fetchEmployeesRequest)
        axios.get("https://labsserviceemployee.azurewebsites.net/employees/" + id)
            .then(response => {
                const dataId = response.data
                dispactch(fetchEmployeesIdSucces(dataId))
            })
            .catch(error => {
                const errorMsg = error.payload
                dispactch(fetchEmployeesFailure(errorMsg))
            })
    }
}



export const fetchSearchEmployees = (searchParams) => {
    return (dispactch) => {
        dispactch(fetchEmployeesRequest)
        axios.get(`${config.config.employeesUrlBaseBase}${searchParams}`)
            .then(response => {
                const params = response.data
                dispactch(fetchEmployeesSucces(params))
            })
            .catch(error => {
                const errorMsg = error.payload
                dispactch(fetchEmployeesFailure(errorMsg))
            })
    }
}

export const fetchEmployeesSucces = (dataE, params, dataId) => {
    return {
        type: types.FETCH_EMPLOYEES_SUCCESS,
        payload: {
            dataE,
            params
        }
    }
}

export const fetchEmployeesIdSucces = (dataId) => {
    return {
        type: types.FETCH_EMPLOYEESID_SUCCESS,
        payload: {
            dataId
        }
    }
}

export const fetchEmployeesFailure = (error) => {
    return {
        type: types.FETCH_EMPLOYEES_FAILURE,
        payload: error
    }
}

export const fetchEmployeesRequest = (error) => {
    return {
        type: types.FETCH_EMPLOYEES_REQUEST,
        error
    }
}



export default { fetchEmployees, fetchSearchEmployees, fetchEmployeesSucces, fetchEmployeesFailure, fetchEmployeesRequest, fetchEmployeesId,fetchEmployeesIdSucces }
