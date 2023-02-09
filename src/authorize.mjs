import jwt from "@tsndr/cloudflare-worker-jwt";

const secret = "sasffaFAFA35";

/**
 * Respond to the request
 * @param {Request} request
 */
export async function authorize(request) {
  const entitlements = ["a", "b", "c"].join(",");

  const access_token = jwt.sign({
     username,
     entitlements,
     exp: Math.floor(Date.now() / 1000) + (2 * (60 * 60))
   }, secret);

  return new Response(
    { token_type: "bearer", access_token },
    { status: 200 }
  );
}
