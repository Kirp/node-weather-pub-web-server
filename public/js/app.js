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
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{        
            if(data.error){
                //console.log(data.error);
                messageOne.textContent = data.error;
            }else {
                //console.log(data);
                const dayNightMessage = data.is_day==='yes'?'Currently daytime.':'Currently nighttime.';
                messageOne.textContent = data.address+", "+data.country+". "+dayNightMessage;
                messageTwo.textContent = data.weather_description+", with a temperature of "+data.temperature+", it feels like "+data.feelslike +", and a humidity of "+data.humidity+".";
            }
        })
    })


})