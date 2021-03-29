// Append to the json file
const fs = require('fs');


// data from the file
var data = fs.readFileSync('test_array.json');
data = JSON.parse(data);
const first_element = data[0]
// getting the first element or latest element.
var title = first_element['name'];

var newFetchData = [
    {name:"long",value:"Boo",date:"2021-03-29T16:09:52.595Z"},
    {name:"keu",value:"Boo",date:"2021-03-29T16:09:52.595Z"},
    {name:"mid",value:"Key",date:"2021-03-29T16:09:52.595Z"},
    {name:"short",value:"Booi",date:"2021-03-29T16:09:52.595Z"},
    {name:"deepak",value:"Nothing",date:"2021-03-29T16:09:52.595Z"},
    {name:"lucas",value:"something",date:"2021-03-29T16:09:52.595Z"}
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



const final_data = newData.concat(data)
console.log(final_data);

