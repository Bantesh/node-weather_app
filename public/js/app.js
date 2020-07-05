const weatherForm = document.querySelector('form');

const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = '';
messageTwo.textContent = '';
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageTwo.textContent = '';
    messageOne.textContent = 'Loading...';
    const location = searchElement.value;
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error;
                return
            }
            //console.log(data.location);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.temp;
            // console.log(data.temp);
        })
    })
})