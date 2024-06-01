import { calculateCartTotal, getCartFromLocalStorage, saveToLocalStorage, updateCartIcon } from "./utils.js";

let cart = getCartFromLocalStorage(); //* ilk başta let cart = [] boş getirdik 1.local storege da öncedeb bu veri var mı yokmu?bunu bir cart dizisine aktaralım sonrasında local storage ekleme işlemi gerçekleştireceğiz. 2. daha sonra let cart = getCartFromLocalStorage komutu ile local storage daki verileri getirmesini sağladık.

//! Sepete ürün ekleyecek fonksiyondur
export function addToCart(event, products) {
  //* Tıkladığımız ürünün id sine eriştik ve id sini  number tipine çevirdik.
  const productID = parseInt(event.target.dataset.id);

  //* Products dizisi içerisinden idsine ulaştığımız ürünü bulabilmek için find metodunu kullandık
  const urun = products.find((urun) => urun.id === productID);


  //* Ürünü bulursak bu if çalışacak
  //* ürün yoksa fonksiyonu burada durdursun hata patlatmasın
  if (urun) {
    //* Sepette önceden eklediğimiz ürünü find metodu ile bulduk.
    const exitingItem = cart.find((item) => item.id === productID);

    //* Sepette bu üründen daha önce varsa if çalışacak.
    if (exitingItem) {
      //* Miktarını bir artırır
      exitingItem.quantity++;
    } else {
      //* Sepette bu üründen daha önceden yoksa sepete yeni bir ürün ekleyeceğiz.

      //* sepete anasayfaki ürünleri olduğu gibi aktarabilmem için anasayfadaki özellikleri (id,title vb. cart.js e yani sepete aktarmmam lazım. Onun cartjs içerisinde yeni bir obje oluşturcam. bu obje içerisinde cartın yani yeni ekleceğim ürünün id,title,ücreti,resmi bir de ekstradan miktarını oluşturup içerisine söyleceğim bir de esktadan local storage içerisiine ekleyeceğiz hemde  ekrana ekleceğiz.Bu ürünü bir obje olarak oluşturacağız. )

      //* ektradan bir miktar eklemem gerektiği için sepete ekleme yapabilmek için o yüzden obje oluşturuyorum. O yüzden objede bir de miktar değişkeni oluşturağız.

      const cartItem = {
        //* oluşturduğumuz obje.
        id: urun.id,
        title: urun.title,
        price: urun.price,
        image: urun.image,
        quantity: 1, //* Sepet dizisine ekleyeceğimiz ürünün miktar özeliiğini ekledik.
        //* yeni bir eleman eklersek bu sepette bir olarak gelir.sepette varsa quantity bir artır diyeceğiz.
      };

      cart.push(cartItem); //* cart dizisine yeni oluşturduğumuz objeyi gönderdik.
      event.target.textContent = "Added"; //* Ekleme butonunun içeriğini değiştirdik.

      //? cartItemi en tepedeki car dizisi içerisine nasıl gönderebiliri. Bir cart dizisi içerisine bir eleman eklemek/göndermek istersek PUSH kullanırız.

      //* aşağıda local storage ekleme işlemleri
      //* 1.cart dizisini göndereceğim çünkü onu ekleyeceğim sepeteve local storage da onu tutacağım.

      updateCartIcon(cart);
    
      saveToLocalStorage(cart);
      renderCartItems()
      displayCartTotal();
   
    }
  }
}

//! Sepetten Ürün Siler
function removeFromCart(event) {
//* Sileceğimiz elamanın id sine eriştik
const productID = parseInt(event.target.dataset.id);

//* Tıkladığım elemanı sepetten kaldır
cart = cart.filter((item) => item.id !== productID );
//* Local Storage i güncelle
saveToLocalStorage(cart); 
//* Sayfayı güncelle
renderCartItems(); 
displayCartTotal();
updateCartIcon(cart);
}

function changeQuantity(event) {
//* inputun içerisindeki değeri aldık
  const quantity = parseInt(event.target.value);
  //* Değişim olan ürünün id sine ulaştık
  const productID = parseInt(event.target.dataset.id);

  if(quantity > 0) {
   const cartItem = cart.find((item)=> item.id === productID)
  if(cartItem) {
    cartItem.quantity = quantity;
    saveToLocalStorage(cart);
    displayCartTotal();
    updateCartIcon(cart);
  }
  }

}

//! Sepetteki Ürünleri ekrana bastırır renderlar
export function renderCartItems() {
  //* cart.html sayfasında bulunan data içerisinde bulunan cartItems içerisine verilerimizi aktaracağız. Yani local storagedan veri tabanından gelen verileri

  //* id sine göre HTML etiketini aldık.
  const cartItemsElement = document.getElementById("cartItems");

  //* Sepetteki her ürün için ekrana bir tane cart-item bileşeni aktardık
  cartItemsElement.innerHTML= cart.map(
    (item) => `

    <div class ="cart-item">

     <img 
        src="${item.image}"
        alt="" />

         <div class="cart-item-info">
            <h2 class="cart-item-title">${item.title}</h2>
             <!-- number  değerinin eksi olmaması için min=1 ve value=1 verdik -->
             <input
              type="number" min="1"
             value="${item.quantity}" class="cart-item-quantity"
             data-id = "${item.id}"
             />
        </div>

        <h2 class="cart-item-price">$${item.price}</h2>
        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
    </div>



    
    `
  ) .join("");



  //* Sepetteki silme(remove) işlemine devam edelim.
  //* Tüm silme butonlarını aldık
  const removeButtons = document.getElementsByClassName("remove-from-cart")

  //* Tekrar eden bir işlem olduğu içi for döngüsünü kullancağız
  for(let i=0; i<removeButtons.length; i++ ){

 //* index numarasına göre tüm silme butonlarını seçtik
 const removeButton = removeButtons[i]; 

 //* Herbir buton için bir olay izleyicisi ekle ve bir fonksiyon çalıştır
 removeButton.addEventListener("click", removeFromCart) 
  }

  const quantityInputs = document.getElementsByClassName("cart-item-quantity")
  console.log(quantityInputs);

  for (let i = 1; i < quantityInputs.length; i++){
    const quantityInput = quantityInputs[i];
    console.log(quantityInput); 

    quantityInput.addEventListener("change", changeQuantity);
    


  }



  updateCartIcon(cart)
}


export function displayCartTotal () {
 const cartTotalElement = document.getElementById("cartTotal")
const total = calculateCartTotal (cart);
cartTotalElement.textContent = `Total: $${total.toFixed(2)}`

}

