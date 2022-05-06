document.querySelector('#email').addEventListener('blur', validateEmail);
document.querySelector('#password').addEventListener('blur', validatePassword);

const reSpaces=/^\S*$/;

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

(function (){
    const forms = document.querySelectorAll('.needs-validation-login');
    for (let form of forms){
      form.addEventListener(
        "submit",
        function (event){
          if (!form.checkValidity() ||
          !validateEmail()||
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