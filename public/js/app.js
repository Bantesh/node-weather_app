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
    fetch('/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                return
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.temp;
        })
    })
})