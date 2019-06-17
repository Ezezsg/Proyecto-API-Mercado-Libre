class Producto { //si me gusta es undefine es igual a cero
	constructor(id, title, thumbnail, price, megusta = 0){
		this.id = id; 
		this.title = title;
		this.thumbnail = thumbnail;
		this.price = price;
		this.megusta = megusta;
	} 

	sumarMegusta(){
		this.megusta += 1; 
	}

	armarDom(){
		return `
			<div ">
				<img style="float:left; margin:10px;" src="${this.thumbnail}">
				<br/>
				${this.title} ($${this.price})
				<br/>
				<button data=${this.id} class="btn btn-secondary btn-lg">Me gusta +1 </button>
				<br/>
				<br/>
				<hr>
			</div>
		`
	}
}