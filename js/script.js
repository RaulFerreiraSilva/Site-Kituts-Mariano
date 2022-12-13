let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

//============== Depoimento ====================
var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

//============== Carrinho ====================

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');


cartIcon.onclick = () =>{
  cart.classList.add('active');
}

closeCart.onclick = () =>{
  cart.classList.remove('active');
}

if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", ready);
}else{
  ready();
}

function ready(){
  //removendo item do carrinho
  var removeCartButtons = document.getElementsByClassName('cart-remove')
  console.log(removeCartButtons);

  for(var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem);
  }
  //mudando quantidade
   var quantityInputs = document.getElementsByClassName('cart-quantity')
   for(var i = 0; i < quantityInputs.length; i++){
     var input = quantityInputs[i];
     input.addEventListener('change', quantityChanged);
   }

   // adicionando no carrinho
   var addCart = document.getElementsByClassName('add-cart')
   for(var i = 0; i < addCart.length; i++){
     var button = addCart[i]
     button.addEventListener('click', addCartClicked);

   }
   //botao finalizar funcionando
   document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

//botao finalizar
function buyButtonClicked(){
  alert('Pedido feito')
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}



// removendo itens do carrinho
function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove();
  updatetotal();
}

//mudando quantidade
function quantityChanged(event){
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updatetotal();
}

//adicionando no carrinho
function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
 addProductToCart(title, price, productImg);
 updatetotal();
}

function addProductToCart(title, price,productImg){
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for(var i = 0; i < cartItemsNames.length; i++){
    if(cartItemsNames[i].innerText == title){
      alert('Você já adicionou esse item no carrinho'); 
      return;
    }
  }


var cartBoxContent = ` 
                      <img src="${productImg}" alt="" class="cart-img">
                      <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price"> ${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                      </div>
                      <!--remove car-->
                      <i class="fi fi-rr-trash cart-remove"></i>
`
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

//atualizando total
function updatetotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;

  for(var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes [i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('R$', ''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
    // valor com centavos
    //total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = 'R$' + total;
 
}


//============== Loader ====================
/*function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 5000);
}

window.onload = fadeOut;*/


//============== Botão Categ. ====================
$(document).ready(function(){
  $('#shop .btn').click(function(){

    let filter = $(this).attr('data-filter');
    if(filter == 'all'){
        $('#shop .product-box').show(400);
    }else{
        $('#shop .product-box').not('.'+filter).hide(200);
        $('#shop .product-box').filter('.'+filter).show(400);
    }

    $(this).addClass('button-active').siblings().removeClass('button-active');

});

});

//============== Destaque ====================
$('.small-image img').click(function(){
  $(this).addClass('image-active').siblings().removeClass('image-active');
  let image = $(this).attr('src');
  $('.big-image img').attr('src', image);

});