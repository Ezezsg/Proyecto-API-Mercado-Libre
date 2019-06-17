let productos = [];

//1-DOM
const btnBuscar = document.querySelector("button.buscar");
const input = document.querySelector("input[name=q]");
const btnFinalizar = document.querySelector("button.finalizar");
const resultados = document.querySelector("div.resultados");
const ranking = document.querySelector("div.ranking");

//2-Eventos
btnBuscar.addEventListener("click", handleSearch);
resultados.addEventListener("click", handleClick);
btnFinalizar.addEventListener("click", handleReport);

//Consulto si existe el state en el LocalStorge
const state = localStorage.getItem("state");
if(state){
	//Reconstruyo productos
	const newProductos = JSON.parse(state);
	//Reconstruyo resultado de busqueda
	newProductos.forEach(i=>productos.push(new Producto(i.id, i.title, i.thumbnail, i.price, i.megusta)));
	//Dibujo cada producto en el DOM
	productos.forEach(p=>resultados.innerHTML += p.armarDom());
	//Reconstruyo ranking
	handleReport();
}

//3-Callbacks
function handleSearch(){

	productos = [];
	resultados.innerHTML = "";
	//Traer los datos de la busqueda
	fetch("https://api.mercadolibre.com/sites/MLA/search?q="+input.value)
	.then(response=>response.json())
	.then(items=>{
		console.log(items.results);
		//Construir los objetos de tipo Producto
		//results es por el objeto de la api de mercado libre
		items.results.forEach(i=>productos.push(new Producto(i.id, i.title, i.thumbnail, i.price)));
		//Dibujo cada producto en el DOM
		productos.forEach(p=>resultados.innerHTML += p.armarDom());
		handleReport();
	})
}

function handleClick(e){
	if(e.target.type=="submit"){
		const id = e.target.getAttribute('data');
		console.log("Soy un btn", id);
		const found = productos.find(prod=>prod.id == id);
		found.sumarMegusta();
		//Persistir los datos (state -"data de la aplicacion")
		localStorage.setItem("state", JSON.stringify(productos));
		handleReport();
		
	}
}

function handleReport(){
	ranking.innerHTML = "";
	productos
	.sort((a,b)=>b.megusta-a.megusta)
	.forEach(p=>{
		ranking.innerHTML += `${p.title} - ${p.megusta}<br><hr>`;
	});
	
	//Diparar el evento de topBanner
		topObserver.notify(productos[0].title);
}


