(function($, b, undefined){
	
	var console = window.console || {'log' : function(a){return a}},
		entries = $('#entries ul'),
		populate;
	console.log(b);

	populate = function(){
		var li,
			i = 0;

		b.update();
		for(; i < b.saved.length; i++){
			$('<li />').html(b.saved[i].name + '<span>$'+b.saved[i].price+'</span>').attr({
				'data-number' : i
			}).appendTo(entries).bind('click', function(e){
				console.log($(this).attr('data-number'));
			});
		}
	};

	populate();

	$('#create').bind('submit', function(){
		var t = $(this),
			c = t.children();

		$(this).parent().slideToggle();

		b.create(c[0].value,c[1].value);
		
		populate();

		for(var i = 0; i < c.length; i++){
			c[i].value = '';
		}

		return false;
	});

	$('h3').bind('click', function(){
		$('#add-form').slideToggle();
	});

	//delete method from the url
	if(window.location.search.match(/delete/ig)){
		b.delete(0, b.saved.length);
	}



})(jQuery, budget);