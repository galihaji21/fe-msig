
import React, { Component } from 'react'
import Swal from 'sweetalert2'
   export const swalHehe = (message)  => {
        Swal.fire({
            title: 'Info!',
            text: message,
            icon: 'success'
        }).then((result) => {
            console.log("result",result.value)
            if(result.value){
            }
        })
   }

   export const swalAlert = (message)  => {
    Swal.fire({
        title: 'Perhatian!',
        text: message,
        icon: 'warning'
    }).then((result) => {
        console.log("result",result.value)
        if(result.value){
        }
    })
}


  export const hello = () => {
    return "Hello World!";
  }