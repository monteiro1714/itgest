export interface weatherInterface {
    date: string;
    temperature: number;
    description: string;
    icon: string;
}

export interface ForecastResponse {
    city: string;
    country: string;
    forecast: weatherInterface[];
}
