
export const load = async({cookies}) => {
  const fetchAvailableItems = async () => {
    const url = `http://localhost:4000/v1/availableitems`;
    const header_params = { 'Authorization': `${cookies.get('Authorization')}` };
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.availableitems, data.metadata];
  }

  let [a, b] = await fetchAvailableItems();

  return { availableitems: a, availableitems_metadata: b};
}