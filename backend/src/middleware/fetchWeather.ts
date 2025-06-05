import {Request, Response} from 'express';

const fetchWeather = async (req:Request, res:Response): Promise<void> => {
    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        res.status(500).json({error: 'API Key not defined'})
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
        const response = await fetch(url);

        if(!response.ok) {
            res.status(response.status).json({error: 'Error consulting OpenWeather API'});
            return;

        }

        const data = await response.json();

        const nextFiveDays = data.list.filter((_:any, index: number) => index % 8 === 0);

        const result = nextFiveDays.map((item:any) => ({
            data: item.dt_txt,
            temperatura: item.main.temp,
            descrição: item.weather[0].description,
            icone: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
        }));

        res.json ({
            cidade: data.city.name,
            país: data.city.country,
            previsão: result
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({error:'Erro interno ao obter dados metereológicos'});
    }
};

export default fetchWeather;