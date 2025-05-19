import {menuArray} from './data.js' 

const restaurantMenuEl = document.getElementById('restaurant-menu')
const clientOrderEl = document.getElementById('client-order')
const clientOrderListEl = document.getElementById('client-order-list')

const clientOrderArr = []

restaurantMenuEl.addEventListener('click',function(e){
    if(e.target.dataset.pizza){
        handleOrder(e.target.dataset.pizza)
        renderOrderList(clientOrderArr)
    }
    clientOrderEl.style.visibility = 'visible'
})

function handleOrder(position){
    const selectedPosition = menuArray.filter(function(selPos){
        return selPos.id==position
    })[0]
    clientOrderArr.push(selectedPosition)
}

function renderOrderList(arr){
    let html = ''
    arr.forEach(function(element){
        html += `
        <p>${element.name}</p>
        <button>remove</button>
        <p>$${element.price}</p>
        `
    })
    clientOrderListEl.innerHTML = html
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