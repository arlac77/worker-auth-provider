/**
 * Respond to the request
 * @param {Request} request
 */
export async function authorize(request) {
  return new Response({ access_token: "token" }, { status: 200 });
}
