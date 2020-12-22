class Die {
	constructor() {
		this.side = 0;
		this.numSides = 1;
		this.succ = 0;
		this.adv = 0;
		this.triumph = 0;
		this.fail = 0;
		this.threat = 0;
		this.despair = 0;
		
		this.light_side_points = 0;
		this.dark_side_points = 0;
		
		this.image_url = '';
	}
	
	roll() {
		this.side = Math.floor(Math.random() * this.numSides);
		this.getResult();
	}
}

class DicePool extends Die {
	constructor(ability, proficiency, boost, difficulty, challenge, setback, force) {
		super();
		this.dice = [];
		this.image_urls = [];
		for (var i = 0; i < ability; i++) {
			this.dice.push(new AbilityDie());
		}
		for (var i = 0; i < proficiency; i++) {
			this.dice.push(new ProficiencyDie());
		}
		for (var i = 0; i < boost; i++) {
			this.dice.push(new BoostDie());
		}
		for (var i = 0; i < difficulty; i++) {
			this.dice.push(new DifficultyDie());
		}
		for (var i = 0; i < challenge; i++) {
			this.dice.push(new ChallengeDie());
		}
		for (var i = 0; i < setback; i++) {
			this.dice.push(new SetbackDie());
		}
		for (let i = 0; i < force; i++) {
			this.dice.push(new ForceDie());
		}
		
		this.succ = 0;
		this.adv = 0;
		this.triumph = 0;
		this.fail = 0;
		this.threat = 0;
		this.despair = 0;
		this.light_side_points = 0;
		this.dark_side_points = 0;
		this.image_url = '';
	}
	
	roll() {
		var succs = 0;
		var advs = 0;
		var triumphs = 0;
		var fails = 0;
		var threats = 0;
		var despairs = 0;	
		let light_side_points = 0;
		let dark_side_points = 0;
		for (var i = 0; i < this.dice.length; i++) {
			this.dice[i].roll();
			succs = succs + this.dice[i].succ;
			advs = advs + this.dice[i].adv;
			triumphs = triumphs + this.dice[i].triumph;				
			fails = fails + this.dice[i].fail;
			threats = threats + this.dice[i].threat;
			despairs = despairs + this.dice[i].despair;
			light_side_points = light_side_points + this.dice[i].light_side_points;
			dark_side_points = dark_side_points + this.dice[i].dark_side_points;
			this.image_urls.push(this.dice[i].image_url);
		}
		this.succ = Math.max(0, succs - fails);
		this.fail = Math.max(0, fails - succs);
		this.adv = Math.max(0, advs - threats);
		this.threat = Math.max(0, threats - advs);
		this.triumph = triumphs;
		this.despair = despairs;
		this.light_side_points = light_side_points;
		this.dark_side_points = dark_side_points;
	}
}

class PositiveDie extends Die {

	newPositiveResult(succ, adv, triumph, image_url) {
		this.succ = succ;
		this.adv = adv;
		this.triumph = triumph;
		this.image_url = image_url;
	}

}

class NegativeDie extends Die {

	newNegativeResult(fail, threat, despair, image_url) {
		this.fail = fail;
		this.threat = threat;
		this.despair = despair;
		this.image_url = image_url;
	}

}

class AbilityDie extends PositiveDie {
	constructor() {
		super();
		this.numSides = 8;
	}
	
	getResult() {
		switch(this.side) {
			case 0:
				this.newPositiveResult(0, 0, 0, "./dice_images/green-.png");
				break;
			case 1:
				this.newPositiveResult(1, 0, 0, "./dice_images/green-s.png");
				break;
			case 2:
				this.newPositiveResult(1, 0, 0, "./dice_images/green-s.png");
				break;
			case 3:
				this.newPositiveResult(2, 0, 0, "./dice_images/green-ss.png");
				break;
			case 4:
				this.newPositiveResult(0, 1, 0, "./dice_images/green-a.png");
				break;
			case 5:
				this.newPositiveResult(0, 1, 0, "./dice_images/green-a.png");
				break;
			case 6:
				this.newPositiveResult(1, 1, 0, "./dice_images/green-sa.png");
				break;
			case 7:
				this.newPositiveResult(0, 2, 0, "./dice_images/green-aa.png");
				break;
		  default:
			// code block
			return "oops";
		}
	}
}

class ProficiencyDie extends PositiveDie {
	constructor() {
		super();
		this.numSides = 12;
	}
	
	getResult() {
		switch(this.side) {
			case 0:
				this.newPositiveResult(0, 0, 0, "./dice_images/yellow-.png");
				break;
			case 1:
				this.newPositiveResult(1, 0, 0, "./dice_images/yellow-s.png");
				break;
			case 2:
				this.newPositiveResult(1, 0, 0, "./dice_images/yellow-s.png");
				break;
			case 3:
				this.newPositiveResult(2, 0, 0, "./dice_images/yellow-ss.png");
				break;
			case 4:
				this.newPositiveResult(2, 0, 0, "./dice_images/yellow-ss.png");
				break;
			case 5:
				this.newPositiveResult(0, 1, 0, "./dice_images/yellow-a.png");
				break;
			case 6:
				this.newPositiveResult(1, 1, 0, "./dice_images/yellow-sa.png");
				break;
			case 7:
				this.newPositiveResult(1, 1, 0, "./dice_images/yellow-sa.png");
				break;
			case 8:
				this.newPositiveResult(1, 1, 0, "./dice_images/yellow-sa.png");
				break;
			case 9:
				this.newPositiveResult(0, 2, 0, "./dice_images/yellow-aa.png");
				break;
			case 10:
				this.newPositiveResult(0, 2, 0, "./dice_images/yellow-aa.png");
				break;
			case 11:
				this.newPositiveResult(1, 0, 1, "./dice_images/yellow-r.png");
				break;
			default:
				// code block
				return "oops";
		}
	}
}

class BoostDie extends PositiveDie {
	constructor() {
		super();
		this.numSides = 6;
	}
	
	getResult() {
		switch(this.side) {
			case 0:
				this.newPositiveResult(0, 0, 0, "./dice_images/blue-.png");
				break;
			case 1:
				this.newPositiveResult(0, 0, 0, "./dice_images/blue-.png");
				break;
			case 2:
				this.newPositiveResult(1, 0, 0, "./dice_images/blue-s.png");
				break;
			case 3:
				this.newPositiveResult(1, 1, 0, "./dice_images/blue-sa.png");
				break;
			case 4:
				this.newPositiveResult(0, 2, 0, "./dice_images/blue-aa.png");
				break;
			case 5:
				this.newPositiveResult(0, 1, 0, "./dice_images/blue-a.png");
				break;
		  default:
			// code block
			return "oops";
		}
	}
}

class DifficultyDie extends NegativeDie {
	constructor() {
		super();
		this.numSides = 8;
	}
	
	getResult() {
		switch(this.side) {
			case 0:
				this.newNegativeResult(0, 0, 0, "./dice_images/purple-.png");
				break;
			case 1:
				this.newNegativeResult(1, 0, 0, "./dice_images/purple-f.png");
				break;
			case 2:
				this.newNegativeResult(2, 0, 0, "./dice_images/purple-ff.png");
				break;
			case 3:
				this.newNegativeResult(0, 1, 0, "./dice_images/purple-t.png");
				break;
			case 4:
				this.newNegativeResult(0, 1, 0, "./dice_images/purple-t.png");
				break;
			case 5:
				this.newNegativeResult(0, 1, 0, "./dice_images/purple-t.png");
				break;
			case 6:
				this.newNegativeResult(0, 2, 0, "./dice_images/purple-tt.png");
				break;
			case 7:
				this.newNegativeResult(1, 1, 0, "./dice_images/purple-ft.png");
				break;
		  default:
			// code block
			return "oops";
		}
	}
}

class ChallengeDie extends NegativeDie {
	constructor() {
		super();
		this.numSides = 12;
	}
	
	getResult() {
		switch(this.side) {
			case 0:
				this.newNegativeResult(0, 0, 0, "./dice_images/red-.png");
				break;
			case 1:
				this.newNegativeResult(1, 0, 0, "./dice_images/red-f.png");
				break;
			case 2:
				this.newNegativeResult(1, 0, 0, "./dice_images/red-f.png");
				break;
			case 3:
				this.newNegativeResult(2, 0, 0, "./dice_images/red-ff.png");
				break;
			case 4:
				this.newNegativeResult(2, 0, 0, "./dice_images/red-ff.png");
				break;
			case 5:
				this.newNegativeResult(0, 1, 0, "./dice_images/red-t.png");
				break;
			case 6:
				this.newNegativeResult(0, 1, 0, "./dice_images/red-t.png");
				break;
			case 7:
				this.newNegativeResult(1, 1, 0, "./dice_images/red-ft.png");
				break;
			case 8:
				this.newNegativeResult(1, 1, 0, "./dice_images/red-ft.png");
				break;
			case 9:
				this.newNegativeResult(0, 2, 0, "./dice_images/red-tt.png");
				break;
			case 10:
				this.newNegativeResult(0, 2, 0, "./dice_images/red-tt.png");
				break;
			case 11:
				this.newNegativeResult(1, 0, 1, "./dice_images/red-d.png");
				break;
		  default:
			// code block
			return "oops";
		}
	}
}

class SetbackDie extends NegativeDie {
	constructor() {
		super();
		this.numSides = 6;
	}
	
	getResult() {
		switch(this.side) {
			case 0:
				this.newNegativeResult(0, 0, 0, "./dice_images/black-.png");
				break;
			case 1:
				this.newNegativeResult(0, 0, 0, "./dice_images/black-.png");
				break;
			case 2:
				this.newNegativeResult(1, 0, 0, "./dice_images/black-f.png");
				break;
			case 3:
				this.newNegativeResult(1, 0, 0, "./dice_images/black-f.png");
				break;
			case 4:
				this.newNegativeResult(0, 1, 0, "./dice_images/black-t.png");
				break;
			case 5:
				this.newNegativeResult(0, 1, 0, "./dice_images/black-t.png");
				break;
		  default:
			// code block
			return "oops";
		}
	}
}

class ForceDie extends Die {
	constructor() {
		super();
		this.numSides = 12;
	}
		
	getResult() {
		switch(this.side) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				this.newForceResult(0, 1, "./dice_images/white-n.png");
				break;
			case 6:
				this.newForceResult(0, 2, "./dice_images/white-nn.png");
				break;
			case 7:
			case 8:			
				this.newForceResult(1, 0, "./dice_images/white-l.png");
				break;
			case 9:
			case 10:
			case 11:
				this.newForceResult(2, 0, "./dice_images/white-ll.png");
				break;
		  default:
			// code block
			return "oops";
		}
	}
		
	newForceResult(light_side_points, dark_side_points, image_url) {
		this.light_side_points = light_side_points;
		this.dark_side_points = dark_side_points;
		this.image_url = image_url;
	}
}