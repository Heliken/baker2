/* Trigger when page is ready */
$(document).ready(function(){

	// Your functions go here

	
	$(".main-select select").select2({
	    placeholder: "Ваш город",
	    minimumResultsForSearch: Infinity
	});
	$("#inputMaskPhone").inputmask({"mask": "+7(999) 999-99-99"});
	$(".register").click(function(){
		$(".popup").addClass("popup_active");
	})
	$('.popup-close').click(function(){
		$(this).parents('.popup').removeClass("popup_active");
	})
	$('.popup').click(function(){
		$(this).removeClass("popup_active");
	})
	$('.popup-wrap').click(function(e){
		e.stopPropagation();
	})
	$(".test-content").slick({
		fade:true,
		arrows:false,
		initialSlide:0,
		infinite:false,
		draggable:false,
        accessibility:false,
        scroll:false,
        swipe:false,
        touchMove:false,
        slide:".test-content-unit",
        adaptiveHeight:true,
        speed:0
	});
	$(".test-content-unit-bottom").slick({
		fade:true,
		arrows:false,
		initialSlide:0,
		infinite:false,
		draggable:false,
        accessibility:false,
        scroll:false,
        swipe:false,
        touchMove:false,
         speed:0
	});
	var questionNumber=1;
	var correctAnswers=0;
	$(".test-content-unit-bottom-answers-unit").click(function(){
		$(this).parents(".test-content-unit-bottom").slick("slickNext");
		var index=$(this).parents(".test-content-unit").index();
		if($(this).hasClass("test-content-unit-bottom-answers-unit_correct")){
			correctAnswers++;
			$(".test-content-progress-unit").eq(index).addClass("test-content-progress-unit_correct");
			$(this).parents(".test-content-unit-bottom").find(".test-content-unit-bottom-results-text").addClass("test-content-unit-bottom-results-text_correct");
		} else{
			$(".test-content-progress-unit").eq(index).addClass("test-content-progress-unit_wrong");
		}
	})
	$(".test-content-unit-bottom-results-button").click(function(){
		questionNumber++;
		$(".test-content-progress-title").find(".current").html(questionNumber);
		$(this).parents(".test-content").slick("slickNext");
		if($(this).parents(".test-content-unit").hasClass("test-content-unit_final")){
			$(".test-content-progress-title").html("Ваш результат "+correctAnswers+"/6");
			$(".test-content-progress").addClass("test-content-progress_final");
		}
	})

});


/* Optional triggers

$(window).load(function() {
	
});

$(window).resize(function() { 
	
});

*/