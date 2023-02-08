import jwt from "@tsndr/cloudflare-worker-jwt";

const secret = "sasffaFAFA35";

/**
 * Respond to the request
 * @param {Request} request
 */
export async function authorize(request) {
  const scope = ["a", "b", "c"].join(",");

  const access_token = jwt.sign({ username }, secret, {
    expiresIn: "2h"
  });

  return new Response(
    { scope, token_type: "bearer", access_token },
    { status: 200 }
  );
}
