import { Request, Response } from 'express';
import fetch from 'node-fetch';

type PexelsPhoto = {
  src: {
    landscape: string;
  };
};

type PexelsResponse = {
  photos: PexelsPhoto[];
};

const fetchCityImage = async (req: Request, res: Response): Promise<void> => {
  const city = req.params.city;
  const pexelsApiKey = process.env.PEXELS_API_KEY;

  if (!pexelsApiKey) {
    res.status(500).json({ error: 'Pexels API Key not defined' });
    return;
  }

  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(city)}&per_page=1&size=large`;
    const response = await fetch(url, {
      headers: {
        Authorization: pexelsApiKey,
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ error: 'Error contacting Pexels API' });
      return;
    }

    const data = (await response.json()) as PexelsResponse;

    if (!data.photos || data.photos.length === 0) {
      res.status(404).json({ error: 'No images found for the specified city' });
      return;
    }

    const imageUrl = data.photos[0].src.landscape;

    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error fetching city image' });
  }
};

export default fetchCityImage;
