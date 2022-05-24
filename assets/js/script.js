//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


// function initialize() {
//     //call url to get music list: fetch
//     //build the cards with the data
//     fetch('https://band-backend-obmzk.ondigitalocean.app/music')
//         .then((response) => response.json()) //whatever the fetch, returns and I just want the body
//         .then((data) => {
//             for (let i = 0; i < data.length; i++) {
//                 buildCard(data[i]) //need to pass each data in the array one at a time
//             }
//         })
//         .catch((err) => console.log(err));
// }