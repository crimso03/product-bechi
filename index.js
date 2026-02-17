const loadProducts=()=>{
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then((json)=>displayProducts(json));
};

const displayProducts = (products)=>{
const productContainer=document.getElementById("product-container");
productContainer.innerHTML="";

products.forEach(product => {
    const card = document.createElement("div");
    card.className =
      "card bg-base-100 ";
    card.innerHTML=`
    
  <figure class="h-60 flex items-center justify-center p-4 bg-base-200">
    <img class=" h-full pb-4 px-4 "
      src="${product.image}"/>
  </figure>

  <div class=" flex justify-between px-5 pt-4">
    <div class="badge badge-neutral badge-outline border-none bg-blue-200 text-blue-700 font-semibold"  >${product.category}</div>
    
    <div class="flex items-center gap-1">
<i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i>
<p class="font-semibold">${product.rating.rate}(${product.rating.count})</p>
    </div>
  </div>


  <div class="card-body flex flex-col flex-grow">
    <h2 class="card-title line-clamp-2 text-sm">
      ${product.title}
      </h2>
    <p class="font-bold">$${product.price}</p>

    <div class="card-actions justify-between mt-auto">
      <button class="btn btn-primary btn-outline btn-sm px-10" onclick="goToDetails(${product.id})">
      <i class="fa-regular fa-eye"></i>Details</button>

      <button class="btn btn-primary btn-sm bg-blue-700 text-white px-10">
      <i class="fa-solid fa-cart-arrow-down"></i>Add</button>
    </div>
  </div>
</div>
    
    
    `
    productContainer.appendChild(card);
});

}

const loadCategoryProduct=(category)=>{
    fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res=>res.json())
    .then(data =>displayProducts(data));
}

const loadCategories=()=>{
    fetch("https://fakestoreapi.com/products/categories")
    .then(res=>res.json())
    .then((json)=>displayCategory(json));
};
const displayCategory = (categories)=>{
    
const categoryContainer=document.getElementById("category-container");
categoryContainer.innerHTML="";

 const allCatButton = document.createElement("button");
  allCatButton.className =
    "btn btn-xs sm:btn-sm md:btn-md lg:btn-mg rounded-3xl mb-5 btn-outline btn-primary";
  allCatButton.innerText = "All Products";
  allCatButton.onclick=()=>{
    loadProducts();

    const buttons = categoryContainer.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    btn.classList.add("btn-outline");

  });

  allCatButton.classList.add("active");
  allCatButton.classList.remove("btn-outline");

  };
  

  categoryContainer.appendChild(allCatButton);



for(let category of categories){

    const btnDiv = document.createElement("button");
    btnDiv.className =
      "btn btn-xs sm:btn-sm md:btn-md lg:btn-md rounded-3xl mb-5 ml-2 btn-outline btn-primary";

    btnDiv.innerText = category;
    btnDiv.onclick = () =>{ 
        loadCategoryProduct(category);

    const buttons = categoryContainer.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.add("btn-outline");
    });
    btnDiv.classList.add("active");
    btnDiv.classList.remove("btn-outline");    

    };

    categoryContainer.appendChild(btnDiv);
};
}

const loadTrendProducts=()=>{
   fetch("https://fakestoreapi.com/products")
  .then(res=>res.json())
  .then(data=>{

    const trend=data
        .filter(product=>product.rating.rate>=4.7)
        .slice(0, 3);

      displayTrending(trend);
    });
};

const displayTrending=(products)=>{

    const trendingContainer=document.getElementById("trending-container");
    trendingContainer.innerHTML="";

    products.forEach(product => {
    const trendingCard = document.createElement("div");
    trendingCard.className =
      "card bg-base-100 ";
    trendingCard.innerHTML=`
    
  <figure class="h-60 flex items-center justify-center p-4 bg-base-200">
    <img class=" h-full pb-4 px-4 "
      src="${product.image}"/>
  </figure>

  <div class=" flex justify-between px-5 pt-4">
    <div class="badge badge-neutral badge-outline border-none bg-blue-200 text-blue-700 font-semibold"  >${product.category}</div>
    
    <div class="flex items-center gap-1">
<i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i>
<p class="font-semibold">${product.rating.rate}(${product.rating.count})</p>
    </div>
  </div>


  <div class="card-body flex flex-col flex-grow">
    <h2 class="card-title line-clamp-2 text-sm">
      ${product.title}
      </h2>
    <p class="font-bold">$${product.price}</p>

    <div class="card-actions justify-between mt-auto">
      <button onclick="goToDetails(${product.id})" class="badge badge-outline px-10 py-4">
      <i class="fa-regular fa-eye"></i>Details</button>

      <button class="btn btn-primary btn-sm bg-blue-700 text-white px-10">
      <i class="fa-solid fa-cart-arrow-down"></i>Add</button>
    </div>
  </div>
</div>
    
    
    `
    trendingContainer.appendChild(trendingCard);
});

};

const goToDetails=(id)=>{
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res=>res.json())
    .then(product=>{

        document.getElementById("modal-title").innerText=product.title;

        document.getElementById("modal-description").innerText = product.description;

        document.getElementById("modal-price").innerText = `$${product.price}`;

        document.getElementById("modal-rating").innerHTML=
        `<i class="fa-solid fa-star text-yellow-400"></i>${product.rating.rate} (${product.rating.count})`;

        document.getElementById("modal-cart").onclick = () => {
        alert(`${product.title} added to cart!`);

        };

        document.getElementById("product_modal").showModal();


    });
};




loadProducts();
loadCategories();
loadTrendProducts();
