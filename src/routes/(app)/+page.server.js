import { redirect } from '@sveltejs/kit';

export const load = async({cookies}) => {
  const getCookies = () => {
    const authcookie = cookies.get('Authorization');
    if (authcookie == null) {
      redirect(303, '/login?error_invalid_token');
      //console.log("bad");
    }

    return false;
  }

  return {val: getCookies()};
}