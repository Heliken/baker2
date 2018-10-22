


/* Trigger when page is ready */
$(document).ready(function(){

	// Your functions go here
	//Cookies.remove('playerID');
	//Cookies.remove("playerResults");
	//Cookies.remove("playerResults");
	//Cookies.set("playerID",860);
	//Cookies.set('playerStartedTour',6);
	//Cookies.set("playerResults",['1','2','3','4','5']);
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
	$(".test-main-introUnit-button").click(function(){
		$(this).parents(".test-main-segment ").slick("slickNext");
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
	        	
	        	formdata.append('name', nameVal);
		        formdata.append('phone', phoneVal);
		        //formdata.append('custom_fields[department]','IT');
		        phoneVal=phoneVal.split(" ").join("");
		       	phoneVal=phoneVal.split("(").join("");
		       	phoneVal=phoneVal.split(")").join("");
		       	phoneVal=phoneVal.split("-").join("");
		       	formdata.append('priority', '1');
        		formdata.append('status', '2');
        		formdata.append('description', 'Начал онлайн игру. Имя: '+nameVal+' , Телефон: '+phoneVal+' , Псевдоним: '+nicknameVal);
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
		            	Cookies.set('playerNickname',nicknameVal);
		            	Cookies.set('playerID',data.id);
		            	Cookies.set('playerStartedTour',1);
		            	
						name.val("");
						phone.val("");
						nickname.val("");
						$(".popup_form").removeClass("popup_active");
						$(".popup_finish").addClass("popup_active");
						setTimeout(function(){
							$(".popup_finish").removeClass("popup_active");
						},1000);
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
	var questionsTour1=[];
	var questionsTour2=[];
	var questionsTour3=[];
	var questionsTour4=[];
	var questionsTour5=[];
	$.ajaxSetup({
		async: false
	});
	

	
	$.getJSON( "localization.json", function( json ) {
    	questions=json;
    	
	}).done(function() {
		separateQuestions(questions);
		//fillSegment(1);
	});
	
	function separateQuestions(questionsList){
		$.each(questionsList, function(index, val) { 
  			executeQuestionParsing(val);
		});
	}
	function executeQuestionParsing(questionObject){

		var id=questionObject.id;
		var tourNumber=parseInt(id.charAt(1));
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
		var questionObject={
			"id":id,
			"answers":answers,
			"text":text,
			"correctAnswer":correctAnswer,
			"commentCorrect":commentCorrect,
			"commentWrong":commentWrong,
			"imagesQuestion":imagesQuestion,
			"imagesAnswer":imagesAnswer
		}
		
		switch(tourNumber){
			case 1:
			questionsTour1.push(questionObject);
			break;
			case 2:
			questionsTour2.push(questionObject);
			break;
			case 3:
			questionsTour3.push(questionObject);
			break;
			case 4:
			questionsTour4.push(questionObject);
			break;
			case 5:
			questionsTour5.push(questionObject);
			break;
			default:
			break;



		}
		
		
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
	
	function shuffle(array) {

	  var currentIndex = array.length;
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {
	  	
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
}
	function fillSegment(segmentNumber){
		var arrayToChooseFrom;
		switch(parseInt(segmentNumber)){
			case 1:
			arrayToChooseFrom=questionsTour1;
			break;
			case 2:
			arrayToChooseFrom=questionsTour2;
			break;
			case 3:
			arrayToChooseFrom=questionsTour3;
			break;
			case 4:
			arrayToChooseFrom=questionsTour4;
			break;
			case 5:
			arrayToChooseFrom=questionsTour5;
			break;
			default:
			break;
		}

		arrayToChooseFrom=shuffle(arrayToChooseFrom);
		var sixQuestions=arrayToChooseFrom.slice(0,6);
		var segmentToFillClass=".test-main-segment_0"+segmentNumber;
		var segmentToFill=$(segmentToFillClass);
		$.each(sixQuestions, function( index, value ) {
			

			var testMainUnit=segmentToFill.find(".test-main-unit").eq(index);
			var testMainUnitText=testMainUnit.find(".test-main-body-text");
			var testMainUnitCorrectComment=testMainUnit.find(".test-main-body-footer-results-info-text-inner_correct");
			var testMainUnitWrongComment=testMainUnit.find(".test-main-body-footer-results-info-text-inner_wrong");
			var imagesQuestion=value.imagesQuestion;
			var imagesAnswer=value.imagesAnswer;
			var answers=value.answers;
			var correctAnswer=value.correctAnswer;
			$.each(answers, function( index, value ) {
				if(value.charAt(0)==" "){
					value=value.substring(1);
				}
				if(value.charAt(value.length-1)==" "){
					value=value.slice(0, -1);
				}
				testMainUnit.find(".test-main-body-footer-answers-unit").eq(index).html(value);
				var areAnswerCorrect=value.localeCompare(correctAnswer);
				if(areAnswerCorrect==0){
					testMainUnit.find(".test-main-body-footer-answers-unit").eq(index).addClass("test-main-body-footer-answers-unit_correct");
				}
			})
			testMainUnitText.html(value.text);
			testMainUnitCorrectComment.html(value.commentCorrect);
			testMainUnitWrongComment.html(value.commentWrong);
			var imagesQuestionWrap=testMainUnit.find(".test-main-body-images-wrap_beforeAnswer");
			var imagesAnswerWrap=testMainUnit.find(".test-main-body-images-wrap_afterAnswer");
			var imageFiller='<div class="test-main-body-images-unit"><img class="filler" src="images/main-question-filler.png" alt=""></div>';
			imagesQuestionWrap.html("");
			imagesAnswerWrap.html("");
			if(imagesQuestion.length==0&&imagesAnswer.length>0){
				imagesQuestionWrap.append(imageFiller);
				$.each(imagesAnswer, function( index, value ) {
					var imgToAppend='<div class="test-main-body-images-unit"><img src='+value+' alt=""></div>';
					imagesAnswerWrap.append(imgToAppend);
				})
			}else if(imagesQuestion.length>0&&imagesAnswer.length==0){
				$.each(imagesQuestion, function( index, value ) {
					var imgToAppend='<div class="test-main-body-images-unit"><img src='+value+' alt=""></div>';
					imagesQuestionWrap.append(imgToAppend);
				})
				$.each(imagesQuestion, function( index, value ) {
					var imgToAppend='<div class="test-main-body-images-unit"><img src='+value+' alt=""></div>';
					imagesAnswerWrap.append(imgToAppend);
				})
			}else if(imagesQuestion.length>0&&imagesAnswer.length>0){
				$.each(imagesQuestion, function( index, value ) {
					var imgToAppend='<div class="test-main-body-images-unit"><img src='+value+' alt=""></div>';
					imagesQuestionWrap.append(imgToAppend);
				})
				$.each(imagesAnswer, function( index, value ) {
					var imgToAppend='<div class="test-main-body-images-unit"><img src='+value+' alt=""></div>';
					imagesAnswerWrap.append(imgToAppend);
				})
			}else if(imagesQuestion.length==0&&imagesAnswer.length==0){
				testMainUnit.addClass("test-main-unit_noImage");
			}

		})
		initInnerSlides(segmentToFill);
	}

	
   
	function initInnerSlides(segmentWhereToInitInnerSlides){

		/* слайдер четвертого порядка */
	    segmentWhereToInitInnerSlides.find(".test-main-body-images-wrap").on('init', function(event,slick){
	    	event.stopPropagation()
	    })
	   	segmentWhereToInitInnerSlides.find(".test-main-body-images-wrap").on('beforeChange', function(event, slick, currentSlide, nextSlide){
			event.stopPropagation();
	    })
	    segmentWhereToInitInnerSlides.find(".test-main-body-images-wrap").on('afterChange', function(event, slick, currentSlide, nextSlide){
			event.stopPropagation();
	    })
		segmentWhereToInitInnerSlides.find(".test-main-body-images-wrap").slick({
			fade:true,
			arrows:false,
			initialSlide:0,
			infinite:false,
			//draggable:false,
	        accessibility:false,
	        //scroll:false,
	        //swipe:false,
	        //touchMove:false,
	        adaptiveHeight:true,
	        speed:200,
	        dots:true,


		});
		/* слайдер третьего  порядка*/
		segmentWhereToInitInnerSlides.find(".test-main-body-images-body").on('init', function(slick){

	 		var slidesAmount=$(this).find(".test-main-body-images-wrap").eq(0).find(".test-main-body-images-unit").length;
	 		if(slidesAmount>1){
	 			$(this).parents(".test-main-body-images").addClass("test-main-body-images_multislide");
	 		} else{
	 			$(this).parents(".test-main-body-images").removeClass("test-main-body-images_multislide");
	 		}
		});
		segmentWhereToInitInnerSlides.find(".test-main-body-images-body").on('beforeChange', function(event, slick, currentSlide, nextSlide){
	 		
	 		var slidesAmount=$(this).find(".test-main-body-images-wrap").eq(nextSlide).find(".test-main-body-images-unit").length;
	 		if(slidesAmount>1){
	 			$(this).parents(".test-main-body-images").addClass("test-main-body-images_multislide");
	 		} else{
	 			$(this).parents(".test-main-body-images").removeClass("test-main-body-images_multislide");
	 		}

		});
		segmentWhereToInitInnerSlides.find(".test-main-body-images-body").on('afterChange', function(event, slick, currentSlide){
	 		$(this).find(".test-main-body-images-wrap").eq(currentSlide).addClass("test-main-body-images-wrap_answer");
		});
		segmentWhereToInitInnerSlides.find(".test-main-body-images-body").slick({
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

	}
	/* слайдер третьего  порядка*/
	$(".test-main-body-footer").on('afterChange', function(event, slick, currentSlide){
		var results=$(this).find(".test-main-body-footer-results");
		if(results.css("opacity")=="1"){
			results.addClass("test-main-body-footer-results_current");
		}
	})
	$(".test-main-body-footer").slick({
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
	})
	
	
	/* слайдер второго порядка*/

	
	$(".test-main-segment").on('afterChange', function(event, slick, currentSlide){

		$(".test-wrap").children(".slick-list").children(".slick-track").children(".slick-slide").height("auto");
		$(".test-wrap").slick("setOption", '', '', true);
		$(this).find(".test-main-unit").eq(currentSlide-1).addClass("test-main-unit_current");
	})
	$(".test-main-segment").slick({
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
        //speed:200
	})
	
   	/* слайдер первого порядка*/
   	$(".test-wrap").on('afterChange', function(event, slick,nextSlide, currentSlide){
		$(this).find(".test-main-segment").each(function(){
			if($(this).css("opacity")=="1"){
				$(this).addClass("test-main-segment_started");
			}
		})
	})
	$(".test-wrap").slick({
		fade:true,
		arrows:false,
		initialSlide:7,
		infinite:false,
		draggable:false,
        accessibility:false,
        scroll:false,
        swipe:false,
        touchMove:false,
        adaptiveHeight:true,
        speed:200
	});
	
	var playerExists=Cookies.get("playerID");
	
	if(playerExists){
		var playerStartedTour=parseInt(Cookies.get('playerStartedTour'));
		$(".test-wrap").slick('slickGoTo',playerStartedTour+1,true);
		if(playerStartedTour<6){
			fillSegment(playerStartedTour);
		} else{
			fillRatingTable(playerExists);
		}
	} else{
		fillSegment(1);
	}
	
	function fillRatingTable(playerID){
		var finishedPlayersUrl='https://'+yourdomain+'.freshdesk.com/api/v2/search/tickets?query="tag:';
		var finishedPlayersAdditionalUrl="'закончил онлайн игру'";
		finishedPlayersUrl=finishedPlayersUrl.concat(finishedPlayersAdditionalUrl);
		finishedPlayersUrl=finishedPlayersUrl.concat('"');
		/* check nickname for uniqueness*/
		var finishedPlayersJson;
		$.ajax(
          {
            url: finishedPlayersUrl,
            type: 'GET',
            contentType: false,
            async:false,
            headers: {
              "Authorization": "Basic " + btoa(api_key + ":x")
            },
            success: function(data, textStatus, jqXHR) {
            	
            	finishedPlayersJson=data;
            	
            },
            error: function(jqXHR, tranStatus) {
            	

            }
          }
        );
		var finishedPlayersArray=parseFinishedPlayersIntoArray(finishedPlayersJson);
		
		$.each(finishedPlayersArray,function(index,value){
			value.totalPoints=value.playerResults.reduce(function(prev, cur) { return prev + cur;})
		})
		
		customArraySort(finishedPlayersArray,true);

		var tour1BestResults=[];
		$.each(finishedPlayersArray,function(index,value){
			if(value.playerResults[0]==7){
				tour1BestResults.push(value);
			}
			
		})
		tour1BestResults=shuffle(tour1BestResults);
		tour1BestResults=tour1BestResults.slice(0,6);
		customArraySort(tour1BestResults,false);
		$.each(tour1BestResults,function(index,value){
			var elem='<div class="test-rating-best-unit-body-unit"><div class="test-rating-best-unit-body-unit-title">'+value.playerNickname+'</div><div class="test-rating-best-unit-body-unit-points">'+value.totalPoints+'</div></div>';
			$(".test-rating-best-unit_01 .test-rating-best-unit-body").append(elem);
		})

		var tour2BestResults=[];
		$.each(finishedPlayersArray,function(index,value){
			if(value.playerResults[1]==6){
				tour2BestResults.push(value);
			}
			
		})
		tour2BestResults=shuffle(tour2BestResults);
		tour2BestResults=tour2BestResults.slice(0,6);
		customArraySort(tour2BestResults,false);
		$.each(tour2BestResults,function(index,value){
			var elem='<div class="test-rating-best-unit-body-unit"><div class="test-rating-best-unit-body-unit-title">'+value.playerNickname+'</div><div class="test-rating-best-unit-body-unit-points">'+value.totalPoints+'</div></div>';
			$(".test-rating-best-unit_02 .test-rating-best-unit-body").append(elem);
		})

		var tour3BestResults=[];
		$.each(finishedPlayersArray,function(index,value){
			if(value.playerResults[2]==6){
				tour3BestResults.push(value);
			}
			
		})
		tour3BestResults=shuffle(tour3BestResults);
		tour3BestResults=tour3BestResults.slice(0,6);
		customArraySort(tour3BestResults,false);
		$.each(tour3BestResults,function(index,value){
			var elem='<div class="test-rating-best-unit-body-unit"><div class="test-rating-best-unit-body-unit-title">'+value.playerNickname+'</div><div class="test-rating-best-unit-body-unit-points">'+value.totalPoints+'</div></div>';
			$(".test-rating-best-unit_03 .test-rating-best-unit-body").append(elem);
		})

		var tour4BestResults=[];
		$.each(finishedPlayersArray,function(index,value){
			if(value.playerResults[3]==6){
				tour4BestResults.push(value);
			}
			
		})
		tour4BestResults=shuffle(tour4BestResults);
		tour4BestResults=tour4BestResults.slice(0,6);
		customArraySort(tour4BestResults,false);
		$.each(tour4BestResults,function(index,value){
			var elem='<div class="test-rating-best-unit-body-unit"><div class="test-rating-best-unit-body-unit-title">'+value.playerNickname+'</div><div class="test-rating-best-unit-body-unit-points">'+value.totalPoints+'</div></div>';
			$(".test-rating-best-unit_04 .test-rating-best-unit-body").append(elem);
		})
		var tour5BestResults=[];
		$.each(finishedPlayersArray,function(index,value){
			if(value.playerResults[4]==6){
				tour5BestResults.push(value);
			}
			
		})
		tour5BestResults=shuffle(tour5BestResults);
		tour5BestResults=tour5BestResults.slice(0,6);
		customArraySort(tour5BestResults,false);
		$.each(tour5BestResults,function(index,value){
			var elem='<div class="test-rating-best-unit-body-unit"><div class="test-rating-best-unit-body-unit-title">'+value.playerNickname+'</div><div class="test-rating-best-unit-body-unit-points">'+value.totalPoints+'</div></div>';
			$(".test-rating-best-unit_05 .test-rating-best-unit-body").append(elem);
		})
		var separatedArray=[];
		var arrayDublicate=finishedPlayersArray;
		
		while(arrayDublicate.length) {
    		separatedArray.push(arrayDublicate.splice(0,30));
		}
		
		$.each(separatedArray,function(index,value){
			var tableWrap=$(".test-rating-table-wrap");
			var tableUnit="<div class='test-rating-table-unit'></div>";
			tableWrap.append(tableUnit);
			var tableUnitObject=tableWrap.find(".test-rating-table-unit").last();
			tableUnitObject.append("<table></table>");
			var tableUnitTableObject=tableUnitObject.find("table");
			tableUnitTableObject.append("<tbody></tbody>");
			var tableUnitTableBodyObject=tableUnitTableObject.find("tbody");
			var smallArray=value;
			$.each(smallArray,function(index,value){

				var playerUnit='<tr><td>'+value.playerNickname+'</td><td></td><td>'+value.playerResults[0]+'</td><td>'+value.playerResults[1]+'</td><td>'+value.playerResults[2]+'</td><td>'+value.playerResults[3]+'</td><td>'+value.playerResults[4]+'</td><td>'+value.totalPoints+'</td><td>'+value.placeInRating+'</td>';
				if(value.playerID==parseInt(Cookies.get("playerID"))){
					$(".test-rating-table-player tbody").append(playerUnit);
				}
				tableUnitTableBodyObject.append(playerUnit);
			})
			$(".test-rating-table-numeration").each(function(){
				
				var numerationUnit="<div class='test-rating-table-numeration-unit'>"+parseInt(index+1)+"</div>";
				$(this).append(numerationUnit);

			})

		})
		$(".test-rating-table-numeration").each(function(){
			$(this).find(".test-rating-table-numeration-unit").eq(0).addClass("test-rating-table-numeration-unit_active");
		})
		$('.test-rating-table-wrap').slick({
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
		})

	}
	
	function customArraySort(playersArray,addPosition){
		playersArray.sort(function (a, b) {
		  if (a.totalPoints < b.totalPoints) {
		    return 1;
		  } else if (a.totalPoints > b.totalPoints) {
		    return -1;
		  } else{
		  	if(a.playerResults[2]<b.playerResults[2]){
			  	return 1;
			} else if(a.playerResults[2]>b.playerResults[2]){
			  	return -1;
			} else {
			  	if(a.playerResults[4]<b.playerResults[4]){
				  	return 1;
			  	} else if(a.playerResults[4]>b.playerResults[4]){
			  		return -1;
			  	} else{
				  	if(a.playerResults[0]<b.playerResults[0]){
					  	return 1;
					} else if(a.playerResults[0]>b.playerResults[0]){
					  	return -1;
					} else{
					  	if(a.playerResults[1]<b.playerResults[1]){
					  	return 1;
						} else if(a.playerResults[1]>b.playerResults[1]){
						  	return -1;
						} else{
						  	if(a.playerResults[3]<b.playerResults[3]){
							  	return 1;
							} else if(a.playerResults[3]>b.playerResults[3]){
							  	return -1;
							} else{
							  	return 0
							}
						}
					}
				}
			}
		 }
		  
		 // return 0;
		});
		if(addPosition){
			addPositionToArray(playersArray);
		}
	}
	function addPositionToArray(playersArray){
		var dontChangeNextElem=false;
		for(var i=0;i<playersArray.length;i++){
			playersArray[i].placeInRating=i+1;
		}
		
		

		

	}
	function parseFinishedPlayersIntoArray(finishedPlayersJson){
		var array=[];
		$.each(finishedPlayersJson.results,function(index,value){
			var element={};
			element.playerID=value.id;
			element.playerResults=parseDescriptionTextForPlayerResults(value.description_text);
			element.playerNickname=parseDescriptionTextForPlayerNickname(value.description_text);
			array.push(element);
		})
		return array
	}
	function parseDescriptionTextForPlayerNickname(description){
		var nicknameTitle="Псевдоним: ";
		var toursNickname=description.substring(description.indexOf("Псевдоним: ")+nicknameTitle.length,description.indexOf("|"));
		return toursNickname;
	}
	function parseDescriptionTextForPlayerResults(description){
		var arrayOfPoints=[];
		var toursResults=description.substring(description.indexOf("tour№1:"));
		
		var tour1Results=toursResults.substring(toursResults.indexOf("tour№1:"),toursResults.indexOf("|",toursResults.indexOf("tour№1:")));
		var tour1Points=parseInt(tour1Results.slice(-1));
		arrayOfPoints.push(tour1Points);
		
		
		var tour2Results=toursResults.substring(toursResults.indexOf("tour№2:"),toursResults.indexOf("|",toursResults.indexOf("tour№2:")));
		var tour2Points=parseInt(tour2Results.slice(-1));
		arrayOfPoints.push(tour2Points);
		
		
		var tour3Results=toursResults.substring(toursResults.indexOf("tour№3:"),toursResults.indexOf("|",toursResults.indexOf("tour№3:")));
		var tour3Points=parseInt(tour3Results.slice(-1));
		arrayOfPoints.push(tour3Points);

		
		var tour4Results=toursResults.substring(toursResults.indexOf("tour№4:"),toursResults.indexOf("|",toursResults.indexOf("tour№4:")));
		var tour4Points=parseInt(tour4Results.slice(-1));
		arrayOfPoints.push(tour4Points);

		var tour5Results=toursResults.substring(toursResults.indexOf("tour№5:"),toursResults.indexOf("|",toursResults.indexOf("tour№5:")));
		var tour5Points=parseInt(tour5Results.slice(-1));
		arrayOfPoints.push(tour5Points);
		return arrayOfPoints;
		
	}
	//fillRatingTable(playerExists);
	
	$(".test-main-body-images-controls-unit_next").click(function(){
		var imageWrapSlides=$(this).parents(".test-main-body-images").find(".test-main-body-images-wrap");
		imageWrapSlides.each(function(){
			if($(this).css("opacity")=="1"){
				$(this).slick("slickNext");
			}
		})
	})
	$(".test-main-body-images-controls-unit_prev").click(function(){
		var imageWrapSlides=$(this).parents(".test-main-body-images").find(".test-main-body-images-wrap");
		imageWrapSlides.each(function(){
			var notFirstSlide=$(this).hasClass("slick-active")&&$(this).css("left")!="0px";
			if($(this).css("opacity")=="1"){
				$(this).slick("slickPrev");
			}
		})
	})

	$(".test-main-body-footer-answers-unit").click(function(){
		var _this=$(this);
		var answer=_this.html();
		var questionIndex=_this.parents(".test-main-unit").index()-1;
		
		_this.parents(".test-main-body-footer").slick("slickNext");
		_this.parents(".test-main-body-unit").find(".test-main-body-images-body").slick("slickNext");
		_this.parents(".test-main-body-footer").find(".test-main-body-footer-results-info-title").html(answer);
		var progress=_this.parents(".test-main-segment").find(".test-content-progress");
		
		if( _this.hasClass("test-main-body-footer-answers-unit_correct")){
			_this.parents(".test-main-body-footer").find(".test-main-body-footer-results").addClass("test-main-body-footer-results_correct");
			progress.each(function(){
				$(this).find(".test-content-progress-unit").eq(questionIndex).addClass("test-content-progress-unit_correct");
			})
		} else{
			progress.each(function(){
				$(this).find(".test-content-progress-unit").eq(questionIndex).addClass("test-content-progress-unit_wrong");
			})
		}
		
	})
	var resultsArray=['','','','',''];
	$(".test-main-body-footer-results-button").click(function(){
		var _this=$(this);
		var questionIndex=_this.parents(".test-main-unit").index();
		var progress=_this.parents(".test-main-segment").find(".test-content-progress");
		var startedSegment=parseInt($(this).parents(".test-main-segment").attr("data-slick-index"));
		var currentSegment=startedSegment-1;
		var playerID=Cookies.get("playerID");
		var tourCorrectAnswers=$(this).parents(".test-main-unit").find(".test-content-progress-unit_correct").length;
		if(_this.parents(".test-main-unit").is(_this.parents(".test-main-segment").find(".test-main-unit").last())){
			resultsArray[currentSegment-1]=tourCorrectAnswers;
			_this.parents(".test-wrap").slick("slickNext");
			Cookies.set('playerStartedTour',startedSegment);
			Cookies.set('playerResults',resultsArray);
			var prevDescription;

			$.ajax(
	          {
	            url: "https://"+yourdomain+".freshdesk.com/api/v2/tickets/"+playerID,
	            type: 'GET',
	            contentType: false,
	            async:false,
	            headers: {
	              "Authorization": "Basic " + btoa(api_key + ":x")
	            },
	            success: function(data, textStatus, jqXHR) {
            		
            		prevDescription=data.description_text
            		postTourResult();
	            	
	            },
	            error: function(jqXHR, tranStatus) {
	            	

	            }
	          }
	        );
	        
	        function postTourResult(){
	        	var newDescription=prevDescription+"|tour№"+currentSegment+":"+tourCorrectAnswers+"|";
				$.ajax(
		          {
		            url: "https://"+yourdomain+".freshdesk.com/api/v2/tickets/"+playerID,
		            type: 'PUT',
		          	contentType: "application/json",
		          	async:false,
		            //dataType: "json",
		            //processData: false,
		            data:JSON.stringify({description: newDescription}),
		            headers: {
		              "Authorization": "Basic " + btoa(api_key + ":x")
		            },
		            success: function(data, textStatus, jqXHR) {
		         
		            },
		            error: function(jqXHR, tranStatus) {


		            }
		          }
		    	);
		    }
				    
			
	    	
	    	if(startedSegment>5){
	    		var prevTags;
	    		$.ajax(
		          {
		            url: "https://"+yourdomain+".freshdesk.com/api/v2/tickets/"+playerID,
		            type: 'GET',
		            contentType: false,
		            async:false,
		            headers: {
		              "Authorization": "Basic " + btoa(api_key + ":x")
		            },
		            success: function(data, textStatus, jqXHR) {
		            	prevTags=data.tags
		            	
		            },
		            error: function(jqXHR, tranStatus) {
		            	

		            }
		          }
		        );
		        prevTags.push("закончил онлайн игру");
		        $.ajax(
		          {
		            url: "https://"+yourdomain+".freshdesk.com/api/v2/tickets/"+playerID,
		            type: 'PUT',
		          	contentType: "application/json",
		          	async:false,
		            //dataType: "json",
		            //processData: false,
		            data:JSON.stringify({"tags":prevTags}),
		            headers: {
		              "Authorization": "Basic " + btoa(api_key + ":x")
		            },
		            success: function(data, textStatus, jqXHR) {
		         
		            },
		            error: function(jqXHR, tranStatus) {


		            }
		          }
		    	);
		    	fillRatingTable(playerExists);
	    	} else{
	    		fillSegment(startedSegment);
	    	}
	    	
	    	
	    	
	    	
		} else{
			_this.parents(".test-main-segment").slick("slickNext");
			progress.each(function(){
				$(this).find(".current").html(questionIndex+1);
			})
		}
		
		
	})
	
	$(document).on("click",".test-rating-table-numeration-unit",function() {
        var index=$(this).index();
		$(".test-rating-table-numeration-unit").removeClass("test-rating-table-numeration-unit_active");
		$(".test-rating-table-numeration").each(function(){
			$(this).find(".test-rating-table-numeration-unit").eq(index).addClass("test-rating-table-numeration-unit_active");
		})
		$(".test-rating-table-wrap").slick('slickGoTo', index ,false);
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
	var targetDate=new Date(2018, 9, 22, 10, 0, 0, 0);

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
	 		_this.find(".test-main-introUnit-navigation").after(image);
	 	})
	 }
});
$(window).on("load resize",function(){
	 var windowWidth=$(window).outerWidth(true);
	 
	 if(windowWidth<768){
	 	$(".test-main-introUnit-container").each(function(){
	 		var _this=$(this);
	 		var image=_this.find('.test-main-introUnit-image');
	 		_this.find(".test-main-introUnit-navigation").after(image);
	 	})
	 }
	 
	$('.slick-slider').slick('setPosition');
})

/* Optional triggers

$(window).load(function() {

});

$(window).resize(function() {

});

*/
