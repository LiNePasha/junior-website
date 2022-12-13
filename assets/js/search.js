let arr = JSON.parse(localStorage.places)

function showData(){

  let table = '';
  arr.map((placee, id) => {
    table += `
    <div class="col-md-4">
      <div class="card-product ">
      <img src="${placee.image1}" alt="">
      <h2>${placee.place} </h2>
      <p>
        ${placee.details} 
      </p>
      <button onclick="addToCart(${id})" id="cart-button">حط في السلة</button>
      </div>
    </div>
    `
  })


  document.getElementById('products').innerHTML = table;
}
showData()

// add to cart
let allItems = [];
function addToCart(id){
  let cartItems = document.querySelector('.cart-items')
  let choosenItem = arr.find(item => item.place === arr[id].place)
  let itemss = allItems.find(i => i.place === choosenItem.place)
  let i = 1;
  if(itemss){
    
  }else {
    allItems.push(choosenItem);
    console.log(allItems);
  }
  cartItems.innerHTML = ''
  allItems.forEach(item => {
      cartItems.innerHTML += `
      <h2>${item.place}</h2>
      `
  })
  
  
  
}
// search
let input =  document.querySelector('.input-search')
input.addEventListener("keyup" , function({keyCode,target}){
  if(keyCode === 13) { // keyCode 'Enter' = 13
    search(target.value)
  }
  if(target.value.trim() === ""){
    showData()
  }
})
function search(title){
  let taple = ''
  arr.map((product,index) => {
    if(product.place.indexOf(title) !== -1){
      taple += `
    <div class="col-md-4">
      <div class="card-product ">
      <img src="${product.image1}" alt="">
      <h2>${product.place} </h2>
      <p>
        ${product.details} 
      </p>
      <button>حط في السلة</button>
      </div>
    </div>
    `
    document.getElementById('products').innerHTML = taple;
    } else {
      return;
    }
    
  })}

