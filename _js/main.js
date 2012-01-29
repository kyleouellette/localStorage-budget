(function($, b, undefined){
	
	var console = window.console || {'log' : function(a){return a}},
		entries = $('#entries ul'),
		populate, show_form, is_showing = false;
	
	show_form = function(){
		if(is_showing){
			$('#add-form').fadeOut();
		}else{
			$('#add-form').fadeIn();
		}
		is_showing = !is_showing;
		return;
	}

	populate = function(){
		var li,
			i = 0;

		b.update();
		for(; i < b.saved.length; i++){
			$('<li />').html(b.saved[i].name + '<span>$'+b.saved[i].price+'</span>').attr({
				'data-number' : i
			}).appendTo(entries).bind('click', function(e){
				//show details screen here
			});
		}
	};

	populate();

	$('#create').bind('submit', function(){
		var t = $(this),
			c = t.children();
		
		entries.children().fadeOut().remove();

		show_form();
		b.create(c[0].value,c[1].value);
		populate();
		for(var i = 0; i < c.length; i++){
			c[i].value = '';
		}
		return false;
	});

	$('.toggle').bind('click', show_form);


	//delete method from the url
	if(window.location.search.match(/delete/ig)){
		b.delete(0, b.saved.length);
	}



})(jQuery, budget);