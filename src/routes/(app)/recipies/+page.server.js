export const load = async({cookies}) => {
  const fetchRecipies = async () => {
    const url = `http://localhost:4000/v1/recipies`;
    const header_params = { 'Authorization': `${cookies.get('Authorization')}` };
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.recipies, data.metadata];
  }

  let [a, b] = await fetchRecipies();

  return { recipies: a, recipies_metadata: b};
}