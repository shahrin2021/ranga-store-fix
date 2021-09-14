// api data call

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showProducts(data)
      
    });
    
};

loadProducts();

// show single product details data load function

const showProductsDetails= id=>{
  const url= `https://fakestoreapi.com/products/${id}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    showSingleProduct(data)
    
  })
  console.log(url)
}
// show in ui  single product details function

const showSingleProduct=(data)=>{
const details = document.getElementById('modal-area');
details.textContent="";
const div= document.createElement('div')
// const style=['product-details'];
// div.classList.add(...style);
div.innerHTML=`
<div>
<div class="image">
<img class="product-image" src="${data.image}" alt="img">
</div>
<h5 class="category">${data.category} </h5>
<p class="discription">${data.description}</p>
<h5 class="rating"><i class="uil uil-star rate-icon"></i>${data.rating.rate}</h5>
      <h5 class="rating"><i class="uil uil-users-alt count-icon"></i>${data.rating.count}</h5>

      <button onclick="addToCart(${data.id},${data.price}),updateTotal()" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      </div>
</div> 



`;
details.appendChild(div);
}

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
   
    div.classList.add("product");
    div.innerHTML = `<div class="single-product ">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title.slice(0,20)}</h3>
      <p>Category: ${product.category}</p>
      <div class="product-rating">
      <h5 class="rating"><i class="uil uil-star rate-icon"></i>${product.rating.rate}</h5>
      <h5 class="rating"><i class="uil uil-users-alt count-icon"></i>${product.rating.count}</h5>
      </div>
      <h2>Price: $ ${product.price}</h2>
      <div class="">
      <button onclick="addToCart(${product.id},${product.price}),updateTotal()" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>

      <button data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onclick="showProductsDetails(${product.id})" id="details-btn" class="btn btn-danger" >Details</button>
      </div>
      
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// added product count 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  console.log(converted)
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  const poductPrice= total.toFixed(2)
  document.getElementById(id).innerText =parseFloat(poductPrice);
};

// set innerText function
const setInnerText = (id, value) => {
  const productCharge = value.toFixed(2)
  document.getElementById(id).innerText = parseFloat(productCharge);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function

const updateTotal = () => {
  const price=document.getElementById('price');

  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    const totalPrice= grandTotal.toFixed(2);
  document.getElementById("total").innerText =parseFloat(totalPrice);
};

