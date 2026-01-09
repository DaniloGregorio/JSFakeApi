function fakeFetch(url, options = {}) {
  const method = options.method || "GET";
  const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let data = JSON.parse(localStorage.getItem(url));
        if ((method = "POST")) {
          data = options.body;
          localStorage.setItem(url, JSON.stringify(data));
        }
        if (method === "DELETE") {
          localStorage.removeItem(url);
        }
        resolve({
          ok: true,
          json: async () => data,
        });
      } catch (err) {
        reject(new Error("API error"));
      }
    }, 100);
  });
}
