import { load, save } from "../storage/storage.js";

export function fakeFetch(url, options = {}) {
  const method = options.method || "GET";

  return new Promise((resolve, reject) => {
    //timeout function to simulate a server response
    setTimeout(() => {
      try {
        if (url !== "/login") {
          const token = options.headers?.Authorization;
          if (!token) {
            reject({ status: 401, message: "Unauthorized" });
            return;
          }
        }

        let data = load(url);

        if (method === "POST") {
          const body = JSON.parse(options.body);
          data.push(body);
          save(url, data);
        }

        if (method === "DELETE") {
          save(url, []);
          data = [];
        }

        resolve({
          ok: true,
          json: async () => data,
        });
      } catch {
        reject(new Error("Fake API error"));
      }
    }, 100);
  });
}
