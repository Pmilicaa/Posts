export class DataService {
  baseUrl = "https://jsonplaceholder.typicode.com";

  async get<T>(route: string): Promise<T> {
    try {
      const url = [this.baseUrl, route].join("/");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}
