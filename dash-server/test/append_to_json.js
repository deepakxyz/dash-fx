// Append to the json file
const fs = require('fs');


// data from the file
var data = fs.readFileSync('test_array.json');
data = JSON.parse(data);
const first_element = data[0]
// getting the first element or latest element.
var title = first_element['name'];

var newFetchData = [
    {name:"long",value:"Boo"},
    {name:"keu",value:"Boo"},
    {name:"mid",value:"Key"},
    {name:"short",value:"Booi"},
    {name:"deepak",value:"Nothing"},
    {name:"lucas",value:"something"}
]

// newFetchData = newFetchData.reverse()
var  newData = []
let i = 0;
for (i; i < newFetchData.length; i++ ){
    var eachName = newFetchData[i]['name'];
    if (eachName === title){
        // i = i + 1;
        break;
    }else{
        newData[i] = newFetchData[i];
    }
}



// console.log(i)
// console.log(newFetchData.splice(i))
// console.log(newData);

// console.log(newData);
// console.log(data);
const final_data = newData.concat(data)
console.log(final_data);



// get the last element of the data
// console.log(data[data.length - 1])

// var fruits = ["banana","mango","orange"]
// var n = fruits.includes("mango");
// console.log(n);

var h = newFetchData.includes(first_element)