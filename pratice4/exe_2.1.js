const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const terms = document.getElementById("terms")

function showError(id, message){
    document.getElementById(id + "Error").innerText = message
}

function clearError(id){
    document.getElementById(id + "Error").innerText = ""
}

function validateFullname(){
    const value = fullname.value.trim()
    const regex = /^[A-Za-zÀ-ỹ\s]+$/

    if(value === ""){
        showError("fullname","Không được để trống")
        return false
    }

    if(value.length < 3){
        showError("fullname","Ít nhất 3 ký tự")
        return false
    }

    if(!regex.test(value)){
        showError("fullname","Chỉ chứa chữ và khoảng trắng")
        return false
    }

    clearError("fullname")
    return true
}

function validateEmail(){
    const value = email.value.trim()
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(value === ""){
        showError("email","Không được để trống")
        return false
    }

    if(!regex.test(value)){
        showError("email","Email không hợp lệ")
        return false
    }

    clearError("email")
    return true
}

function validatePhone(){
    const value = phone.value.trim()
    const regex = /^0\d{9}$/

    if(value === ""){
        showError("phone","Không được để trống")
        return false
    }

    if(!regex.test(value)){
        showError("phone","SĐT phải 10 số và bắt đầu bằng 0")
        return false
    }

    clearError("phone")
    return true
}

function validatePassword(){
    const value = password.value
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if(value === ""){
        showError("password","Không được để trống")
        return false
    }

    if(!regex.test(value)){
        showError("password","Ít nhất 8 ký tự, có chữ hoa, chữ thường và số")
        return false
    }

    clearError("password")
    return true
}

function validateConfirmPassword(){
    if(confirmPassword.value !== password.value){
        showError("confirmPassword","Mật khẩu không khớp")
        return false
    }

    clearError("confirmPassword")
    return true
}

function validateGender(){
    const gender = document.querySelector('input[name="gender"]:checked')

    if(!gender){
        showError("gender","Vui lòng chọn giới tính")
        return false
    }

    clearError("gender")
    return true
}

function validateTerms(){
    if(!terms.checked){
        showError("terms","Bạn phải đồng ý điều khoản")
        return false
    }

    clearError("terms")
    return true
}

form.addEventListener("submit",function(e){

    e.preventDefault()

    const isValid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirmPassword() &
        validateGender() &
        validateTerms()

    if(isValid){
        form.style.display="none"

        document.getElementById("successMessage").innerText =
            "Đăng ký thành công! 🎉 Xin chào " + fullname.value
    }

})

fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirmPassword)

fullname.addEventListener("input",()=>clearError("fullname"))
email.addEventListener("input",()=>clearError("email"))
phone.addEventListener("input",()=>clearError("phone"))
password.addEventListener("input",()=>clearError("password"))
confirmPassword.addEventListener("input",()=>clearError("confirmPassword"))