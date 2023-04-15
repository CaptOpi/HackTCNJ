import axios from 'axios'
const API_URL = 'http://localhost:5000';

export const createUser = async(user)=>{
    const response = await axios.post (`${API_URL}/users/createUser`,user);
    return response;
}
export const getUser = async(email,password)=>{
    const response = await axios.get(`${API_URL}/users/getUser/${email}/${password}`);
    return response;
}
export const getUserTasks = async(email, password) => {
    const response = await axios.get(`${API_URL}/users/getUserTasks/${email}/${password}`);
    return response;
}
export const getUsers = async(email, password) => {
    const response = await axios.get(`${API_URL}/users/getUsers`);
    return response;
}
export const getGoal = async(email, password) => {
    const response = await axios.get(`${API_URL}/users/getGoal/${email}/${password}`);
    return response;
}
export const getCompletedGoals = async(email, password) => {
    const response = await axios.get(`${API_URL}/users/getCompletedGoals/${email}/${password}`);
    return response;
}
export const updateUser = async(email, password) => {
    const response = await axios.get(`${API_URL}/users/updateUser/${email}/${password}`);
    return response;
}