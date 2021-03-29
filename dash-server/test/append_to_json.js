// Append to the json file
const fs = require('fs');


var data = fs.readFileSync('test_array.json');
data = JSON.parse(data);
// data = data.reverse();
// console.log(data);
const first_element = data.shift()
var title = first_element['name'];
console.log(title);

var newData = [
    {name:"deepak",value:"Nothing"},
    {name:"lucas",value:"something"}
]
const new_first_element = newData.shift()
var newTitle = new_first_element['name']
console.log(newTitle);



// get the last element of the data
// console.log(data[data.length - 1])

// var fruits = ["banana","mango","orange"]
// var n = fruits.includes("mango");
// console.log(n);

var h = newData.includes(first_element)