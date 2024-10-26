export async function shortenUrl(url: string) {
  const response = await fetch("/short", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oriUrl: url }),
  });
  return response.json();
}
