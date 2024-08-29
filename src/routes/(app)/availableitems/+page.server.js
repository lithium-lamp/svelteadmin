import { redirect } from '@sveltejs/kit';

export const load = async({cookies}) => {
  const fetchAvailableItems = async () => {
    const authcookie = cookies.get('Authorization');
    if (authcookie == null) {
      redirect(303, '/login?error_invalid_token');
    }

    const url = `http://localhost:4000/v1/availableitems`;
    const header_params = { 'Authorization': `${authcookie}` };
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.availableitems, data.metadata];
  }

  let [a, b] = await fetchAvailableItems();

  return { availableitems: a, availableitems_metadata: b};
}