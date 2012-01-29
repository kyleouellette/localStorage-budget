(function($, b, undefined){
	
	var console = window.console || {'log' : function(a){return a}};
	console.log(b);

	$('#create').bind('submit', function(){
		var t = $(this),
			c = t.children();

		b.create(c[0].value,c[1].value);
		b.update();

		for(var i = 0; i < c.length; i++){
			c[i].value = '';
		}

		return false;
	});


})(jQuery, budget);