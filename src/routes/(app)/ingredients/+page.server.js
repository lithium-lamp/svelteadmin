
export const load = async({cookies}) => {
  const fetchIngredients = async () => {
    const url = `http://localhost:4000/v1/ingredients`;
    const header_params = { 'Authorization': `${cookies.get('Authorization')}` };
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.ingredients, data.metadata];
  }

  let [a, b] = await fetchIngredients();

  return { ingredients: a, ingredients_metadata: b};
}