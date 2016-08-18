// VARIABLES - Global - Word list
	// ==========================================================================
	var wins = 0;
	var losses = 0;
	//var iscontinue = true;+
	var audio_link = '<audio autoplay="autoplay">'+'<source src="http://www.noiseaddicts.com/samples_1w72b820/3724.mp3" type="audio/mpeg">'+'</audio loop>'
	
	var words = [
		{vocab:"Federalist", defi:"a member of a former political party in the United States that favored a strong centralized federal government", imsrc:"images/federalist.jpe"},
		{vocab:"abolitionist", defi:"a reformer who favors putting an end to slavery", imsrc:"images/abolitionist.jpe"},
		{vocab:"blockade", defi:"a war measure isolating an area of importance to the enemy", imsrc:"images/blockade.jpe"},
		{vocab:"agrarian", defi:"relating to rural matters", imsrc:"images/agrarian.jpe"},
		{vocab:"boycott", defi:"refusal to have commercial dealings with some organization", imsrc:"images/boycott.png"},
		{vocab:"caucus", defi:"meet to select a candidate or promote a policy", imsrc:"images/caucus.jpe"}
		];

	//finish game is called when the player quits are the list is over
	function finish_game(){
		document.write("   Total wins = "+ wins + "      Total losses = " + losses + " Good Bye ");

	}

	//original word

	var word = {
		chosen_word:"",
		defi1:"",
		arr_chosen_word:[],
		guess_letters:"",
		arr_guess_letters:[],
		build_word:"",
		arr_build_word:[],
		guesses_remain:6,
		iswinner:false,
		isgameover:false,

		assign_word: function(){

			//reset all variables
			this.chosen_word="";
			this.arr_chosen_word=[];
			this.guess_letters="";
			this.arr_guess_letters=[];
			this.build_word="";
			this.arr_build_word=[];
			this.guesses_remain=6;
			this.iswinner=false;
			//this.isgameover=false;
			this.defi1="";

			iscontinue = false;

			//randomly selecting a word from the array
			var ind = (words.length-1) * (Math.random());
			ind = Math.round(ind);
			//console.log(ind);
			this.chosen_word = words[ind].vocab;
			this.chosen_word = this.chosen_word.toUpperCase();
			console.log("Word selected by computer: "+ this.chosen_word);

			//make the array into word
			this.arr_chosen_word=this.chosen_word.split("");
			console.log("Array of the Word selected by computer: "+ this.arr_chosen_word);

			//displaying the hint at the bottom
			this.defi1 = words[ind].defi;
			console.log(this.defi1);
			//document.querySelector('#display_hint').innerHTML = defi1;

			//Assign the new word with "_"
			for(var i=0; i<this.chosen_word.length; i++){
				this.arr_build_word.push("_");
			}
			console.log("The new word "+ this.arr_build_word);
			this.build_word=this.arr_build_word.join("");
			console.log("The new word "+ this.build_word);

			//image on the side 
			var ch_image=document.getElementById("change_image");
			console.log(words[ind].imsrc);
			ch_image.src=words[ind].imsrc;
		

			//remove the word from the list
			words[ind]=words[words.length-1];
			words.pop();

			// var ch_image=document.getElementById("change_image");
			// console.log(words[ind].imsrc);
			// ch_image.src=words[ind].imsrc;
		
			//this.populate_html();
		},//closing the assign word function

		
		populate_html(){
			console.log("life over"+ this.isgameover);
			if (this.isgameover){

			isgameover=false;
			var end_box_div = document.querySelector('#end_continue_box');
			end_box_div.setAttribute("class","end_hidden_box");
			document.querySelector('#ask_to_cont').innerHTML="Guesses Remaining for this Game";
			}

			console.log("life over"+ this.isgameover);
			document.querySelector('#tries_remain').innerHTML = this.guesses_remain;
			document.querySelector('#display_word').innerHTML = this.build_word + audio_link;
			this.arr_guess_letters = this.guess_letters.split("");
			document.querySelector('#display_notword').innerHTML = this.arr_guess_letters;
			document.querySelector('#display_hint').innerHTML = "Hint:  " +  this.defi1;

			document.querySelector('#display_wins').innerHTML = wins;
			document.querySelector('#display_loss').innerHTML = losses;
		}, // PoPulate Html

		//ending each game
		end_game: function(){
			console.log(" inside end game Winner"+this.iswinner+"Number of words in list"+words.length);
			if(words.length <= 0){

					//to record the result of last game
					if(this.iswinner){
					wins++;
				}else{
					losses++;
				}
				document.write("Good bye !!!!! You have finished all the word in my list. Total Wins:   " + wins +"   Total loses:  " +losses+"    See you Soon!!");
			} else {
				if(this.iswinner){

					wins++;
					//console.log("no of wins"+wins);
					document.querySelector('#display_word').innerHTML = "Congratulation! You are right!! The word is  " + this.chosen_word;
				}else{
					losses++;
					//console.log("no of wins"+losses);	 
					document.querySelector('#display_word').innerHTML = "Better Luck next time. The word is  " + this.chosen_word;
				}

			}
			this.isgameover=true;
				//console.log("ha ha ha);		
		
		},


		//Called from the progam that calculates wrong guesses
		change_remaining_guess: function(){
			this.guesses_remain--;
			this.populate_html();
				console.log(this.guesses_remain);
			if(this.guesses_remain == 0){
				//jump out of the loop
				this.end_game();	
			}
		}, //closes chane_remaining guess function


		//creates a word with wrong function
		add_to_guess_letters: function(user_letter){

			var pos_notword = this.guess_letters.indexOf(user_letter);
				
			if (pos_notword < 0){
				console.log("Letter not in word");
					
					//create a list of wrong guesses  
				this.arr_guess_letters.push(user_letter);
				this.guess_letters= this.arr_guess_letters.join("");
					//document.querySelector('#display_notword').innerHTML = this.guess_letters;
				this.populate_html();

					//Calling function to countdown tries
				this.change_remaining_guess();
			}

		}, //closing add to guess function

		//making the new word
		add_to_building_word: function(user_letter){
			for (var i = 0; i < this.chosen_word.length; i++) {
				
				if (this.chosen_word.charAt(i) == user_letter){
					this.arr_build_word[i] = user_letter;	
				}
			}
				this.build_word=this.arr_build_word.join("");

				this.populate_html();
				//console.log(this.build_word);
			
				//checking to see if the word is finished
				if(this.build_word == this.chosen_word){

					//alert("hello");
					this.iswinner = true;
					console.log("Winner"+this.iswinner);
					this.end_game();
				} 
			 
		}
 
	} //closing the word object

	
	function play_game() {

		word.assign_word();
		word.populate_html();
		//waiting for key 
		document.onkeyup = function(event){

		//sign the key stroke to a var
		user_letter = String.fromCharCode(event.keyCode).toUpperCase();

		//assign the locatiion on the letter to a var
		var pos = word.chosen_word.indexOf(user_letter);
			
		// check the the letter is in variable
		if (pos < 0){

			word.add_to_guess_letters(user_letter);

		} else {

			word.add_to_building_word(user_letter);
		}

		if (word.isgameover){
			var end_box_div = document.querySelector('#end_continue_box');
			end_box_div.setAttribute("class","end_show_box");
			end_box_div.innerHTML='<input class="btn btn-success" type="button" value="Yes" onClick="play_game()">'+'&nbsp'+ 
									'<input class="btn btn-danger" type="button" value="No" onClick="finish_game()">'+ audio_link;

				document.querySelector('#ask_to_cont').innerHTML = "Do you want to continue?";
		}
		
	}
}

	play_game();

