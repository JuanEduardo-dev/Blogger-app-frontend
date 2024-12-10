export const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error fetching publications');
  }
  
  const result = await response.json();
  return result.data;
};