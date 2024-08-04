
import data1 from 'public/data.json';
import data2 from 'public/data2.json';

export const searchFood = (query) => {
  if (!query) return [];
  
  query = query.toLowerCase();
  const combinedData = [...data1.locations, ...data2.locations];
  return combinedData.filter(location => 
    location.label.toLowerCase().includes(query) || 
    location.title.toLowerCase().includes(query)
  );
};
