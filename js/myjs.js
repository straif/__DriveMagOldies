var f = $("#page-banner").html();
$("#page-title").html(f), $("#car-brands").hide(), $("#toggle-brands").click(function(t) {
	t.preventDefault(), $("#car-brands").slideToggle(200)
}); 