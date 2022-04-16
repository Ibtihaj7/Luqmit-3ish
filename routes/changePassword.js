function ChangePass() {
    const password = document.querySelector('input[name=newPassword]');
    const confirm = document.querySelector('input[name=confirmPassword]');
    if(password.length!=0){
        if (confirm.value === password.value) {
            confirm.setCustomValidity('Passwords match');
        } 
        else {
            confirm.setCustomValidity('Password do not match');
        } 
    }
    else{
        alert("password can't be empty");
        Message.textcontent=" ";
    }

}                          