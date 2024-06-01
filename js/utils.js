//* Local storage ekleme için oluşturduk

//* bunun içine gönderdiğim veriye göre local storage a ekleme yapacağım.
export function saveToLocalStorage (cart) { 
    //* localstorage a gönderme yani veri ekleme komutları string şekilde ekledik
  localStorage.setItem("cart", JSON.stringify(cart));

}

 //* başlangıçta local storage dan verileri cart a yani sepete getiecek fonksiyon.
  export function getCartFromLocalStorage() { 

    //* LocalStorege da cart adında bir key varsa onları json formatında getir.
    //* yoksa da boş bir dizi dönder.
    return JSON.parse(localStorage.getItem("cart")) || [] ; //* eğer localstorage de veri varsa getir yoksa local storage da boş bir dizi dönder. Çünkü  sepet local storage üzeründen yönlendiriliyorsa ilk defa sayfaya girdiğimizde sepet boş olduğundan hata verirdi. O yüzden sepet boş ise boş bir dizi gönder dedik.


}


//* Sepetteki ürün miktarını hesaplar
export function updateCartIcon(cart) {
  console.log(cart);
  const cartIcon = document.getElementById("cart-icon")
const i = document.querySelector(".bx-shopping-bag")
console.log(i);

let totalQuantity = cart.reduce((sum, item)=> sum + item.quantity, 0);
console.log(totalQuantity);

i.setAttribute("data-quantity", totalQuantity);
// cartIcon.setAttribute("data-quantity", totalQuantity);

}


export function calculateCartTotal(cart) {
return cart.reduce((sum, item) => sum + item.price*item.quantity, 0)

}
  





