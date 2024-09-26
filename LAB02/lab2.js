const prompt=require('prompt');

prompt.start();
console.log('Welcome to Rock-Paper-Scissors game!');
console.log('Please enter your choice Rock, Paper or Scissors (at least first letter, case does not matter)');
prompt.get(['user_input'], function(err, result){
    const userSelection=result.user_input.charAt(0).toLowerCase();
    const computerSelection=computerChoice();
    if (err){
        console.log(err);
    }
    if(userSelection==='r'
    || userSelection==='p'
    || userSelection==='s'){
        console.log('Your selected: '+result.user_input);
        console.log("Computer selected: "+computerSelection);
        const res=gameLogic(userSelection, computerSelection.charAt(0).toLowerCase());
        console.log("Result: "+res);
    }
    else{
        console.log('Please enter correct value next time!');
    }
});

function computerChoice(){
    const generated=Math.random();
    if (generated>=0.68){
        return 'ROCK';
    }
    else if (generated>=0.35){
        return 'SCISSORS';
    }
    else{
        return 'PAPER';
    }
}

function gameLogic(user, computer){
    if (user===computer){
        return "It's a tie";
    }
    else if ((user==='r' && computer==='s')
    || (user==='s' && computer==='p')
    || (user==='p' && computer==='r')){
        return 'User Wins';
    }
    else{
        return 'Computer Wins';
    }
}
