import request from "superagent";
import {urlBackend, urlBase} from "../constants";
import {ADD_FAIL, ADD_SUCCESS, DATA_FAIL, DATA_SUCCESS, DELETE_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from "./types";
import {send} from "q";

const setData = (data) => {
    let response = [];
    for (let i = 0; i < data.length; i++) {
        let roles = data[i].roles.map(item => item.name);
        let val = '|';
        roles.map(it => val += it + " | ");
        let user = {
            id: data[i].id,
            name: data[i].name,
            roles: val
        };
        response.push(user);
    }
    return response;
}
export const getUser = () => (dispatch) => {
    request
        .get(urlBackend + 'all')
        .set('Access-Control-Allow-Origin', '*')
        .accept('application/json')
        .then(response => {
            dispatch({
                type: DATA_SUCCESS,
                payload: setData(response.body)
            })
        })
        .catch(err => {
            dispatch({
                type: DATA_FAIL,
                payload: 'A ocurrido un error consultando la lista de usuarios'
            });
        });
}

export const deleteUser = (id, callback) => (dispatch) => {
    request
        .delete(urlBackend + 'delete/' + id)
        .set('Access-Control-Allow-Origin', '*')
        .accept('application/json')
        .then(response => {
            if (response.body) {
                getUser();
                callback(response.body);
            }
        })
        .catch(err => {
            dispatch({
                type: DELETE_FAIL,
                payload: 'A ocurrido un error eliminando'
            });
            callback(false);
        });
};

export const addUser = (user, callback) => (dispatch) => {

    request
        .post(urlBackend + "add")
        .set('Access-Control-Allow-Origin', '*')
        .accept('application/json')
        .send(user)
        .then((response) => {
                dispatch({
                    type: ADD_SUCCESS,
                });
                callback();
            }
        )
        .catch(()=>{
            dispatch({
                type: ADD_FAIL,
                payload: 'A ocurrido un error agregando el usuario '+ { ...user }
            });
        })

};

export const login = (username, password ) => (dispatch) => {
    request
        .post('http://'+urlBase + '/login')
        .set('Access-Control-Allow-Origin', '*')
        .accept('application/json')
        .send({ username, password})
        .then(response => {
            console.log(response);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.body
            });
        })
        .catch(() => {
            dispatch({
                type: LOGIN_FAIL,
                payload: 'Error inicando sesión'
            });
        });
}

export const logout = () => (dispatch) =>{
    dispatch({
        type: LOGOUT
    });
}

