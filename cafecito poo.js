//Genero los <div> desde html con getElementById

let container = document.getElementById("container");
let carro = document.getElementById("carro");

let arrayCarrito = [];


//Genero la clase Carrito con constructor

class Carrito {
    constructor(id, cafe, cantidad){
        this.id = id;
        this.cafe = cafe;
        this.cantidad = cantidad;
    }
}

// Agrego elemento de compra nuevo al Carrito

function agregoelemento(id, elemento){
    const nuevoelemento = new Carrito(id, elemento, 1);
    console.log(nuevoelemento);
    arrayCarrito.push(nuevoelemento);
    console.log(arrayCarrito);
}

// Calculo el importe total de la compra

function calculototal(array){
    let total = 0;
    array.forEach((el, idx) => {
        total += el.cantidad * cafes[el.id-1].precio;
    })
    return total;
}

// Ante una compra chequeo si el producto ya está en carrito, en ese caso incremento cantidad, sino lo agrego

function comprar(id){
    if(arrayCarrito.some(el => el.id === id)){
        arrayCarrito.find(el => el.id === id).cantidad += 1;
        console.log(arrayCarrito);
    } else {
        agregoelemento(cafes[id-1].id, cafes[id-1].title);
    }
    alert("Producto agregado!");
    carro.innerHTML = "Carrito";
    
    // Muestro el carrito en pantalla acutalizado con cada evento de compra

    arrayCarrito.forEach((el, idx) => {
        const items = document.createElement("h5");
        carro.appendChild(items);
        const precio = cafes[el.id-1].precio;
        const subtotal = precio * el.cantidad;
        items.innerText = `${el.cafe}. Cantidad. ${el.cantidad} Precio U. $${precio} Subtotal $${subtotal}`;   
        items.className = "carrito";
        
    })
    
    //Guardo carrito en Storage
    let carritostringify = JSON.stringify(arrayCarrito);
    localStorage.setItem("Productos",carritostringify);
        
}

//Agrego funcior para vaciar carrito

function vaciarcarrito(carrito){
    let vaciar = confirm("Seguro que desea vaciar su carrito?")
    if (vaciar) {
        arrayCarrito = []; 
        console.log(arrayCarrito);
        location.reload();
        localStorage.clear();
        
    }
      
}

//Agrego el boton de vaciar carrito

const btnVaciar = document.createElement("button");
btnVaciar.innerText = "Vaciar carrito";
btnVaciar.onclick = () => vaciarcarrito(arrayCarrito);
btnVaciar.className = "btn3";
container.appendChild(btnVaciar);


//Agrego el boton de Finalizar Compra, que recorre storage para mostrar por alert la compra final

const btnFin = document.createElement("button");
btnFin.innerText = "Finalizar compra";
btnFin.onclick = () => recorrostorage(); 
btnFin.className = "btn2";
container.appendChild(btnFin);


//Muestro Storage por alert una vez finalizada la compra

function recorrostorage(){
    const productos = JSON.parse(localStorage.getItem("Productos"));
    if (productos != null){
        productos.forEach((el,idx) => {
            alert(`Carrito final: Producto ${idx+1}: ${el.cantidad} x ${el.cafe}`);
            })
        alert("El Total del pedido es $"+calculototal(productos));
        alert("Pedido confirmado!");
        arrayCarrito = [];
        location.reload();
        localStorage.clear();
    } else {alert("Carrito vacío!")}
}

//Muestro productos disponibles, con descripción, ingredientes, imagen y botón de compra

cafes.forEach((el, idx) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerText = `${idx + 1}. ${el.title}`;
    
    const imgCafe = document.createElement("img");
    imgCafe.src = el.image;
    imgCafe.className = "imagen";
   
    const btnInfo = document.createElement("button");
    btnInfo.innerText = "Descripción";
    btnInfo.onclick = () => alert(`${el.description}`); 
    btnInfo.className = "btn";

    const btnIngredientes = document.createElement("button");
    btnIngredientes.innerText = "Ingredientes";
    btnIngredientes.onclick = () => alert(`${(el.ingredients)}`);
    btnIngredientes.className = "btn";
    
    const btnComprar = document.createElement("button");
    btnComprar.innerText = "Comprar";
    btnComprar.onclick = () => comprar(el.id);
    btnComprar.className = "btn";

    card.onmousemove = () => btnComprar.innerText = `Comprar $${el.precio}`;
    card.onmouseout = () => btnComprar.innerText = "Comprar";
    
    container.appendChild(card);
    card.appendChild(imgCafe);
    card.appendChild(btnInfo);
    card.appendChild(btnIngredientes);
    card.appendChild(btnComprar);
    
});

console.log(arrayCarrito);  
