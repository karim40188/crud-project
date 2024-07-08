let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.querySelector(".total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let create = document.getElementById("create")
let deleteBtn = document.getElementById("deleteBtn")
let searchInput = document.getElementById("search")
let arr;
let mood = "create"
let tmp;
if (localStorage.product != null) {
    arr = JSON.parse(localStorage.product)
    showData()

} else {
    arr = []
}
function getTotal() {
    let result = +price.value + +taxes.value + +ads.value + +discount.value
    total.innerHTML = result
    if (total.innerHTML > 0) {
        total.style.backgroundColor = "green"
    } else {
        total.style.backgroundColor = "#a00d02"
    }

}

create.addEventListener("click", function (e) {
    e.preventDefault()
    let obj = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    if (mood == "create") {
        arr.push(obj)
    } else {
        arr[tmp] = obj
        mood = "create"
        create.style.backgroundColor = "#310044"
        create.innerHTML = "create"
    }
    localStorage.setItem("product", JSON.stringify(arr))
    console.log(arr)
    clearData()
    showData()
})
function showData() {
    cartona = ""
    for (let i = 0; i < arr.length; i++) {
        cartona += `<tr> 
        <td>${i} </td>
        <td>${arr[i].title} </td>
        <td>${arr[i].price} </td>
        <td>${arr[i].taxes} </td>
        <td>${arr[i].ads} </td>
        <td>${arr[i].discount} </td>
        <td>${arr[i].total} </td>
        <td>${arr[i].count} </td>
        <td>${arr[i].category} </td>
        <td><button onclick="updateProduct(${i})"> Update </button> </td>
        <td><button onclick="deleteProduct(${i})"> Delete </button> </td>
        </tr>`
    }

    document.getElementById("tbody").innerHTML = cartona

    if (arr.length > 0) {
        deleteBtn.style.display = "block"
    } else {
        deleteBtn.style.display = "none"

    }
}
deleteBtn.addEventListener("click", function () {
    arr.splice(0)
    localStorage.clear()
    showData()
})
function updateProduct(i) {
    mood = "update"
    title.value = arr[i].title
    price.value = arr[i].price
    taxes.value = arr[i].taxes
    ads.value = arr[i].ads
    discount.value = arr[i].discount
    total.innerHTML = arr[i].total
    count.value = arr[i].count
    category.value = arr[i].category
    count.style.display = "none"
    create.innerHTML = "Update"
    create.style.backgroundColor = "yellow"
    tmp = i
}
function deleteProduct(i) {
    arr.splice(i, 1)
    localStorage.setItem("product", JSON.stringify(arr))
    showData()
}

function clearData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    category.value = ""
    count.value = ""

}
let searchOfMood = "title"
function searchMood(id, event) {
    event.preventDefault()
    if (id ==="searchByTitle") {
        searchOfMood = "title"
    } else {
        searchOfMood = "category"
    }
    searchInput.placeholder="Search By "+ searchOfMood
    searchInput.focus()
}
function searchProduct(value) {
    let cartona = ""
    for (let i = 0; i < arr.length; i++) {
        if (searchOfMood == "title") {
            if (arr[i].title.includes(value)) {
                cartona += `<tr> 
                <td>${i} </td>
                <td>${arr[i].title} </td>
                <td>${arr[i].price} </td>
                <td>${arr[i].taxes} </td>
                <td>${arr[i].ads} </td>
                <td>${arr[i].discount} </td>
                <td>${arr[i].total} </td>
                <td>${arr[i].count} </td>
                <td>${arr[i].category} </td>
                <td><button onclick="updateProduct(${i})"> Update </button> </td>
                <td><button onclick="deleteProduct(${i})"> Delete </button> </td>
                </tr>`
            }
        } else {
            if (arr[i].category.includes(value)) {
                cartona += `<tr> 
                <td>${i} </td>
                <td>${arr[i].title} </td>
                <td>${arr[i].price} </td>
                <td>${arr[i].taxes} </td>
                <td>${arr[i].ads} </td>
                <td>${arr[i].discount} </td>
                <td>${arr[i].total} </td>
                <td>${arr[i].count} </td>
                <td>${arr[i].category} </td>
                <td><button onclick="updateProduct(${i})"> Update </button> </td>
                <td><button onclick="deleteProduct(${i})"> Delete </button> </td>
                </tr>`
            }
        }
    }
    document.getElementById("tbody").innerHTML = cartona
}
