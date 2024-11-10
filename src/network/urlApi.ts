export async function shortenUrl(url: string) {
  const response = await fetch("api/short", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oriUrl: url }),
  });
  console.log(response.ok);
  console.log(response.status);
  console.log(response.json());
  return response.json();
}
