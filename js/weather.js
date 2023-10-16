const apiKey = '1o99xpMQvlPfknrGJeXUqAF2r8AORk5x'
const urlBase = 'http://dataservice.accuweather.com/'

const getCityUrl = cityName => `${urlBase}locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`
const getWeatherUrl = cityKey => `${urlBase}currentconditions/v1/${cityKey}?apikey=${apiKey}&language=pt-br`


const fetchData = async endPoint => {
    try{
        const response = await fetch(endPoint)

        if(!response.ok) {
            throw new Error()
        }

        return response.json()
    } catch(error) {
        alert('Não foi possivel obter os dados dessa cidade')
    }
}
