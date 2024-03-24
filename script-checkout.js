let storedBasket = localStorage.getItem('basket');
let basket = storedBasket ? JSON.parse(storedBasket) : [] ;
let cart = document.querySelector(".product-cards")
let shopItemsData = JSON.parse(localStorage.getItem('shopItemsData'));
let totalItem = 0;


let generateCart = (basket) => {

  totalItem = 0;
  basket.forEach((z) => {
    totalItem += z.item;
  })
  document.querySelector('.cart-amount').innerText = totalItem;
  cart.innerHTML = basket.map((x) => {
    let{id, item} = x;
    let shopItem = shopItemsData.find((y) => y.id === id);
    let actualPrice = shopItem.price;
    let price = item*shopItem.price;
    if(!item){
      return
    }
    return `
    <div class="card" id="card-id-${id}">
    <img width="100" src=${shopItem.img}>
    <div class="details">
      <div class="title-price-x">
        <h4 class="title-price">
          <p>${shopItem.name}</p>
        </h4>
        <div class="price-x">
        <p class="product-price">$ ${actualPrice}</p>
        <i onclick="Xfunction(${id})" class="bi bi-x-lg"></i>
        </div>
      </div>
      <div class="plus-x-minus">
        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
        <div id=${id} class="card-quantity">${item}</div>
        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
      </div>
      <h3>$ ${price}</h3>
    </div>
    </div>
  </div>`
  }).join(" ");
}

let generateTotalBillButtons = (basket) => {
  let total = 0;
  basket.forEach((x) => {
    let id = x.id;
    let price = (shopItemsData.find((y) => y.id === id)).price;
    total += price*(x.item);
  })
  document.querySelector('.total-bill-buttons').innerHTML = `
  <div class="total-bill">
    <h2>Total Bill : $&nbsp;</h2>
    <h2 class="bill-amount">${total}</h2>
  </div>
  <div class="checkout-buttons">
    <button class="checkout-btn">Checkout</button>
    <a href="index.html"><button class="back-to-buy-btn">Back To Buy</button></a>
    <button onclick="clearCart()" class="clear-cart-btn"><i class="bi bi-trash3"></i></button>
  </div>
</div>`
}

let generateCartEmpty = () => {
  if (totalItem === 0) {
    document.querySelector('.is-empty').innerHTML = `
    <div class="cart-empty-container">
      <p class="cart-empty-heading">Your cart is empty!</p>
      <img class="doggy-img" src="images/sad-doggy.png" alt="Img not found!"></img>
      <a  href="index.html"><button class="go-back-btn"> Add Items </button></a>
    </div>
    `

    document.querySelector('.total-bill-buttons').innerHTML = '';
  }
}


let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if(!search){
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  }else{
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
}

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id );
  let index = basket.findIndex((x) => x.id === selectedItem.id);
  if(search.item === 0){
  }else{
    search.item -= 1;
  }

  console.log(basket+" this is from the decrement function");
  update(selectedItem.id);
}

let update = (id) => {

  // UPDATING NUMBER OF ITEMS IN SHOP PAGE

  let temp = basket.find((x) => x.id === id);
  let element = cart.querySelector(`#product-id-${id}`);
  if (element) {
    let newElement = element.querySelector('.quantity');
    newElement.innerText = temp ? temp.item : 0;
  }

  // UPDATING THE TOTAL CART ITEMS IN THE NAVBAR

  let total = 0;
  basket.forEach(x => {
    total += x.item;
  });
  console.log("Number of items in the basket is: " + total);

  document.querySelector('.cart-amount').innerText = total;

  // UPDATING NUMBER OF ITEMS IN THE CART PAGE
  let element1 = cart.querySelector(`#card-id-${id}`);
  if (element1) {
    let newElement = element1.querySelector('.card-quantity');
    newElement.innerText = temp ? temp.item : 0;
  }
  generateTotalBillButtons(basket);
  generateCart(basket);
  localStorage.setItem('basket', JSON.stringify(basket));

  // CHECKING IF BASKET IS EMPTY

  generateCartEmpty();
}

let clearCart = () => {
  basket = [];
  localStorage.setItem('basket',JSON.stringify([]));
  cart.innerHTML = '';
  update();
}

let Xfunction = (id) => {
  selectedItem = id;
  let basketItem = basket.find((x) => x.id === selectedItem.id);
  basketItem.item = 0;
  update(selectedItem.id);
}

generateTotalBillButtons(basket);
generateCart(basket);
generateCartEmpty();
