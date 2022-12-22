const weatherForm = document.querySelector('form');
const search = document.querySelector('form input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{        
            if(data.error){
                //console.log(data.error);
                messageOne.textContent = data.error;
            }else {
                //console.log(data);
                messageOne.textContent = data.address+", "+data.country;
                messageTwo.textContent = data.weather_description+", with a temperature of "+data.temperature+" and feels like "+data.feelslike;
            }
        })
    })


})