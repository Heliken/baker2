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
			else if(data.id=="Тюмень"){
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
	/* FRESHDESK VALUES*/
	var yourdomain = 'mozgvacorp2'; // Your freshdesk domain name. Ex., yourcompany
	var api_key = 'lFG6FjkFRnEyrrmH3w0q'; // Ref: https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key
	/* ---------------------*/

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
			
	        var formdata = new FormData();


	        formdata.append('name', nameVal);
	        formdata.append('phone', phoneVal);
	        phoneVal=phoneVal.split(" ").join("");
	       	phoneVal=phoneVal.split("(").join("");
	       	phoneVal=phoneVal.split(")").join("");
	       	phoneVal=phoneVal.split("-").join("");

	       	formdata.append('priority', '1');
        	formdata.append('status', '2');
        	if($(this).parents(".popup-form").hasClass("popup-form_offline")){
 				formdata.append('description', 'Имя: '+nameVal+' ,Email: '+emailVal+' , Телефон: '+phoneVal+' , Место проведения: '+placeVal+' , Город: '+cityVal+" , Дата игры: "+dateVal);
 				formdata.append('subject',"Регистрация на оффлайн игру, Baker Hughes");
 				var arr = [cityVal,bakerTag];
				for (var i = 0; i < arr.length; i++) {
				    formdata.append('tags[]', arr[i]);
				}
			}
			if($(this).parents(".popup-form").hasClass("popup-form_online")){
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
				$(".popup_form").removeClass("popup_active");
				$(".popup_finish").addClass("popup_active");
				setTimeout(function(){
					$(".popup_finish").removeClass("popup_active");
				},4000);
            },
            error: function(jqXHR, tranStatus) {


            }
          }
        );


	})
	
    
	function checkAmountOfPlayersStartedGame(){
		var amountOfPlayersStartedGame=0;
		var amountOfPlayersUrl='https://'+yourdomain+'.freshdesk.com/api/v2/search/tickets?query="tag:';
		var amountOfPlayersAdditionalUrl="'начал онлайн игру'";
	 	amountOfPlayersUrl=amountOfPlayersUrl.concat(amountOfPlayersAdditionalUrl);
	 	amountOfPlayersUrl=amountOfPlayersUrl.concat('"');

		$.ajax(
	      {
	        url: amountOfPlayersUrl,
	        type: 'GET',
	        contentType: false,
	        async: false,
	        headers: {
	          "Authorization": "Basic " + btoa(api_key + ":x")
	        },
	        success: function(data, textStatus, jqXHR) {
	        	amountOfPlayersStartedGame=amountOfPlayersStartedGame+data.total;
	        },
	        error: function(jqXHR, tranStatus) {


	        }
	      }
	    );
	    
		return amountOfPlayersStartedGame
	}
	
    
	$(".test-register .button").click(function(){
		var rulesAgreement=$("#rulesAgreement:checked").length > 0;
		var name=$("#contactName2");
		var phone=$(".inputMaskPhone2");
		var nickname=$("#contactNickname");
		var nameVal=String(name.val());
		var phoneVal=String(phone.val());
		var nicknameVal=String(nickname.val());
		var nicknameIsUnique=true;
		if(name.val()!=""&&phone.val().indexOf('_') < 1&&nickname.val()!=""&&rulesAgreement){
			var nicknameCheckUrl='https://'+yourdomain+'.freshdesk.com/api/v2/search/tickets?query="tag:';
			var nicknameCheckAdditionalUrl="'"+nicknameVal+"'";
			nicknameCheckUrl=nicknameCheckUrl.concat(nicknameCheckAdditionalUrl);
			nicknameCheckUrl=nicknameCheckUrl.concat('"');
			/* check nickname for uniqueness*/
			$.ajax(
	          {
	            url: nicknameCheckUrl,
	            type: 'GET',
	            contentType: false,
	            async:false,
	            headers: {
	              "Authorization": "Basic " + btoa(api_key + ":x")
	            },
	            success: function(data, textStatus, jqXHR) {
	            	if(data.total>0){
	            		console.log(1);
	            		nicknameIsUnique=false;
	            		proceedUniqueData();
	            	} else{
	            		registerOnlineGameUserUser();
	            	}
	            	
	            },
	            error: function(jqXHR, tranStatus) {
	            	

	            }
	          }
	        );
	        function proceedUniqueData(){
	        	if(!(nicknameIsUnique)){
		        	var input_nickname=$(".input-wrap_nickname");
			    	input_nickname.addClass("input-wrap_error");
			    	setTimeout(function(){
			    		input_nickname.removeClass("input-wrap_error");
			    	},3000);
	        	}
	        }
	        function registerOnlineGameUserUser(){
	        	var formdata = new FormData();
	        	var amountOfPlayersStartedGame=checkAmountOfPlayersStartedGame();
	        	var playerID=amountOfPlayersStartedGame+1;
	        	formdata.append('name', nameVal);
		        formdata.append('phone', phoneVal);
		        //formdata.append('custom_fields[department]','IT');
		        phoneVal=phoneVal.split(" ").join("");
		       	phoneVal=phoneVal.split("(").join("");
		       	phoneVal=phoneVal.split(")").join("");
		       	phoneVal=phoneVal.split("-").join("");
		       	formdata.append('priority', '1');
        		formdata.append('status', '2');
        		formdata.append('description', 'Начал онлайн игру. Имя: '+nameVal+' , Телефон: '+phoneVal+' , Псевдоним: '+nicknameVal+', ID пользователя:'+playerID);
 				formdata.append('subject',"Старт онлайн игры , Baker Hughes");
 				var arr = ['начал онлайн игру',nicknameVal];
				for (var i = 0; i < arr.length; i++) {
				    formdata.append('tags[]', arr[i]);
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
						name.val("");
						phone.val("");
						nickname.val("");
						$(".popup_form").removeClass("popup_active");
						$(".popup_finish").addClass("popup_active");
						setTimeout(function(){
							$(".popup_finish").removeClass("popup_active");
						},4000);
						$(".test-wrap").slick("slickNext");
		            },
		            error: function(jqXHR, tranStatus) {


		            }
		          }
		        );
	        };
			
		}
		

	})
	var questions;

	$.getJSON( "localization.json", function( json ) {
    	questions=json;

	}).done(function() {
		executeQuestionParsing(questions[0]);
		executeQuestionParsing(questions[1]);
	});

	function executeQuestionParsing(questionObject){
		var id=questionObject.id;
		var answers=convertStringToArray(questionObject.answers);

		var text=questionObject.text;
		var correctAnswer=questionObject.correctAnswer;
		var commentCorrect=questionObject.commentCorrect;
		var commentWrong=questionObject.commentWrong;
		if(questionObject.imagesQuestion){
			var imagesQuestion=convertStringToArray(questionObject.imagesQuestion);
		} else{
			imagesQuestion=[];
		}
		if(questionObject.imagesAnswer){
			var imagesAnswer=convertStringToArray(questionObject.imagesAnswer);
		} else{
			imagesAnswer=[];
		}
		/*
		console.log(id);
		console.log(answers);
		console.log(text);
		console.log(correctAnswer);
		console.log(commentCorrect);
		console.log(commentWrong);
		console.log(imagesQuestion);
		console.log(imagesAnswer);
		console.log("-----------------------------");
		*/
	}

	function convertStringToArray(string){
		var string=string;
    	//string=string.replace(/"/g, '');
		var array=[];
		var objectFromString=string.split("|");
		for (var key in objectFromString) {
			array.push(objectFromString[key]);

		}
		return array;
	}
	
    
   
	$(".test-wrap").slick({
		fade:true,
		arrows:false,
		initialSlide:0,
		infinite:false,
		draggable:false,
        accessibility:false,
        scroll:false,
        swipe:false,
        touchMove:false,
        adaptiveHeight:true,
        speed:200
	});
	$(".register").click(function(){
		var _this=$(this);
		if(_this.parents(".main-games-unit").hasClass("main-games-unit_disabled")){
			if($('.main-select select').val()==""){
				$('html, body').animate({
	                scrollTop: $(".main-select").offset().top
	            }, 2000);
	            $(".main-select").addClass("main-select_error");
	            setTimeout(function(){
	            	$(".main-select").removeClass("main-select_error");
	            },3000)
	        }
		} else{
			$(".popup_form").addClass("popup_active");
		}
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
	$("#showRules").click(function(){
		$(".popup_rules").addClass("popup_active");
	})
	$(".popup_rules .button").click(function(){
		$(this).parents(".popup").removeClass("popup_active");
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
			//$(".test-content-progress").addClass("test-content-progress_final")
			$(".test-content").addClass("test-content_final");
		}

	})
	var targetDate=new Date(2018, 7, 22, 20, 0, 0, 0);

	var currentDate=new Date();
	if(targetDate<=currentDate){
		$(".test-content-unit_result .test-content-unit-button").addClass("test-content-unit-button_shown");
		$(".test-info-button").addClass("button_disabled");
		$(".test-content-unit_result-timer").addClass("test-content-unit_result-timer_hidden");
		$(".test-content-unit_result-title").html("Вы — молодец! У вас все шансы занять неплохое место на зачетной игре. Если готовы, придумайте себе смешной псевдоним, и можете начинать зачетную игру. Удачи!");

	}
	setInterval(function(){
		var currentDate=new Date();
		var dateDifferences=targetDate-currentDate;
		var fullDays=Math.floor(dateDifferences/(1000*60*60*24));
		if(fullDays<10){
			fullDays="0"+fullDays;
		}
		dateDifferences=dateDifferences - fullDays*(1000*60*60*24);
		var fullHours=Math.floor(dateDifferences/(1000*60*60));
		if(fullHours<10){
			fullHours="0"+fullHours;
		}
		dateDifferences=dateDifferences - fullHours*(1000*60*60);
		var fullMinutes=Math.floor(dateDifferences/(1000*60));
		if(fullMinutes<10){
			fullMinutes="0"+fullMinutes;
		}
		$(".test-content-unit_result-timer-unit_days .test-content-unit_result-timer-unit-number").html(fullDays);
		$(".test-content-unit_result-timer-unit_hours .test-content-unit_result-timer-unit-number").html(fullHours);
		$(".test-content-unit_result-timer-unit_minutes .test-content-unit_result-timer-unit-number").html(fullMinutes);
		$(".test-content-unit_result-timer-unit_divider").addClass("test-content-unit_result-timer-unit_divider_hide");
		setTimeout(function(){
			$(".test-content-unit_result-timer-unit_divider").removeClass("test-content-unit_result-timer-unit_divider_hide");
		},300)
		if(targetDate<=currentDate){
			$(".test-content-unit_result .test-content-unit-button").addClass("test-content-unit-button_shown");
			$(".test-info-button").addClass("button_disabled");
			$(".test-content-unit_result-timer").addClass("test-content-unit_result-timer_hidden");
		}
	},1000)
	$(".test-content-unit_result .test-content-unit-button").click(function(){
		$(".test-wrap").slick("slickNext");
	})
	var windowWidth=$(window).outerWidth(true);
	 if(windowWidth<768){
	 	$(".test-main-introUnit-container").each(function(){
	 		var _this=$(this);
	 		var image=_this.find('.test-main-introUnit-image');
	 		$(".test-main-introUnit-navigation").after(image);
	 	})
	 }
});
$(window).on("load resize",function(){
	 var windowWidth=$(window).outerWidth(true);
	 if(windowWidth<768){
	 	$(".test-main-introUnit-container").each(function(){
	 		var _this=$(this);
	 		var image=_this.find('.test-main-introUnit-image');
	 		$(".test-main-introUnit-navigation").after(image);
	 	})
	 }
})

/* Optional triggers

$(window).load(function() {

});

$(window).resize(function() {

});

*/
