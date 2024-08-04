
import data from 'public/data.json';

export const searchFood = (query) => {
  if (!query) return [];
  
  query = query.toLowerCase();
  return data.locations.filter(location => 
    location.label.toLowerCase().includes(query) || 
    location.title.toLowerCase().includes(query)
  );
};
