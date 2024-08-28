import 'dotenv/config'

export const load = async() => {
  const fetchTags = async () => {
    const url = `http://localhost:4000/v1/tags`;
    const header_params = { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` }
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.tags, data.metadata];
  }

  let [a, b] = await fetchTags();

  return { tags: a, tags_metadata: b};
}