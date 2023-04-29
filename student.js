function emailCheck(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function save() {
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let gender = "";

    if(document.getElementById("male").checked) {
        gender = document.getElementById("male").value;
    } else if(document.getElementById("female").checked) {
        gender = document.getElementById("female").value;
    }
    
    //name
    if(_.isEmpty(fullName)) {
        fullName = ""
        document.getElementById("fullName-error").innerHTML = "vui lòng nhập họ và tên";
    } else if(fullName.trim().length <=2){
        fullName = ""
        document.getElementById("fullName-error").innerHTML = "không được nhỏ hơn 2 ký tự";
    }
    
    else{
        document.getElementById("fullName-error").innerHTML = "";
    }

    //mail
    if(_.isEmpty(email)) {
        email = "";
        document.getElementById("email-error").innerHTML = "vui lòng nhập email của bạn";
    } else if(!emailCheck(email)) {
        email = "";
        document.getElementById("email-error").innerHTML = "Email không đúng định dạng";
    } else {
        document.getElementById("email-error").innerHTML = "";
    }

    //phone
    if(_.isEmpty(phone)) {
        phone = "";
        document.getElementById("phone-error").innerHTML = "vui lòng nhập số điện thoại";
    } else if(phone.trim().length > 10) {
        phone = "";
        document.getElementById("phone-error").innerHTML = "Số điện thoại không đúng";
    } else {
        document.getElementById("phone-error").innerHTML = "";
    }

    //address
    if(_.isEmpty(address)) {
        address = "";
        document.getElementById("address-error").innerHTML = "vui lòng nhập địa chỉ";
    } else {
        document.getElementById("address-error").innerHTML = "";
    }

    //gender
    if(_.isEmpty(gender)) {
        gender = "";
        document.getElementById("gender-error").innerHTML = "vui lòng chọn giới tinh";
    } else {
        document.getElementById("gender-error").innerHTML = "";
    }

    if(fullName && email && phone && address && gender) {
        console.log(fullName, email, phone, address, gender);
    }
}