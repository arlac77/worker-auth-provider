import { Router } from "itty-router";
import { error, json, missing } from "itty-router-extras";
import { createCors } from "itty-cors";

//const { preflight, corsify } = createCors();

const router = Router();

router
//  .all("*", preflight) // handle CORS preflight/OPTIONS requests
  .get("/version", () => json({ version: "0.1.0" }))
  .get("/", getLog)
  .all("*", () => missing("Are you sure about that?"));

export default {
  fetch: (...args) =>
    router
      .handle(...args)
      .catch(err => error(500, err.stack))
//      .then(corsify)
};

addEventListener("fetch", event => {
  event.respondWith(getLog(event.request));
});

/**
 * Respond to the request
 * @param {Request} request
 */ 
async function authorize(request) {
  return new Response({ access_token: "token" }, { status: 200 });
}
