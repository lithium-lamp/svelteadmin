import { redirect } from '@sveltejs/kit';

export const load = async({cookies}) => {
  const fetchTags = async () => {
    const authcookie = cookies.get('Authorization');
    if (authcookie == null) {
      redirect(303, '/login?error_invalid_token');
    }

    const url = `http://localhost:4000/v1/tags`;

    const header_params = { 'Authorization': `${authcookie}` }
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.tags, data.metadata];
  }

  let [a, b] = await fetchTags();

  return { tags: a, tags_metadata: b};
}