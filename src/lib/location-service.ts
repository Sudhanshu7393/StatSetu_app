export interface LocationSearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
}

export async function searchRealLocation(query: string): Promise<LocationSearchResult[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query + ', India'
      )}&limit=6&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          'User-Agent': 'StaySetuStudentHousingApp/1.0',
        },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.map((item: any) => ({
      place_id: item.place_id,
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
      type: item.type,
    }));
  } catch (err) {
    console.error('Error fetching real location:', err);
    return [];
  }
}
