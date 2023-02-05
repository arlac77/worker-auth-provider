import sha256 from "crypto-js/sha256";

const secret = "sasffaFAFA35";
const header = { alg: "HS256", typ: "JWT" };

function encode(data) {
  const encoder = new TextEncoder();
  return btoa(encoder.encode(JSON.stringify(data)));
}

function sign(header, user, secret) {
  const encodedHeader = encode(header);
  const encodedPayload = encode(user);
  const signature = btoa(encodedHeader + "." + encodedPayload + secret);
  return encodedHeader + "." + encodedPayload + "." + signature;
}

/**
 * Respond to the request
 * @param {Request} request
 */
export async function authorize(request) {
  const scope = ["a", "b", "c"].join(",");
  const access_token = sign(header, username, secret);

  return new Response(
    { scope, token_type: "bearer", access_token },
    { status: 200 }
  );
}
