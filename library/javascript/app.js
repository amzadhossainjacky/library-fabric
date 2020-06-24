
//require module
const readline = require('readline');
const query = require('./query.js');
const invoke = require('./invoke.js');

//Interface 
console.log(" ");
console.log("##########################################");
console.log("#                                        #");
console.log("#                                        #");
console.log("#                LIBRARY                 #");
console.log("#                                        #");
console.log("#                                        #");
console.log("##########################################");
console.log('\n');
console.log("Select any option & press enter");
console.log("press: '1' to view all books");
console.log("press: " +"'2 BookId'"+ " to search book" +"\n    Example: 2 BOOK1");
console.log("press: " +"'3 BookId title author publisher'"+ " to create new book" + "\n    Example: 3 BOOK23 Question Taposh Doel");
console.log("press: " +"'4 BookId AuthorName'"+ " to change author name" +"\n    Example: 2 BOOK12 Upal");

console.log(" ");
console.log('User Input: ');
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
});


//Transaction

rl.on('line',(userInput) => {
    console.clear();
    console.log(userInput);

    if(userInput.trim() == '1'){

        console.log("##########################################");
        console.log("#                                        #");
        console.log("#            VIEW ALL BOOKS              #");
        console.log("#                                        #");
        console.log("##########################################");

        //query
        query('viewAllBooks');

    }else{

    var inputArray = userInput.split(" "); 

        if(inputArray[0] == '2'){

            if(inputArray[1] != null){
               //console.log(inputArray[1]);
               invoke(inputArray);
            }
            else{
                console.log('write as: 2 BOOK1');
            }

        } 
        else if(inputArray[0] == '3'){

            if(inputArray[1] != null){
                invoke(inputArray);
             }
             else{
                 console.log('write as: 3 BOOK3 HTML-CSS John-Ducket USA-Rakha');
             }
        } 
        else if(inputArray[0] == '4'){

            if(inputArray[1] != null){
                invoke(inputArray);
             }
             else{
                 console.log('write as: 4 BOOK3 Upal');
             }
        } 
    }

});
