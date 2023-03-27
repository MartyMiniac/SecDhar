import Swal from 'sweetalert2'
const SuccessAlert = (props)  =>{
    if (props.type === 'success'){
        Swal.fire({
            title: 'Success',
            text: 'You are successfully logged in',
            icon: 'success',
            backdrop: '#00ff00'
          })    
    }
    if (props.type === 'warn'){
        Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong',
            icon: 'warning',
            backdrop: '#ffff00'
          })    
    }
    if (props.type === 'error'){
        Swal.fire({
            title: 'Error!',
            text: 'Login failed try again',
            icon: 'error',
            backdrop: '#ff0000'
          })    
    }
}
export default SuccessAlert;