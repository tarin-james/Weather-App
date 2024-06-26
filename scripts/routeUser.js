function submitPlace(event) {
    // This function adds the latitude and longitude into the url of the weatherurl.html page
    event.preventDefault();
    const form = document.querySelector('#weather-form');
    const isValid = form.checkValidity();
    form.reportValidity();
    if(isValid) {
        const lat = document.querySelector('#lat').value;
        const lon = document.querySelector('#lon').value;
        window.location = `${window.location.origin}/weather.html?lat=${lat}&lon=${lon}`;
    }
}