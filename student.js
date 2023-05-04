function emailCheck(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//thêm thông tin
function saveStudent() {
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
        //lưu vào dsacch svien
        let students = localStorage.getItem("students") ? JSON.parse( localStorage.getItem("students")) : [];

        students.push({
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        })

        localStorage.setItem("students", JSON.stringify(students));

        this.saveListStudent();

        let table = `<tr>
        <td>#</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Điện thoại</td>
        <td>Địa chỉ</td>
        <td>Giới tính</td>
        <td>Hành động</td>
    </tr>`;

    students.forEach((students,idx) => {
        let studentId = idx;
        idx++;
        let genderCheck = parseInt(students.gender) === 1 ? "Nam" : "Nữ";
        table +=`<tr>
        <td>${idx}</td>
        <td>${students.fullName}</td>
        <td>${students.email}</td>
        <td>${students.phone}</td>
        <td>${students.address}</td>
        <td>${genderCheck}</td>
        <td>
            <a href="#" onclick="edit(${studentId})">Edit</a> | <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
        </td>
    </tr>`;
    })

    document.getElementById("listStudent").innerHTML = table;

    }
}

function saveListStudent() {
    let students = localStorage.getItem("students") ? JSON.parse( localStorage.getItem("students")) : [];
    if(students.length === 0){
        document.getElementById("danhSach").style.display = "none";
        return false; 
    } 

    document.getElementById("danhSach").style.display = "block";
    
    let table = `<tr>
    <td width ="20">#</td>
    <td>Họ và tên</td>
    <td>Email</td>
    <td>Điện thoại</td>
    <td>Địa chỉ</td>
    <td>Giới tính</td>
    <td>Hành động</td>
    </tr>`;


    students.forEach((students,idx) => {
    let studentId = idx;
    idx++; 
    let genderCheck = parseInt(students.gender) === 1 ? "Nam" : "Nữ";
    table +=`<tr>
    <td>${idx}</td>
    <td>${students.fullName}</td>
    <td>${students.email}</td>
    <td>${students.phone}</td>
    <td>${students.address}</td>
    <td>${genderCheck}</td>
    <td>
        <a href="#" onclick="edit(${studentId})">Edit</a> | <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
    </td>
    </tr>`;
    })

    document.getElementById("listStudent").innerHTML = table;
}

//Xóa thông tin
function deleteStudent(id) {
    let students = localStorage.getItem("students") ? JSON.parse( localStorage.getItem("students")) : [];
    students.splice(id, 1);

    localStorage.setItem("students", JSON.stringify(students));

    saveListStudent();

}

//Sửa thông tin
function edit(id) {
    let students = localStorage.getItem("students") ? JSON.parse( localStorage.getItem("students")) : [];
    document.getElementById("fullName").value = students[id].fullName;
    document.getElementById("email").value = students[id].email;
    document.getElementById("phone").value = students[id].phone;
    document.getElementById("address").value = students[id].address;
    document.getElementById("index").value = id;

    document.getElementById("save").style.display ="none";
    document.getElementById("update").style.display ="inline-block";
}

function Update() {
    let students = localStorage.getItem("students") ? JSON.parse( localStorage.getItem("students")) : [];
    let index = document.getElementById("index").value;

    students[index] = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        
    }

    localStorage.setItem("students", JSON.stringify(students));

    saveListStudent();

    document.getElementById("save").style.display ="inline-block";
    document.getElementById("update").style.display ="none";
}
