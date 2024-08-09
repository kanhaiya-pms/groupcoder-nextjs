
// const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT; // local & dev
const API_ROOT = "http://localhost:8081/"

const encode = encodeURIComponent;
export class Api {

  private headers = {
  }
  constructor(token?: string) {
    this.headers = {
      "content-type":"application/json",
      ...(token && { authorization: `Bearer ${token}` })
    }
  }

  private requests = {
    // del: (url: string) =>
    // superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: (url: string) =>
      // superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
      fetch(`${API_ROOT}${url}`, {
        method: "GET",
        headers: this.headers
      }).then(res => res.json()),
    // put: (url: string, body: any) =>
    //   superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    // patch: (url: string, body: any) =>
    //   superagent.patch(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url: string, body: any) =>
      fetch(`${API_ROOT}${url}`, {
        method: "POST",
        headers:{ ...this.headers,
        },
        body: JSON.stringify(body)
      }).then(res => res.json()),
    
    update: (url: string, body: any) =>
        fetch(`${API_ROOT}${url}`, {
          method: "UPDATE",
          headers:{ ...this.headers,
          },
          body: JSON.stringify(body)
        }).then(res => res.json()),

    delete: (url: string) =>
            fetch(`${API_ROOT}${url}`, {
              method: "DELETE",
              headers:{ ...this.headers,
              }
            }).then(res => res.json()),
    // file: (url: string, key: string, file: any) =>
    //   superagent.post(`${API_ROOT}${url}`).attach(key, file).use(tokenPlugin).then(responseBody),
  };

  Quote = {
    create: (items: any) =>
      this.requests.post(`proposal`, items),
    get: () =>
      this.requests.get(`proposal`),
    getById: (id: string) =>
      this.requests.get(`proposal/${id}`),
    getMy: () =>
      this.requests.get(`proposal/my`),
    update: () =>
      this.requests.get(`proposal`),
  };

  Auth = {
    signin: (items: any) =>
      this.requests.post(`auth/login`, items),
    otpVerify: (items: any) =>
      this.requests.post(`auth/login/otp`, items),
  };

  Users = {
    create: (items: any) =>
      this.requests.post(`proposal`, items),
    get: () =>
      this.requests.get(`proposal`),
    getById: (id: string) =>
      this.requests.get(`proposal/${id}`),
    update: () =>
      this.requests.get(`proposal`),
  };

}