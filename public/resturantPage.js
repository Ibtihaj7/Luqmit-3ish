const classes = ['mainDishes', 'sandwich', 'juice', 'sweets', 'soup', 'fastFood']     

    for(let i = 0; i < 6; i++){
        document.querySelectorAll(".btn")[i].addEventListener("click", addItem);
    } 

    function addItem(){
        classLocations = classes.indexOf(String(this.className.split(" ")[1]))
        let innerValue = document.querySelectorAll("."+classes[classLocations])[1].innerHTML.split(" ") 
        document.querySelectorAll("."+classes[classLocations])[1].innerHTML = " " +  innerValue[0] + innerValue[1] + " " +  innerValue[2] + " " +  String(Number(innerValue[3])-1)
        if(Number(innerValue[3]) - 1 == 0){              
            document.querySelectorAll("."+classes[classLocations])[2].disabled = true 
        } 
        if(document.querySelector("#text").innerHTML.length == 0){  
            document.querySelector("#text").innerHTML = document.querySelectorAll("."+classes[classLocations])[0].innerHTML         
            document.querySelector("#ids").innerHTML = document.getElementById(classes[classLocations]).value     
        }else{
            document.querySelector("#text").innerHTML += "،" + document.querySelectorAll("."+classes[classLocations])[0].innerHTML  
            document.querySelector("#ids").innerHTML += "،"+document.getElementById(classes[classLocations]).value 
        }
        Toastify({
            text: "يرجى تأكيد الحجز في الاسفل عند الانتهاء",
            duration: 4000, 
            newWindow: false,
            gravity: "bottom",
            position: 'center',
            style: {
                background: '#ffa500',
                fontSize: '15px',
            },
        }).showToast() 
    } 