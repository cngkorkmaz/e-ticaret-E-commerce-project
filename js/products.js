// Bu fetcproducts ne zaman çalışacak--> sayfa yüklenildiği anda

export async function fetchProducts() {
  // db.json dosyasına fetch ile istek attık.
  try {
    const responce = await fetch("db.json");

    // Hata oluşturduk
    if (!responce.ok) {
      throw new Error("URL yanlış");
    }

    // Gelen cevabı json formatına çevirdik ve dışarıya return ettik.
    return await responce.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

//! Ürünleri sayfaya render eden fonksiyonu tanımlıyoruz
export function renderProducts(products, addToCartCallback ) {
  //* HTML dosyasından ürünlerin listeleceği elementi seçtik
  const productList = document.getElementById("productList");


 //*  Ürünlerin HTML formatında listeye eklenmesi için products dizisini dönüp her bir urun için ekrana urun cartını aktardık.
 productList.innerHTML = products
 .map(
   (product) => `
 <div class="product">
     <img
         src="${product.image}"
         alt=""
         class="product-img"
     />
     <div class="product-info">
         <h2 class="product-title">${product.title}</h2>
         <p class="product-price">$${product.price}</p>
         <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
     </div>
 </div>

`
 )
 .join("");

     //* "Add to cart" butonları seçiliyor
   const addToCartButtons = (document.getElementsByClassName("add-to-cart"))

     //* Her bir "Add to cart" butonuna tıklanma olayı ekleniyor
   for (let i = 0; i < addToCartButtons.length; i++)  {
   const addToCartBotton = addToCartButtons[i];
   addToCartBotton.addEventListener("click", addToCartCallback );
   }   
}

