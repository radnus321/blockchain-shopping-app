let shop = document.getElementById('shop')
let cart = document.getElementById('checkout')

let shopItemsData = [
  {
    id: 'jkjagskdjgfs',
    name: "Casual Shirt",
    price: 45,
    desc: "This is a good casual shirt for casualware",
    img: "images/img-1.jpg"
  },
  {
    id: 'jkjagsasdf',
    name: "Office Shirt",
    price: 100,
    desc: "This will make you look good in office meetings",
    img: "images/img-2.jpg"
  },
  {
    id: 'jkjagdfhfgdsdf',
    name: "T Shirt",
    price: 25,
    desc: "This is a great casualware T-Shirt",
    img: "images/img-3.jpg"
  },
  {
    id: 'jkjadfgjdkhgjgfs',
    name: "Mens Suit",
    price: 45,
    desc: "This is a very good looking suit",
    img: "images/img-4.jpg"
  },
  {
    id: 'jkjagsvbnghjkdjgfs',
    name: "Casual Shirt",
    price: 45,
    desc: "This is a good casual shirt for casualware",
    img: "images/img-1.jpg"
  },
  {
    id: 'jkjagsyiuoyasdf',
    name: "Office Shirt",
    price: 100,
    desc: "This will make you look good in office meetings",
    img: "images/img-2.jpg"
  },
  {
    id: 'jkjagdfhjudyfgdsdf',
    name: "T Shirt",
    price: 25,
    desc: "This is a great casualware T-Shirt",
    img: "images/img-3.jpg"
  },
  {
    id: 'jkjadfgjdksdhgjgfs',
    name: "Mens Suit",
    price: 45,
    desc: "This is a very good looking suit",
    img: "images/img-4.jpg"
  }
]
localStorage.setItem('shopItemsData', JSON.stringify(shopItemsData));
let basket = []
let total = 0
let generateShop = () => {
  shop.innerHTML = shopItemsData.map((x) => {
    let { id, name, price, desc, img } = x;
    return `
      <div id="product-id-${id}" class="item">
        <img width="220" src="${img}" alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}.</p>
          <div class="price-quantity">
            <h2>$${price}</h2>
            <a href="./product.html?id=${id}" class="item-link"><button class="buy-btn"> Buy!</button></a>
          </div>
        </div>
      </div>`;
  }).join("");
};

generateShop();

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
  if(search.item === 0){
  }else{
    search.item -= 1;
  }

  console.log(basket);
  update(selectedItem.id);
}

let update = (id) => {

  // UPDATING NUMBER OF ITEMS IN SHOP PAGE

  let temp = basket.find((x) => x.id === id);
  let element = shop.querySelector(`#product-id-${id}`);
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

  // UPDATING LOCAL STORAGE

  localStorage.setItem('basket', JSON.stringify(basket));
  console.log(JSON.parse(localStorage.getItem('basket')))

} 


  //  UPDATING LOCAL STORAGE

  if(localStorage.getItem('basket')){
    basket = JSON.parse(localStorage.getItem('basket'));
    generateShop(basket);
    update();
  } else {
    localStorage.setItem('basket', JSON.stringify(basket));
  }


let hello = JSON.parse(localStorage.getItem('shopItemsData'))



