import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({request, cookies}) => {
    const data = await request.formData();
    let email = data.get('email'); //validation and sanitizing required
    let password = data.get('password'); //validation and sanitizing required

    const response = await fetch('http://localhost:4000/v1/tokens/authentication', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

    const json = await response.json();

    if (response.ok) {
      cookies.set('Authorization', `Bearer ${json.authentication_token.token}`, {
            path: '/',
            expires: new Date(`${json.authentication_token.expiry}`),
            httpOnly: false,
        },
      );

      redirect(303, '/');
    }
    else {
      //console.log(json.error);
      switch (json.error) {
        case "invalid authentication credentials":
          redirect(303, '/login?error_authentication_credentials');
        default:
          redirect(303, '/login');
      }
    }
  },
};