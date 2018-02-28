$(document).ready(function() {

	// time to answer a question
	const startingTime = 15;
	// time to wait after answering a question wrong
	const waitTime = 6;
	// number of queries before game ends
	const numOfQueries = 10;

	let remainingTime = $("#remainingTime").text("remaining time");
	let time = $("#time").text(startingTime);
	// int that holds actual time left value
	let timeLeft;

	// setInterval for decrement time every second
	let timeCounter;
	// setTimeout for running out of time answering
	let mainTimeout;

	// position of query in the 'queries' array
	let queryNum;

	let question = $("#question");
	let choices = $("#choices");

	// list of nums of previously used queries
	let queriesUsed = [];

	let right = 0;
	let wrong = 0;


	// constructor creates objects to hold info on the query
	function Query(num, question, choices, answer) {

		this.num = num;
		this.question = question;
		this.choices = choices;
		this.answer = answer;

	}

	let queries = [];

	// choose a random question, set queryNum, or if game is over -
	// will show end screen and create reset button
	function randomQuestion() {
		clearInterval(timeCounter);

		if (right + wrong < numOfQueries) {

			timeCounter = setInterval(function(){

				timeLeft--;
				time.text(timeLeft);

			}, 1000 * 1);

			mainTimeout = setTimeout(function(){

				wrong++;
				choices.empty();

				timeLeft = waitTime;
				time.text(timeLeft);
				setTimeout(randomQuestion, 1000 * timeLeft);

				question.text("You ran out of time!")

				getGIF();

			}, 1000 * startingTime)

			timeLeft = startingTime;

			do {
				randNum = Math.floor(Math.random() * queries.length);
			} while (queriesUsed.includes(randNum));

			question.text(queries[randNum].question);
			choices.empty()
			queries[randNum].choices.forEach(function(value, index) {
				choices.append("<li class='choice'>" + value + "</li>");
			});

			queryNum = queries[randNum].num;
			queriesUsed.push(queryNum);

			return queries[randNum];

		} else {

			question.text("You got " + right + " questions right, and " + wrong + " questions wrong");

			remainingTime.text("");
			time.html("<button id='resetButton'>reset</button>")
			choices.empty();
			getGIF();

		}

	}

	// CHOICES SHOULD BE EMPTY BEFORE CALLING
	// gets a random 'the office' GIF from the giphy api and -
	// appends the GIF to the choices list
	function getGIF() {

		apiURL = "https://api.giphy.com/v1/gifs/random?" +
			"api_key=oN5N5nfVB5JFrvXamobIf4S9TTbt6d3F&" +
			"tag=the+office&";

		$.get(apiURL).then(function(response) {

			choices
				.append("<iframe src='" + response.data.embed_url + "' " +
					"width='480' height='272' frameBorder='0' " +
					"class='giphy-embed' allowFullScreen></iframe>");

		})

	}

	// when you click the reset button on the end screen it resets
	$(".timeLeft").on("click", "#resetButton", function() {

		$("#remainingTime").text("remaining time");
		time.text(startingTime);
		timeLeft = startingTime;

		queriesUsed = [];

		right = 0;
		wrong = 0;

		randomQuestion();

	});

	// when you click a choice it checks to see it that choice
	// is right or not, and reacts accordingly
	$("ul").on("click", ".choice", function() {
		btn = $(this);
		clearInterval(mainTimeout);

		if (btn.text() === queries[queryNum].answer) {

			right++;
			timeLeft = startingTime;
			time.text(timeLeft);
			randomQuestion();

		} else {

			wrong++;
			choices.empty();

			timeLeft = waitTime;
			time.text(timeLeft);
			setTimeout(randomQuestion, 1000 * timeLeft);

			question.text("Incorrect! The right answer was '" + queries[queryNum].answer + "'");

			getGIF();

		}
	});


	// ADD A METRIC FUCK TON OF QUERIES
	queries.push(new Query(0,
		"(S1E1 'Pilot') What character starts their first day at Dunder Mifflin on the show's Pilot?", [
			"Erin",
			"Ryan",
			"Jim",
			"Michael"
		],

		"Ryan"));
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
			"Meredith"
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
			"Meredith"
		],

		"Michael"));
	queries.push(new Query(6,
		"(S2E19 'Michaels Birthday') Who has a cancer scare?", [
			"Michael",
			"Dwight",
			"Creed",
			"Kevin"
		],

		"Kevin"));
	queries.push(new Query(7,
		"(S2E22 'Casino Night') Who has two dates?", [
			"Toby",
			"Dwight",
			"Michael",
			"Pam"
		],

		"Michael"));
	queries.push(new Query(8,
		"(S2E1 'The Dundies') What Dundie award does Phyllis take home?", [
			"The Busiest Beaver Dundie",
			"Spicy Curry Dundie",
			"The Bushiest Beaver Dundie",
			"Hottest in the Office Dundie",
		],

		"The Bushiest Beaver Dundie"));
	queries.push(new Query(9,
		"(S5E9 'The Surplus') Who's gunning for new chairs?", [
			"Jim",
			"Pam",
			"Dwight",
			"Stanley",
		],

		"Pam"));
	queries.push(new Query(10,
		"(S4E13 'Job Fair') At whose former high school are Michael, Pam, Darryl, and Oscar visiting?", [
			"Michael",
			"Pam",
			"Darryl",
			"Oscar",
		],
		"Pam"));
	queries.push(new Query(11,
		"(S4E12 'Did I Stutter?') Who asks the episode title: 'Did I stutter'?", [
			"Mose",
			"Toby",
			"Meredith",
			"Stanley",
		],

		"Stanley"));
	queries.push(new Query(12,
		"(S5E1 'Weight Loss') Where does Jim propose to Pam?", [
			"A gas station",
			"In the parking lot",
			"A romantic resteraunt",
			"The Office!",
		],

		"A gas station"));
	queries.push(new Query(13,
		"(S5E2 'Business Ethics') What was the YouTube video Michael says he viewed about a thousand times?", [
			"Christian the Lion",
			"Talking Goat",
			"Cookie Monster sings Chocolate Rain",
			"Bill O'Riley's 'Do it Live'",
		],

		"Cookie Monster sings Chocolate Rain"));
	queries.push(new Query(14,
		"(S5E8 'Frame Toby') What does Michael buy from the warehouse guys thinking it's marijuana?", [
			"Oregano",
			"Sage",
			"Caprese salad",
			"Oregano",
		],

		"Caprese salad"));
	queries.push(new Query(15,
		"(S5E7 'Business Trip') Where is Michael's international business trip destination?", [
			"Toronto",
			"London",
			"Mexico City",
			"Winnipeg",
		],

		"Winnipeg"));
	queries.push(new Query(16,
		"(S5E6 'Customer Survey') What fake name does Jim use to rattle Dwight during their customer service training with Michael?", [
			"Mike Roin",
			"William M. Buttlicker",
			"Phillip McCrack",
			"Haywood Jablome",
		],

		"William M. Buttlicker"));
	queries.push(new Query(17,
		"(S5E16 'Blood Drive') What Office couple has a not-so-secret romp in a public restroom?", [
			"Phyllis and Bob",
			"Jim and Pam",
			"Ryan and Kelly",
			"Dwight and Angela",
		],

		"Phyllis and Bob"));
	queries.push(new Query(18,
		"(S5E19 'Two Weeks') What is Michael's signature cocktail?", [
			"Orange Vodjuiceka",
			"Scotch and Splenda",
			"Gin and Tonic",
			"Cosmopolitan",
		],

		"Scotch and Splenda"));
	queries.push(new Query(19,
		"(S5E22 'Heavy Competition') What does Dwight find out Michael wrote on the back of his Rolodex entry for 'Schrute, Dwight'?", [
			"Great salesman, even better friend",
			"Dog-like obedience to authority",
			"Assistant (to the) Regional Manager, Dunder Mifflin Scranton",
			"Tall. Beets.",
		],

		"Tall. Beets."));
	queries.push(new Query(20,
		"(S5E24 'Casual Friday') Who plays chess together in this episode?", [
			"Jim and Pam",
			"Pam and Kelly",
			"Michael and Dwight",
			"Jim and Creed",
		],

		"Jim and Creed"));


	// start the madness
	randomQuestion();
});


/*
queries.push(new Query(,
	"(SE '') ?", [
		"",
		"",
		"",
		"",
	],

	""));
*/
