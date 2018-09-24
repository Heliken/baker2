/* Trigger when page is ready */
$(document).ready(function(){

	// Your functions go here


	$(".main-select select").select2({
	    placeholder: "Ваш город",
	    minimumResultsForSearch: Infinity
	});
	$('.main-select select').on('select2:select', function (e) {
	  	var data = e.params.data;
	    $(".main-games-unit").addClass("main-games-unit_disabled");
	    if(data.id=="Санкт-Петербург"){
	    	$(".main-games-unit").each(function(){
	    		if($(this).attr("data-city")=="Санкт-Петербург"){
	    			$(this).removeClass("main-games-unit_disabled");
	    		}

	    	})
	    }
	    if(data.id=="Москва"){
	    	$(".main-games-unit").each(function(){
	    		if($(this).attr("data-city")=="Москва"){
	    			$(this).removeClass("main-games-unit_disabled");
	    		}

	    	})
	    }
			else if(data.id=="Нижневартовск"){
	    	$(".main-games-unit").each(function(){
	    		if($(this).attr("data-city")=="Нижневартовск"){
	    			$(this).removeClass("main-games-unit_disabled");
	    		}

	    	})
	    }
			else if(data.id=="Нефтеюганск"){
	    	$(".main-games-unit").each(function(){
	    		if($(this).attr("data-city")=="Нефтеюганск"){
	    			$(this).removeClass("main-games-unit_disabled");
	    		}

	    	})
	    }
			else if(data.id=="Ноябрьск"){
	    	$(".main-games-unit").each(function(){
	    		if($(this).attr("data-city")=="Ноябрьск"){
	    			$(this).removeClass("main-games-unit_disabled");
	    		}

	    	})
	    }
			else if(data.id=="Сахалин"){
	    	$(".main-games-unit").each(function(){
	    		if($(this).attr("data-city")=="Сахалин"){
	    			$(this).removeClass("main-games-unit_disabled");
	    		}

	    	})
	    }
			else if(data.id=="Сахалин"){
	    	$(".main-games-unit").each(function(){
	    		if($(this).attr("data-city")=="Тюмень"){
	    			$(this).removeClass("main-games-unit_disabled");
	    		}

	    	})
	    }
	});
	$("#inputMaskPhone").inputmask({"mask": "+7(999) 999-99-99"});
	$(".main-games-unit-button").click(function(){

		var _this=$(this);
		var gameUnit=_this.parents(".main-games-unit");
		var gameUnitCity=gameUnit.attr("data-city");
		var gameUnitPlace=gameUnit.find(".main-games-unit-info-unit_place").html();
		var gameUnitTime=gameUnit.find(".main-games-unit-info-unit_time").html();
		var gameUnitDay=gameUnit.find(".main-games-unit-date").html();
		var gameUnitMonth=gameUnit.parents(".main-games-wrap").prev(".main-games-month").html();
		var gameUnitDate=gameUnitDay+" "+gameUnitMonth+" "+gameUnitTime;
		$("#gameDate").val(gameUnitDate);
		$("#gameCity").val(gameUnitCity);
		$("#gamePlace").val(gameUnitPlace);
	})
	$(".popup-form-submit").click(function(){
		var name=$("#contactName");
		var phone=$("#inputMaskPhone");
		var email=$("#contactEmail");
		var nameVal=String(name.val());
		var phoneVal=String(phone.val());
		var emailVal=String(email.val());
		var onlineVal=String($("#onlineGame").val());
		var bakerTag=String($("#gameTag").val());
		var dateVal=String($("#gameDate").val());
		var cityVal=String($("#gameCity").val());
		var placeVal=String($("#gamePlace").val());
		if(name.val()!=""&&phone.val().indexOf('_') < 1&&name.val()!=""){
			var yourdomain = 'mozgvacorp2'; // Your freshdesk domain name. Ex., yourcompany
	        var api_key = 'lFG6FjkFRnEyrrmH3w0q'; // Ref: https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key
	        var formdata = new FormData();


	        formdata.append('name', nameVal);
	        formdata.append('phone', phoneVal);
	        phoneVal=phoneVal.split(" ").join("");
	       	phoneVal=phoneVal.split("(").join("");
	       	phoneVal=phoneVal.split(")").join("");
	       	phoneVal=phoneVal.split("-").join("");

	       	formdata.append('priority', '1');
        	formdata.append('status', '2');
        	if($(".popup-form").hasClass("popup-form_offline")){
 				formdata.append('description', 'Имя: '+nameVal+' ,Email: '+emailVal+' , Телефон: '+phoneVal+' , Место проведения: '+placeVal+' , Город: '+cityVal+" , Дата игры: "+dateVal);
 				formdata.append('subject',"Регистрация на оффлайн игру, Baker Hughes");
 				var arr = [cityVal,bakerTag];
				for (var i = 0; i < arr.length; i++) {
				    formdata.append('tags[]', arr[i]);
				}
			}
			if($(".popup-form").hasClass("popup-form_online")){
				formdata.append('description', 'Имя: '+nameVal+' ,Email: '+emailVal+' , Телефон: '+phoneVal);
				formdata.append('subject',"Регистрация на онлайн игру, Baker Hughes");
				var arr = [bakerTag,onlineVal];
				for (var i = 0; i < arr.length; i++) {
				    formdata.append('tags[]', arr[i]);
				}

			}

		}
		$.ajax(
          {
            url: "https://"+yourdomain+".freshdesk.com/api/v2/tickets",
            type: 'POST',
            contentType: false,
            dataType: "json",
            processData: false,
            headers: {
              "Authorization": "Basic " + btoa(api_key + ":x")
            },
            data: formdata,
            success: function(data, textStatus, jqXHR) {
             	//$(".modal-text .name").html(name.val());
				//$(".modal-body").addClass("scrolled");
			 	//formdata.append('date', dateVal);
			 	//sendSms(formdata);
				name.val("");
				phone.val("");
				email.val("");
				$(".popup").removeClass("popup_active");
            },
            error: function(jqXHR, tranStatus) {


            }
          }
        );


	})
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
        speed:200
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
			//$(".test-content-progress").addClass("test-content-progress_final");
		}
	})
	var targetDate=new Date(2018, 9, 20, 18, 0, 0, 0);


	setInterval(function(){
		var currentDate=new Date();
		var dateDifferences=targetDate-currentDate;
		var fullDays=Math.floor(dateDifferences/(1000*60*60*24));
		dateDifferences=dateDifferences - fullDays*(1000*60*60*24);
		var fullHours=Math.floor(dateDifferences/(1000*60*60));
		dateDifferences=dateDifferences - fullHours*(1000*60*60);
		var fullMinutes=Math.floor(dateDifferences/(1000*60));
		$(".test-content-unit_result-timer-unit_days .test-content-unit_result-timer-unit-number").html(fullDays);
		$(".test-content-unit_result-timer-unit_hours .test-content-unit_result-timer-unit-number").html(fullHours);
		$(".test-content-unit_result-timer-unit_minutes .test-content-unit_result-timer-unit-number").html(fullMinutes);
		$(".test-content-unit_result-timer-unit_divider").addClass("test-content-unit_result-timer-unit_divider_hide");
		setTimeout(function(){
			$(".test-content-unit_result-timer-unit_divider").removeClass("test-content-unit_result-timer-unit_divider_hide");
		},300)
	},1000)


});


/* Optional triggers

$(window).load(function() {

});

$(window).resize(function() {

});

*/
