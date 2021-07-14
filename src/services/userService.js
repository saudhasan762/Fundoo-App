
import AxiosService from "./axiosServices";

const axios = new AxiosService()

export default class UserService{
    register = (data) => {
        return axios.postMethod("http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp", data)
    }

    login = (data) => {
        console.log("inside login");
        console.log(data);
        return axios.postMethod("http://fundoonotes.incubation.bridgelabz.com/api/user/login", data)
    }
}