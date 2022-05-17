
(function() {
    window.addEventListener('load', initial);
    function initial(){ 
        Toastify({
            text: "تمت عملية الحجز بنجاح",
            duration: 6000, 
            newWindow: false,
            gravity: "bottom",
            position: 'center',
            style: {
                background: '#ffa500',
                fontSize: '25px',
            },
        }).showToast()   
        console.log("Ddd")
    }
})() 