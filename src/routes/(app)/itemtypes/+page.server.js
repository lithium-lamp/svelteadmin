import 'dotenv/config'

export const load = async() => {
  const fetchItemTypes = async () => {
    const url = `http://localhost:4000/v1/itemtypes`;
    const header_params = { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` }
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.itemtypes, data.metadata];
  }

  let [a, b] = await fetchItemTypes();

  return { itemtypes: a, itemtypes_metadata: b};
}