
class Target {
	constructor(target_type) {
		this.target_type = target_type;
	}
}

class Character extends Target {
	constructor(name) {
		super('character');
		this.char_type = 'PlayerCharacter';
	
		this.name = name;
		this.wounds  = 0;
		this.wound_threshold = 12;
		this.strain = 0;
		this.strain_threshold = 12;
		this.soak = 2;
		this.def_ranged = 0;
		this.def_melee = 0;
		
		this.silhouette = 1;
		
		this.char_values = {};
		this.skill_values = {};
		
		this.talents = {};
		
		this.force_rating = 0;
		this.force_powers = {};
		this.lightside_user = true;
		this.morality = 50;
		this.conflict = 0;
		
		this.species = '';
		
		this.weapons = [];
		this.armor = null;
		
		this.left_fist = null;
		
		this.criticals = [];
		this.blinded = false;
		
		this.stim_packs_used = 0;
		this.healed_this_encounter = false;
		
		this.ally_or_enemy = 'ally';
		this.initiative_type = 'none';
		this.initiative_roll = new DicePool(0, 0, 0, 0, 0, 0, 0);
		
		this.vehicle = '';
		
		this.prone = false;
		this.cover_bonus = 0;
		
		this.aims = 0;
		// Defensive Stance Talent
		this.defensive_stance = 0;
		
		this.temp_boosts = 0;
		this.temp_setbacks = 0;
		this.temp_upgrades = 0;
		this.temp_diff_increase = 0;
		this.temp_diff_upgrades = 0;
		
		this.turn_taken = false;
	}
}

class Minion extends Character {
		constructor(name) {
			super(name);
			this.char_type = 'Minion';
			
			this.group_skills = {};
			
			this.num_in_group = 1;
		}
}

class Rival extends Character {
		constructor(name) {
			super(name);
			this.char_type = 'Rival';
		}
}

function getNodeValIfExists(xmlData, node_name) {
	let matching_nodes = xmlData.getElementsByTagName(node_name);
	if (matching_nodes.length > 0) {
		return matching_nodes[0].childNodes[0].nodeValue;
	}
	return '';
}

function sumAttrNodeValues(xmlNode) {
	var node_children = xmlNode.childNodes;
	var sum = 0;
	for (var i = 0; i < node_children.length; i++) {
		if(node_children[i].nodeType !== Node.TEXT_NODE) {
			var value = parseInt(node_children[i].childNodes[0].nodeValue);
			if (isNaN(value) != true) {
				sum += value;
			}
		}
	}
	return sum;
}

function sumAttrNodesIgnoring(xmlNode, tagsToIgnore) {
	for (var i = 0; i < tagsToIgnore.length; i++) {
		var nodes_for_tag = xmlNode.getElementsByTagName(tagsToIgnore[i]);
		if (nodes_for_tag.length > 0) {
			nodes_for_tag[0].parentNode.removeChild(nodes_for_tag[0]);
		}
	}
	return sumAttrNodeValues(xmlNode);
}

// Finds and Sets Wound Threshold, Strain Threshold, Soak, and Melee & Ranged Defense
function setBasicCharAttributes(xmlData, character) {
	// Wounds Threshold, Strain Threshold, Soak
	var wt_node = xmlData.getElementsByTagName("WoundThreshold")[0];
	var wt = sumAttrNodeValues(wt_node);
	var st_node = xmlData.getElementsByTagName("StrainThreshold")[0];
	var st = sumAttrNodeValues(st_node);
	var soak_node = xmlData.getElementsByTagName("SoakValue")[0];
	var soak = sumAttrNodeValues(soak_node);
	
	// Defense
	var def_ranged_node = xmlData.getElementsByTagName("DefenseRanged")[0];
	var def_ranged = sumAttrNodeValues(def_ranged_node);
	var def_melee_node = xmlData.getElementsByTagName("DefenseMelee")[0];
	var def_melee = sumAttrNodeValues(def_melee_node);
	
	character.wound_threshold = wt;
	character.strain_threshold = st;
	character.soak = soak;
	character.def_ranged = def_ranged;
	character.def_melee = def_melee;
}

// Finds and Sets Characteristic Values
function setCharCharacteristics(xmlData, character) {
	var char_nodes = xmlData.getElementsByTagName("CharCharacteristic");
	var char_values = {};
	for (var i = 0; i < char_nodes.length; i++) {
		var key = char_nodes[i].getElementsByTagName("Key")[0].childNodes[0].nodeValue;
		var rank_node = char_nodes[i].getElementsByTagName("Rank")[0];
		// TODO: Do not count the 'Non-Career Ranks' node. See Zang for example.
		var ranks = sumAttrNodeValues(rank_node);
		char_values[key] = ranks;
	}
	character.char_values = char_values;
}

function setCharSkills(xmlData, character, skill_info) {
	// Skill Values
	var skill_values = {};
	for (let k in skill_info) {
		skill_values[k] = 0;
	}
	var skill_nodes = xmlData.getElementsByTagName("CharSkill");
	for (var i = 0; i < skill_nodes.length; i++) {
		var key = skill_nodes[i].getElementsByTagName("Key")[0].childNodes[0].nodeValue;
		let ranks = true;
		if (character.char_type != 'Minion') {
			let rank_node = skill_nodes[i].getElementsByTagName("Rank")[0];
			ranks = sumAttrNodesIgnoring(rank_node, ["NonCareerRanks"]);
		}
		skill_values[key] = ranks;
	}
	if (character.char_type === 'Minion') {
		character.group_skills = skill_values;
	} else {
		character.skill_values = skill_values;
	}
	
}