import {menuArray} from './data.js' 

const restaurantMenuEl = document.getElementById('restaurant-menu')
const clientOrderEl = document.getElementById('client-order')
const clientOrderListEl = document.getElementById('client-order-list')
const priceEl = document.getElementById('price')
const completeOrderBtn = document.getElementById('complete-order-button')
const dataFormEl = document.getElementById('data-form')
const clientDataForm = document.getElementById('client-data')

const clientOrderArr = []

restaurantMenuEl.addEventListener('click',function(e){
    if(e.target.dataset.pizza){
        clientOrderEl.style.visibility = 'visible'
        handleOrder(e.target.dataset.pizza)
    } else if (e.target.dataset.beer) {
        handleOrder(e.target.dataset.beer)
        clientOrderEl.style.visibility = 'visible'
    } else if (e.target.dataset.hamburger){
        handleOrder(e.target.dataset.hamburger)
        clientOrderEl.style.visibility = 'visible'
    }
    renderOrderList(clientOrderArr)
    sumOfOrder(clientOrderArr)
})

clientOrderListEl.addEventListener('click',function(e){
    if(e.target.dataset.pizza){
        removeFromOrderList(e.target.dataset.pizza)
    } else if (e.target.dataset.beer){
        removeFromOrderList(e.target.dataset.beer)
    } else if (e.target.dataset.hamburger){
         removeFromOrderList(e.target.dataset.hamburger)
    }
    renderOrderList(clientOrderArr)
    sumOfOrder(clientOrderArr)
})

completeOrderBtn.addEventListener('click',function(){
    dataFormEl.style.visibility = 'visible'
    completeOrderBtn.disabled = true
})

clientDataForm.addEventListener('submit',function(e){
    e.preventDefault()
    const dataFromForm = new FormData(clientDataForm)
    const name = dataFromForm.get('name')
    dataFormEl.style.visibility = 'hidden'
    clientOrderEl.innerHTML = `
    <p id="thanks-for-order">Thanks ${name} for your order!</p>
    `
})

function removeFromOrderList(orderListPosition){
    const indexToRemove = clientOrderArr.findIndex(function(order){
        return order.id == orderListPosition
    })

    if(indexToRemove !== -1) {
        clientOrderArr.splice(indexToRemove, 1)
    }
}

function handleOrder(menuPosition){
    const selectedPosition = menuArray.filter(function(selPos){
        return selPos.id == menuPosition
    })[0]
    clientOrderArr.push(selectedPosition)
}

function renderOrderList(arr){
    let html = ''
    arr.forEach(function(element){
        html += `
        <section class="single-product">
            <li>${element.name} <button class="remove-button" data-${element.name}="${element.id}">remove</button></li>
            <div class="price-info" id="price-info">
                <p>$${element.price}</p>
            </div>
        </section>
        `
    })
    clientOrderListEl.innerHTML = html
}

function sumOfOrder(arr){
    const totalPrice = arr.reduce(function(total, nextElement){
        return total + nextElement.price
    },0)
    priceEl.innerHTML = `$${totalPrice}`
}

function renderMenu(arr) {
    let html = ''
    arr.forEach(function(menuPosition){
        html += `
            <section class="menu-position">
                <div class="menu-icons">
                    <img src="${menuPosition.image}" alt="${menuPosition.name} icon">
                </div>
                <div class="menu-details">
                    <p class="position-name">${menuPosition.name}</p>
                    <p class="position-igredients">${menuPosition.ingredients}</p>
                    <p class="position-price">$${menuPosition.price}</p>
                </div>
                <div class="order-button">
                    <button class="order" data-${menuPosition.name}="${menuPosition.id}">+</button>
                </div>
            </section>
        `
    })
    return html
}

restaurantMenuEl.innerHTML = renderMenu(menuArray)