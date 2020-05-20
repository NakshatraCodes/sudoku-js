
$('#clear').on('click', function(){
	$('input:text').each(function(index, item){
		$(this).val('');
		$(this).removeClass('given solved');
	})
})

$('#darkMode').on('click', function(){
	$('td').css('border', '3px solid #121212');
	$('body').css('background-color', '#121212');
	$('h1').css('color', 'white');
	$('#darkMode').fadeOut(function(){
		$('#lightMode').fadeIn();
	});
})

$('#lightMode').on('click', function(){
	$('td').css('border', '3px solid white');
	$('body').css('background-color', 'white');
	$('h1').css('color', 'black');
	$('#lightMode').fadeOut(function(){
		$('#darkMode').fadeIn();
	});
})

$('input:text').focusout(function() {
    var num = $(this).val();
    if (num > 9) {
      $(this).val("9");
      alert("Maximum is 9");
    }
 });

$('input:text').on('keyup keypress', function() {
  if($(this).val().length >= 0) {
    $(this).addClass('given');
  }
});

$('input:text').on('keyup', function() {
  if($(this).val().length == 0) {
    $(this).removeClass('given');
  }
})

var arr = [];
var newArr = [];

$('#solve').on('click', function(){

	$('input:text').each(function(){
		if(this.value > 0 && this.value <= 9){
			arr.push(parseInt(this.value));
		}
		else {
			arr.push(0);
		}
	})
	var counter = 1;
	var subArr = [];
	arr.forEach((item, index)=>{
		subArr.push(item);
		if(subArr.length === 9){
			newArr.push(subArr);
			subArr = [];
		}
	})

	console.log(newArr);
	solve(newArr);

	var time = 30;

	$('input:text').each(function(i, item){

		setTimeout(function(selector){
			if(!selector.hasClass('given')){
				selector.addClass('solved').val(linearArray[i]);
			}
		}, time, $(this))
		time+=30;
	})
})



// ************************************************************************************************************
// Algo Stuff -------------------------------------------------------------------------------------------------
// ************************************************************************************************************

var linearArray=[];

function convertToLinear(puzzle){
	puzzle.forEach(row=>{
		row.forEach(element=>{
			linearArray.push(element);
			// console.log(linearArray);
		})
	})
}


function findEmpty(puzzle){
	for(let i=0; i<puzzle.length; i++){
		for(let j=0; j<puzzle[i].length; j++){
			if(puzzle[i][j] === 0){
				var position = {
					row: i,
					col: j
				}
				return position;
			}
		}
	}
	return 1;
}


function findValid(puzzle, number, position){

	// Check Rows
	for(let i=0; i<puzzle[0].length; i++)
	{
		if(puzzle[position.row][i] === number && position.col != i){
			return false;
		}
	}

	// Check Columns
	for(let i=0; i<puzzle.length; i++){
		if(puzzle[i][position.col] === number && position.row != i){
			return false;
		}
	}


	// Check Square Grid
	let boxX = Math.floor(position.row/3);
	let boxY = Math.floor(position.col/3);

	for(let i=boxX*3; i<((boxX*3)+3); i++){
		for(let j=boxY*3; j<((boxY*3)+3); j++){
			if(puzzle[i][j] === number && !samePosition(i, j, position)){
				return false;
			}
		}
	}
	return true;
}

function samePosition(i, j, position){
	if(i === position.row && j === position.col){
		return true;
	}else{
		return false;
	}
}


function solve(puzzle){

	if(findEmpty(puzzle) !== 1){
		var position = findEmpty(puzzle);
	} else {
		// console.log(puzzle);
		convertToLinear(puzzle);
		console.log('Done');
		return true;
	}

	for(let i=1; i<=9; i++){
		if(findValid(puzzle, i, position)){
			puzzle[position.row][position.col] = i;

			if(solve(puzzle)){
				return true;
			}

			puzzle[position.row][position.col] = 0;
		}
	}

	return false;
}
