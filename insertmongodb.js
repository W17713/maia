const insmongodb = require('aggregate');
var data = [
    { user: 'John', text: 'Highway 71'},
    { user: 'Peter', text: 'Lowstreet 4'},
    { user: 'Amy', text: 'Apple st 652'},
];
//insmongodb.connectDB();
insmongodb.put(data);