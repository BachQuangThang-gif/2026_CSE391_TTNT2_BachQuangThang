const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const delivery = document.getElementById("delivery")
const address = document.getElementById("address")
const note = document.getElementById("note")

const noteCounter = document.getElementById("noteCounter")

const confirmBox = document.getElementById("confirmBox")
const summary = document.getElementById("summary")

const totalEl = document.getElementById("total")

const prices = {
    ao:150000,
    quan:200000,
    giay:300000
}

function showError(id,msg){
    document.getElementById(id+"Error").innerText = msg
}

function clearError(id){
    document.getElementById(id+"Error").innerText=""
}

function validateProduct(){
    if(product.value===""){
        showError("product","Vui lòng chọn sản phẩm")
        return false
    }
    clearError("product")
    return true
}

function validateQuantity(){

    const q = Number(quantity.value)

    if(!Number.isInteger(q) || q<1 || q>99){
        showError("quantity","Số lượng từ 1-99")
        return false
    }

    clearError("quantity")
    return true
}

function validateDelivery(){

    const value = delivery.value

    if(!value){
        showError("delivery","Chọn ngày giao")
        return false
    }

    const today = new Date()
    const selected = new Date(value)

    today.setHours(0,0,0,0)

    const max = new Date()
    max.setDate(today.getDate()+30)

    if(selected < today){
        showError("delivery","Không được chọn ngày quá khứ")
        return false
    }

    if(selected > max){
        showError("delivery","Không quá 30 ngày")
        return false
    }

    clearError("delivery")
    return true
}

function validateAddress(){

    const value = address.value.trim()

    if(value.length < 10){
        showError("address","Địa chỉ ít nhất 10 ký tự")
        return false
    }

    clearError("address")
    return true
}

function validateNote(){

    const length = note.value.length

    if(length > 200){
        showError("note","Tối đa 200 ký tự")
        return false
    }

    clearError("note")
    return true
}

function validatePayment(){

    const p = document.querySelector('input[name="payment"]:checked')

    if(!p){
        showError("payment","Chọn phương thức thanh toán")
        return false
    }

    clearError("payment")
    return true
}

function updateTotal(){

    const p = prices[product.value] || 0
    const q = Number(quantity.value) || 0

    const total = p*q

    totalEl.innerText = total.toLocaleString("vi-VN")
}

note.addEventListener("input",function(){

    const len = note.value.length

    noteCounter.innerText = len + "/200"

    if(len>200){
        noteCounter.classList.add("over")
    }else{
        noteCounter.classList.remove("over")
    }

    clearError("note")
})

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
delivery.addEventListener("blur",validateDelivery)
address.addEventListener("blur",validateAddress)

product.addEventListener("input",()=>clearError("product"))
quantity.addEventListener("input",()=>clearError("quantity"))
delivery.addEventListener("input",()=>clearError("delivery"))
address.addEventListener("input",()=>clearError("address"))

form.addEventListener("submit",function(e){

    e.preventDefault()

    const valid =
        validateProduct() &
        validateQuantity() &
        validateDelivery() &
        validateAddress() &
        validateNote() &
        validatePayment()

    if(valid){

        const pName = product.options[product.selectedIndex].text
        const q = quantity.value
        const d = delivery.value
        const total = totalEl.innerText

        summary.innerHTML = `
        Sản phẩm: <b>${pName}</b><br>
        Số lượng: <b>${q}</b><br>
        Ngày giao: <b>${d}</b><br>
        Tổng tiền: <b>${total} VNĐ</b>
        <br><br>
        Xác nhận đặt hàng?
        `

        confirmBox.style.display="block"

    }

})

document.getElementById("confirmBtn").onclick = function(){

    confirmBox.style.display="none"
    form.style.display="none"

    document.getElementById("successMessage").innerText =
    "Đặt hàng thành công 🎉"

}

document.getElementById("cancelBtn").onclick = function(){

    confirmBox.style.display="none"

}