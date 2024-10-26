export async function shortenUrl(url: string) {
  const response = await fetch("/api/short", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oriUrl: url }),
  });
  return response.json();
}
