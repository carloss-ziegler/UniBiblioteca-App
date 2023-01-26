interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "934bhvdvbwbvwbviowe9ru4r",
        user: {
          name: "Henrique",
          email: "henrique@gmail.com",
        },
      });
    }, 1500);
  });
}
