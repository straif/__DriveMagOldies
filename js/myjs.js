var f = $("#page-banner").html();
$("#page-title").html(f), $("#car-brands").hide(), $("#toggle-brands").click(function(t) {
	t.preventDefault(), $("#car-brands").slideToggle(200);
}); 

$(window).bind("pageshow", function() {
        $(".left-form").find("select").val("");
});

$("#left-find-cars-region-selector").change(function() {
        "" != $(this).val() && $("#left-find-cars-submit").removeClass("btn-disabled");
});