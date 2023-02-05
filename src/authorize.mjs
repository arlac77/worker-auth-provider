/**
 * Respond to the request
 * @param {Request} request
 */
export async function authorize(request) {
  const scope = ["a", "b", "c"].join(",");
  return new Response(
    { scope, token_type: "bearer", access_token: "token" },
    { status: 200 }
  );
}
