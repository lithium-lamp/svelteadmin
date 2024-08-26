import 'dotenv/config'

export const load = async() => {
  const fetchRecipies = async () => {
    const url = `http://localhost:4000/v1/ingredients`;
    const header_params = { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` }
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.ingredients, data.metadata];
  }

  let [a, b] = await fetchRecipies();

  return { ingredients: a, ingredients_metadata: b};
}