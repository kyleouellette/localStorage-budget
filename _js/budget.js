(function(win, $, undefined){
	var console = window.console || {'log' : function(a){return;}}
		budget = {
			'version' : '1.0.1',
			'name' : 'budget',
			'auto save' : true,
			'entries' : []
		},
		i = j = k = 0;
	

	budget.init = function(){
		this.type = (window.localStorage ? 'localStorage' : 'cookie');
		this.saved = this.update();
	};

	//returns attribute of this
	budget.get = function(what){
		return this[what];
	};

	//returns all saved entries so far
	budget.update = function(){
		if(this.type == 'localStorage'){
			return JSON.parse(window.localStorage.getItem(this.name)) || [];
		}else{
			return (function(){
				var cookies = document.cookie.split('; ');

				for(var i = 0; i < cookies.length; i++){
					if(cookies[i].split('=')[0] === this.name){
						return cookies[i];
					}
				}
			})()
		}
	};

	//returns an object
	//optionally auto saves
	budget.create = function(name, price){
		var en = {
				'name' : name,
				'price' : price,
				'date' : new Date().getTime(),
				'location' : ""
			},
			that = this;

			window.navigator.geolocation.getCurrentPosition(function(e){
				en.location = e.coords;
				that.entries.push(en);
				
				if(that['auto save']){
					that.save();
				}
			});

		 return en
	};

	//does the saving
	budget.save = function(){
		//loop through and make saved and entries one array
		for(var i = 0; i < this.entries.length; i++){
			this.saved.push(this.entries[i]);
		}

		//save to localStorage
		//should be saving to what they have -- cookies or LS which is 
		//saved in this.type
		if(this.type === 'localStorage'){
			localStorage.setItem(this.name, JSON.stringify(this.saved));
		}else{}

		this.entries = [];
		return;
	};

	//delete items from an array
	budget.delete = function(num, amount){
		var removed = this.saved.splice(num, (amount || 1));
		this.save();
		return removed;
	}

	budget.init();

	window.budget = budget;

})(this, jQuery);