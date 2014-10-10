(function() {
	function showErrors(title, message) {
		var alert = $('.modal-alert');
		alert.modal({ show : false, keyboard : true, backdrop : true});
		$('.modal-alert .modal-header h3').text(title);
		$('.modal-alert .modal-body p').text(message);
		alert.modal('show');
	}

	var $followersContent = $('.content .followers');
	function buildObject(o) {
		return	'<div class="media">'+
		  '<a class="pull-left" href="' + (o.url ? o.url: '#')+  '">'+
			'<img class="media-object" src="' + o.profile_image_url + '" alt="">'+
		  '</a>'+
		  '<div class="media-body">'+
			'<h4 class="media-heading">' + o.name + ' (' + o.screen_name + ')' + ', ' + o.location + '</h4>'+
			'<p>' + o.description + '</p>' +
			'<p> <span class="badge pull-left">' + o.followers_count + '</span> Followers </p>' +
			'<p> <span class="badge pull-left">' + o.statuses_count + '</span> Tweets </p>' +
		  '</div>'+
		'</div>';
	}
	$.ajax({
		url: '/api/followers/get',
		dataType : 'json',
		type : 'GET',
		data: { },
		success: function(d){
			console.log(d);
			var ar = d.users;
			ar.sort(function(a, b) {
				return	b.followers_count - a.followers_count;
			});
			$.each(ar, function(i, v) {
				var cont = buildObject(v);
				$followersContent.append(cont);
			})
		},
		error: function( jqXHR ,  textStatus,  errorThrown){
			console.log(jqXHR.statusText +' :: ' + textStatus + ' :: ' + errorThrown);
			showErrors('Error', errorThrown);
		}
	});


})();