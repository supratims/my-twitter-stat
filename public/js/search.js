(function() {
	function showErrors(title, message) {
		var alert = $('.modal-alert');
		alert.modal({ show : false, keyboard : true, backdrop : true});
		$('.modal-alert .modal-header h3').text(title);
		$('.modal-alert .modal-body p').text(message);
		alert.modal('show');
	}

	var $searchResults = $('.content');
	function buildObject(o) {
		return	'<div class="media">'+
		  '<a class="pull-left" href="' + (o.user.url ? o.user.url: '#')+  '">'+
			'<img class="media-object" src="' + o.user.profile_image_url + '" alt="">'+
		  '</a>'+
		  '<div class="media-body">'+
			'<h4 class="media-heading">' + o.user.name + ' (' + o.user.screen_name + ')' + ', ' + o.user.location + '</h4>'+
			'<p>' + o.user.description + '</p>' +

			'<p>' + o.text + '</p>' +
		  '</div>'+
		'</div>';
	}
	$('body').on('click', '.search-button', function() {

		$.ajax({
			url: '/api/search',
			dataType : 'json',
			type : 'GET',
			data: {searchParams: $('#param').val() },
			success: function(d){
				console.log(d);
				if (!d || !d.statuses || d.statuses.length == 0) {
					$searchResults.html("No results found. Probably no activity in recent time.");
				} else {
					$.each(d.statuses, function(i, v) {
						var cont = buildObject(v);
						$searchResults.append(cont);
					})
				}
			},
			error: function( jqXHR ,  textStatus,  errorThrown){
				console.log(jqXHR.statusText +' :: ' + textStatus + ' :: ' + errorThrown);
				showErrors('Error', errorThrown);
			}
		});
	});

})();