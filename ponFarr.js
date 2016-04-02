var mate = {
	wantsChildren: true, // bool
	age: 27, // integer
	bodyType: 'slim', // string (slim/average/athletic/heavy)
	playsInstrument: false, // bool
}

var me = {
	inLove: false, // bool
	wantsChildren: true, // bool
	age: 35, // bool
	looksFor: {
		age: [25, 35], // array[min, max]
		bodyType: ['slim', 'average', 'athletic'], // array
	}
}

// If inLove is true, then nothing else matters.
if ( true === me.inLove ) {
	console.log( "You're in love. Doesn't matter what the score is..." );
}

// Get priorities according to my age
var priorities = criteriaWeight( me['age'] );
// The total sum of my priorities.
// Will be usefull later.
var prioritiesTotal = 0;
for ( var i in priorities ) {
	prioritiesTotal += priorities[ i ];
}

score = [];

// points for wantsChildren
if ( undefined === me['wantsChildren'] ) {
	score.push( priorities['wantsChildren'] );
} else {
	if ( me['wantsChildren'] === mate['wantsChildren'] ) {
		score.push( priorities['wantsChildren'] );
	} else {
		score.push( 0 - priorities['wantsChildren'] );
	}
}

// points for age
if ( undefined === me['looksFor']['age'] ) {
	score.push( priorities['age'] );
} else {
	if ( me['looksFor']['age'][0] <= mate['age'] || me['looksFor']['age'][1] >= mate['age'] ) {
		score.push( priorities['age'] );
	} else {
		if ( me['looksFor']['age'][0] > mate['age'] ) {
			if ( me['looksFor']['age'][0] - mate['age'] < 5 ) {
				score.push( priorities['age'] - ( me['looksFor']['age'][0] - mate['age'] ) );
			} else {
				score.push( 0 - priorities['age'] );
			}
		} else if ( me['looksFor']['age'][1] < mate['age'] ) {
			if ( mate['age'] - me['looksFor']['age'][1] < 5 ) {
				score.push( priorities['age'] - ( mate['age'] - me['looksFor']['age'][1] ) );
			} else {
				score.push( 0 - priorities['age'] );
			}
		} else {
			score.push( 0 - priorities['age'] );
		}
	}
}

if ( undefined === me['looksFor']['bodyType'] ) {
	score.push( priorities['bodyType'] );
} else {
	var bodyTypeMatches = false;
	for ( var i = 0; i < me['looksFor']['bodyType'].length; i++ ) {
		if ( me['looksFor']['bodyType'][ i ] == mate['bodyType'] ) {
    		bodyTypeMatches = true;
    	}
    }
    if ( true === bodyTypeMatches ) {
    	score.push( priorities['bodyType'] );
    } else {
    	score.push( 0 - priorities['bodyType'] );
    }
}

// priorities multiplier
var scoreTotal = 0;
for ( var i = 0; i < score.length; i++ ) {
	scoreTotal += score[ i ];
}

finalScore = 100 * scoreTotal / prioritiesTotal;

// Bonus points for musical instruments.
// No buts, trust me on this.
if ( mate['playsInstrument'] === true ) {
	finalScore += 10;
}
// Bonus points if you're in love.
if ( me['inLove'] === true ) {
	finalScore += 30;
}

if ( 0 > finalScore ) {
	finalScore = 0;
}
if ( 100 < finalScore ) {
	finalScore = 100;
}
console.log( "Total score: " + Math.round( finalScore ) );

// Returns the criteria weight depending on our age. (object)
function criteriaWeight( age ) {

	// criteria weight is on a scale on 0 to 10.
	var criteria = {
		wantsChildren: 5,
		age: 5,
		bodyType: 5,
	}

	// Am I younger than 20?
	// If yes, then I probably don't give a shit about a lot of things
	if ( 20 > age ) {
		return {
			wantsChildren: 0,
			age: 2,
			bodyType: 2,
		}
	}
	if ( 20 < age ) {
		criteria['wantsChildren'] = 2;
		criteria['age'] = 2;
		criteria['bodyType'] = 2;
	}
	if ( 25 < age ) {
		criteria['wantsChildren'] = 3;
		criteria['age'] = 4;
		criteria['bodyType'] = 7;
	}
	if ( 27 < age ) {
		criteria['wantsChildren'] = 5;
		criteria['age'] = 6;
		criteria['bodyType'] = 8;
	}
	if ( 30 < age ) {
		criteria['wantsChildren'] = 6;
		criteria['age'] = 5;
		criteria['bodyType'] = 6;
	}
	if ( 32 < age ) {
		criteria['wantsChildren'] = 9;
		criteria['bodyType'] = 4;
	}
	if ( 35 < age ) {
		criteria['wantsChildren'] = 8;
		criteria['age'] = 4;
		criteria['bodyType'] = 3;
	}
	if ( 37 < age ) {
		criteria['age'] = 5;
		criteria['bodyType'] = 5;
	}
	if ( 40 < age ) {
		criteria['wantsChildren'] = 9;
		criteria['age'] = 7;
		criteria['bodyType'] = 4;
	}
	if ( 45 < age ) {
		criteria['wantsChildren'] = 6;
		criteria['age'] = 5;
		criteria['bodyType'] = 3;
	}
	if ( 50 < age ) {
		criteria['wantsChildren'] = 1;
		criteria['age'] = 2;
		criteria['bodyType'] = 2;
	}

	return criteria;

}
