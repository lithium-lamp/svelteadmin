import 'dotenv/config'

export const load = async() => {
  const fetchKnownItems = async () => {
    const url = `http://localhost:4000/v1/knownitems`;
    const header_params = { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` }
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.knownitems, data.metadata];
  }

  let [a, b] = await fetchKnownItems();

  return { knownitems: a, knownitems_metadata: b};
}