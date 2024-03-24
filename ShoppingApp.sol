// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ShoppingApp {
  address public owner;
  mapping(uint256 => Item) public shopItemsData;
  mapping(address => bool) public allowedBuyers;
  mapping(uint => uint) public buyerCart;
  uint256[] public itemIds;
  uint256[] public cartIds;
  uint256 public count = 0;
  struct Item{
    uint256 id;
    string name;
    uint256 price;
    string desc;
    uint quantity;
  }

  constructor(){

    // THESE ARE PLACEHOLDER VALUES, TESTED ON REMIX VM(Shanghai)


    // owner = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    // allowedBuyers[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = true;
    // itemIds = [1,2,3];
    // Item memory i1 = Item({
    //   id:1,
    //   name: "shirt",
    //   price: 5,
    //   desc:"Good",
    //   quantity: 10
    // });

    // Item memory i2 = Item({
    //   id:2,
    //   name: "Pant",
    //   price: 7,
    //   desc:"Bad",
    //   quantity: 10
    // });

    // Item memory i3= Item({
    //   id:3,
    //   name: "T-Shirt",
    //   price: 3,
    //   desc:"Just Fine",
    //   quantity: 10

    // });
    // shopItemsData[1] = i1;
    // shopItemsData[2] = i2;
    // shopItemsData[3] = i3;
  }

  event ItemAdded(address indexed seller, uint256 itemId,string name, uint256  price, string desc, uint256 quantity );

  modifier onlyOwner() {
    require(owner == msg.sender);
    _;
  }

  modifier onlyBuyer() {
    require( allowedBuyers[msg.sender], "User is not registered");
    _;
  }

// OWNER FUNCTIONS

  function addItem(string memory Name, uint256 Price, string memory Desc, uint256 Quantity, uint256 Id) public onlyOwner {
      require(owner == msg.sender,"Not owner");
      for (uint256 i = 0; i < itemIds.length; i++) {
          if (shopItemsData[itemIds[i]].id == Id) {
              shopItemsData[itemIds[i]].quantity += Quantity;
              emit ItemAdded(owner, Id, Name, Price, Desc, Quantity);
              return;
          }
      }

      shopItemsData[Id] = Item({
          id: Id,
          name: Name,
          price: Price,
          desc: Desc,
          quantity: Quantity
      });
      itemIds.push(Id);
      count++;
  }

  function checkOwnerBalance() external view returns(uint){
    return address(owner).balance;
  }

// CUSTOMER FUNCTIONS, CUSTOMER CAN BUY MULTIPLE ITEMS

  function getAvailableItems() public view returns (Item[] memory) {
    Item[] memory temp = new Item[](itemIds.length);
    for(uint i=0; i<itemIds.length; i++){
      temp[i] = (shopItemsData[itemIds[i]]);
    }
    return temp;
  }

  error ItemNotFoundError(uint256 itemId);

  function addToCart(uint Id, uint quantity) public onlyBuyer {
    require(quantity > 0, "Invalid purchase request");
    Item memory item;
    bool found;

    for (uint i = 0; i < itemIds.length; i++) {
        if (shopItemsData[itemIds[i]].id == Id) {
            found = true;
            item = shopItemsData[itemIds[i]];
            break;
        }
    }

    require(found, "Item does not exist");
    buyerCart[item.id] = quantity;
    cartIds.push(Id);


}

  function removeFromCart(uint itemId) public onlyBuyer {
      require(buyerCart[itemId] > 0, "Item not in cart");
      buyerCart[itemId] = 0;
  }

function getCartItems() public view returns (uint[][] memory) {
    uint[][] memory temp = new uint[][](cartIds.length);

    for (uint i = 0; i < cartIds.length; i++) {
        temp[i] = new uint[](2);
        temp[i][0] = cartIds[i];
        temp[i][1] = buyerCart[cartIds[i]];
    }

    return temp;
}

   function buyItems() public payable onlyBuyer {
    uint totalPrice = 0;
    for(uint i=0; i<itemIds.length; i++){
      require(shopItemsData[itemIds[i]].quantity >= buyerCart[itemIds[i]], "Not enough stock available!");
      totalPrice += shopItemsData[itemIds[i]].price * buyerCart[itemIds[i]];
    }
    require(totalPrice > 0);

    payment(msg.sender, totalPrice);

    for(uint i=0; i<itemIds.length; i++){
      shopItemsData[itemIds[i]].quantity -= buyerCart[itemIds[i]];
    }
   }

  function payment(address buyer, uint amount) private{
    require(amount > 0, "Amount must be greater than 0");
    require(buyer.balance >= amount, "Insufficient balance");
    payable(owner).transfer(amount);  
  }

  function checkBalance() external view returns(uint){
    return address(this).balance;
  }

  receive() external payable { }
}





