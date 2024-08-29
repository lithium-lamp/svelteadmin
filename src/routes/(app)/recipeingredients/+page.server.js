export const load = async({cookies}) => {
  const fetchRecipeIngredients = async () => {
    const url = `http://localhost:4000/v1/recipeingredients`;
    const header_params = { 'Authorization': `${cookies.get('Authorization')}` };
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.recipeingredients, data.metadata];
  }

  let [a, b] = await fetchRecipeIngredients();

  return { recipeingredients: a, recipeingredients_metadata: b};
}