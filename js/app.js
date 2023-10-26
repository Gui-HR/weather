const form = document.querySelector('[data-js="change-location"]')
const imgTime = document.querySelector('[data-js="time"]')
const weatherCard = document.querySelector('[data-js="weather-card"]')
const cardCityName = document.querySelector('[data-js="city-name"]')
const cardTemperature = document.querySelector('[data-js="card-temperature"]')
const timeIcon = document.querySelector('[data-js="time-icon"]')
const cardWeatherText = document.querySelector('[data-js="weather-text"]')

const getCityNameToLocationStorage = () => {
    if(localStorage.getItem('city')) {
        const cityName = localStorage.getItem('city')
        getAndInsertCityInfo(cityName)
    }
}

const showWeatherCard = () => {
    if(weatherCard.classList.contains('d-none')) {
        weatherCard.classList.remove('d-none')
    }
}

const getAndInsertCityInfo = async inputcityName => {
    const cityUrl = getCityUrl(inputcityName)
    const [ {Key: cityKey, LocalizedName: cityName} ] = await fetchData(cityUrl)
    const weatherUrl = getWeatherUrl(cityKey)
    const [ {WeatherText, IsDayTime, Temperature, WeatherIcon} ] = await fetchData(weatherUrl)
    const cityTemperature = Temperature.Metric.Value

    localStorage.setItem('city', cityName)

    imgTime.src = IsDayTime ? './src/day.svg' : './src/night.svg'
    cardCityName.textContent = cityName
    cardTemperature.textContent = cityTemperature
    cardWeatherText.textContent = WeatherText
    timeIcon.innerHTML = `<img src="./src/icons/${WeatherIcon}.svg">`

    showWeatherCard()
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.city.value

    getAndInsertCityInfo(inputValue)
    event.target.reset()
})

getCityNameToLocationStorage()