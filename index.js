const loadProducts=()=>{
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then((json)=>displayProducts(json));
};

const displayProducts = (products)=>{
    
console.log(products);

}

const loadCategories=()=>{
    fetch("https://fakestoreapi.com/products/categories")
    .then(res=>res.json())
    .then((json)=>displayCategory(json));
};
const displayCategory = (categories)=>{
    
const categoryContainer=document.getElementById("category-container");
categoryContainer.innerHTML="";

for(let category of categories){

    const btnDiv = document.createElement("div");
    btnDiv.innerHTML=`
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-3xl mb-5">${category} </button>
    
    `
categoryContainer.append(btnDiv);
}
}
loadProducts();
loadCategories();