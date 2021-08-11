import axios from 'axios'

const url = 'https://simple-contact-crud.herokuapp.com'

export async function getContact() {
  return new Promise((resolve => {
    resolve(axios({
      method : "GET",
      url : url + '/contact'
    }))
    .then(({data}) => {
      return data
    })
  }))
}

export async function addContact(data) {
  return new Promise((resolve => {
    resolve(axios({
      method : "POST",
      url : url + '/contact',
      // FOR UPLOAD IMAGE
      // headers : {
      //   "Content-Type": "multipart/form-data",
      // },
      data
    }))
    .then(({data}) => {
      return data
    })
  }))
}

export async function editContact(id, data) {
  console.log(id,'api');
  console.log(data,'api');
  return new Promise((resolve => {
    resolve(axios({
      method : "PUT",
      url : url + '/contact/' + id,
      // FOR UPLOAD IMAGE
      // headers : {
      //   "Content-Type": "multipart/form-data",
      // },
      data
    }))
    .then(({data}) => {
      return data
    })
  }))
}

export async function deleteContact(id) {
  console.log(id);
  return new Promise((resolve => {
    resolve(axios({
      method : "DELETE",
      url : url + '/contact/' + id
    }))
    .then(({data}) => {
      return data
    })
  }))
}