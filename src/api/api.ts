import axios from 'axios';

export type Item = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
