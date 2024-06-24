import { AdData } from './types.ts';

export const fetchAdData = async (): Promise<AdData[]> => {
    const response = await fetch('http://localhost:8080/api/ads');
    if (!response.ok) {
        throw new Error('Failed to fetch ad data');
    }
    const data: AdData[] = await response.json();
    return data;
};
