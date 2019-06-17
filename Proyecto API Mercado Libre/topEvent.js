//Patron Observer

class Observable {
			constructor(){
				this.observers = [];
			}

			subscribe(f){
				this.observers.push(f);
			}
			unsubscribe(f){
				this.observers = this.observers.filter(ob=> ob !== f);
			}
			notify(data){
				this.observers.forEach(f=>f(data));
			}
		}

/////////////////////////

const topBanner = document.querySelector("h2");
const updateBanner = data => topBanner.innerHTML = data;

const topObserver = new Observable();
topObserver.subscribe(updateBanner);
