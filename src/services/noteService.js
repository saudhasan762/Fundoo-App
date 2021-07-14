import AxiosService from "./axiosServices";
const axios= new AxiosService();

export default class noteServices {
  addNote = (data,token) => {
    return axios.postMethod("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", data,{
        headers: {'Authorization': token}
    });
  };

  getNotes = (token) => {
    return axios.getMethod("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",{
        headers: {'Authorization': token}
    });
  };

  deleteNotes = (data,token) => {
    return axios.postMethod("http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", data, {
      headers: {'Authorization': token}
    });
  };

  archiveNote = (data,token) => {
    console.log("inside api");
    console.log(token);
    return axios.postMethod("http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes", data, {
      headers: {'Authorization': token}
    });
  }
  getArchiveNotes = (token) => {
    return axios.getMethod("http://fundoonotes.incubation.bridgelabz.com/api/notes/getArchiveNotesList", {
      headers: {'Authorization': token}
    });
  }

  getTrashNotes = (token) => {
    return axios.getMethod("http://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList", {
      headers: {'Authorization': token}
    });
  }

  deleteForever = (data, token) => {
    return axios.postMethod("http://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",data, {
      headers: {'Authorization': token}
    });
  }
}