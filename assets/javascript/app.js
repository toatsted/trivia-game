$(document).ready(function() {
	const startingTime = 20;

	let time = $("#time").text(startingTime);
	let timeLeft = startingTime;
	let timeCounter = setInterval(decrementTime, 1000 * 1);

	let queryNum;
	let question = $("#question");
	let choices = $("#choices");

	function Query(num, question, choices, answer) {

		this.num = num;
		this.question = question;
		this.choices = choices;
		this.answer = answer;

	}

	let queries = [];

	function randomQuestion() {

		let randNum = Math.floor(Math.random() * queries.length);
		question.text(queries[randNum].question);
		choices.empty()
		queries[randNum].choices.forEach(function(value, index) {
			choices.append("<li class='choice' id='" + index + "'>" + value + "</li>");
		});

		return queries[randNum];

	}

	function decrementTime() {

		timeLeft--;
		time.text(timeLeft);

	}

	queries.push(new Query(0,
		"(S1E1 'Pilot') What character starts their first day at Dunder Mifflin on the show's Pilot?", [
			"Erin Hannon",
			"Ryan Howard",
			"Jim Halpert",
			"Michael Scott"
		],

		"Ryan Howard"));
	queries.push(new Query(1,
		"(S2E2 'Sexual Harassment') What is Todd Packer's liscense plate?", [
			"BGDADY",
			"TODPKR",
			"LUVMKR",
			"WLHUNG"
		],

		"WLHUNG"));
	queries.push(new Query(2,
		"(S2E13 'The Injury') What is Michael's injury?", [
			"He gets his head stuck in a stair railing",
			"He's run over by a co-worker",
			"He crashes his car into a telephone pole",
			"He burns his foot on a George Forman Grill"
		],

		"He burns his foot on a George Forman Grill"));
	queries.push(new Query(3,
		"(S2E20 'Drug Testing') Who, in Dwight's mind, is a potential drug mule?", [
			"Oscar",
			"Creed",
			"Jim",
			"Merideth"
		],

		"Oscar"));
	queries.push(new Query(4,
		"(S3E8 'The Merger') Who from Stamford quits on their first day in Scranton, only to be fired a minute later?", [
			"Hannah",
			"Andy",
			"Tony",
			"Karen"
		],

		"Tony"));
	queries.push(new Query(5,
		"(S3E17 'Cocktails') Who gets stuck in a straight jacket?", [
			"Michael",
			"Dwight",
			"Creed",
			"Merideth"
		],

		"Michael"));

	queryNum = randomQuestion().num;
	$("ul").on("click", ".choice", function() {
		btn = $(this);

		if (btn.text() === queries[queryNum].answer) {

			timeLeft = startingTime;
			time.text(timeLeft);
			queryNum = randomQuestion().num;

		} else {

			timeLeft = 5;
			time.text(timeLeft);
			question.text("Incorrect! The right answer was '" + queries[queryNum].answer + "'");

			apiURL = "http://api.giphy.com/v1/gifs/random?" +
					 "api_key=oN5N5nfVB5JFrvXamobIf4S9TTbt6d3F&" +
					 "tag=the+office&" +
					 "limit=1";

			$.get(apiURL).then(function(response){

				choices.empty()
					.append("<iframe src=" + response.data.embed_url + " frameborder='0'></iframe>");

			})

		}
	});

});