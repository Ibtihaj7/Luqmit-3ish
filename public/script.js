document.querySelector('#email').addEventListener('blur', validateEmail);
document.querySelector('#password').addEventListener('blur', validatePassword);
document.querySelector('#name').addEventListener('blur', validateUsername);
document.querySelector('#phone').addEventListener('blur', validatePhone);
document.querySelector('#confirm').addEventListener('blur', validatecomfirm);

const reSpaces=/^\S*$/;

function validateUsername(e){
    const name=document.querySelector('#name');
    if (reSpaces.test(name.value)){
        name.classList.remove('is-invalid');
        return true;
   }else{
        name.classList.add('is-invalid');
        return false;
    }
}
function validateEmail(e){
  const email=document.querySelector('#email');
  const re=/^([a-zA-Z0-9_\-?\.?]){3,}@([a-zA-Z]){3,}\.([a-zA-Z]){2,5}$/;
  if (reSpaces.test(email.value) && re.test(email.value)){
    email.classList.remove('is-invalid');
    return true;
    }else{
    email.classList.add('is-invalid');
    return false;
    }
}
function validatePassword(){
    const password=document.querySelector('#password');
    const re=/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])/;
    if (re.test(password.value) && reSpaces.test(password.value)){
    password.classList.remove('is-invalid');
              
    return true;
    }else{
    password.classList.add('is-invalid');
    return false;
    }
}

function validatecomfirm(){
  const password=document.querySelector('#password');
  const confirm = document.querySelector('#confirm');
  if ((password.value === confirm.value) ){
    confirm.classList.remove('is-invalid');
    return true;
  }else{
    confirm.classList.add('is-invalid');
    return false;
  }
}
function validatePhone(){
  const phone=document.querySelector('#phone');
    const re=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (re.test(phone.value) && reSpaces.test(phone.value)){
    phone.classList.remove('is-invalid');
              
    return true;
    }else{
    phone.classList.add('is-invalid');
    return false;
    }

}

(function (){
    const forms = document.querySelectorAll('.needs-validation');
    for (let form of forms){
      form.addEventListener(
        "submit",
        function (event){
          if (!form.checkValidity() ||
          !validateEmail()||
          !validateUsername()||
          !validatePassword()||
          !validatecomfirm()
          ){
            event.preventDefault();
            event.stopPropagation();
          }else{
          form.classList.add('was-validated');
          }
        },
        false
      );
    }
  })();