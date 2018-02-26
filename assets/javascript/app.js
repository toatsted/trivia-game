$(document).ready(function(){

	function Query(question, choices, answer){
		this.question = question;
		this.choices = choices;
		this.answer = answer;
	}

	let queries = [];

	queries.push(new Query("(S1E1 'Pilot') What character starts their first day at Dunder Mifflin on the show's Pilot?",
					 ["Erin Hannon",
					  "Ryan Howard",
					  "Jim Halpert",
					  "Michael Scott"],

					  "Ryan Howard")
	);
	queries.push(new Query("(S2E2 'Sexual Harassment') What is Todd Packer's liscense plate?",
					 ["BGDADY",
					  "TODPKR",
					  "LUVMKR",
					  "WLHUNG"],
					  
					  "WLHUNG")
	);
	queries.push(new Query("(S2E13 'The Injury') What is Michael's injury?",
					 ["He gets his head stuck in a stair railing",
					  "He's run over by a co-worker",
					  "He crashes his car into a telephone pole",
					  "He burns his foot on a George Forman Grill"],
					  
					  "He burns his foot on a George Forman Grill")
	);
	queries.push(new Query("(S2E20 'Drug Testing') Who, in Dwight's mind, is a potential drug mule?",
					 ["Oscar",
					  "Creed",
					  "Jim",
					  "Merideth"],
					  
					  "Oscar")
	);
	queries.push(new Query("(S3E8 'The Merger') Who from Stamford quits on their first day in Scranton, only to be fired a minute later?",
					 ["Hannah",
					  "Andy",
					  "Tony",
					  "Karen"],
					  
					  "Tony")
	);
	queries.push(new Query("(S3E17 'Cocktails') Who gets stuck in a straight jacket?",
					 ["Michael",
					  "Dwight",
					  "Creed",
					  "Merideth"],
					  
					  "Michael")
	);
	/*queries.push(new Query("(S-E- '-') ?",
						 ["",
						  "",
						  "",
						  ""],
						  
						  "")
		)*/

	function randomQuestion(){
		let randNum = Math.floor(Math.random() * queries.length);
		$("#question").text(queries[randNum].question);
		$("#choices").empty()
		queries[randNum].choices.forEach(function(value, index){
			$("#choices").append("<li class='choice' id='" + index + "'>" + value + "</li>");
		});

		return randNum;
	}

	questionNums = [];
	questionNums.push(randomQuestion());

	$("ul").on("click", ".choice", function(){
		btn = $(this);
		if(btn.text() === queries[questionNums[questionNums.length-1]].answer){
			questionNums.push(randomQuestion());
		}
	});

});