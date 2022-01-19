export const fetch = async (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
  const response = await fetch(input, init)

  if (404 === response.status) {
    return new Promise((resolve, reject) => {
      resolve(new Response())
    })
  }

  return response
}
