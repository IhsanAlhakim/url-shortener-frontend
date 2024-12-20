import { useState } from "react";
import Footer from "./components/Footer";
import { shortenUrl } from "./network/urlApi";

function App() {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [shortenedUrl, setShortenedUrl] = useState<string | undefined>(
    undefined
  );
  const [copyText, setCopyText] = useState<string>("Copy");
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (url) {
      try {
        const shortenedUrlData = await shortenUrl(url);
        setCopyText("Copy");
        setShortenedUrl(shortenedUrlData.shortUrl);
      } catch (error) {
        console.error(error);
        setServerError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 relative">
        {serverError && (
          <div
            onClick={() => {
              setServerError(false);
            }}
            className="fixed text-center w-full p-2 text-white bg-red-600 cursor-pointer hover:bg-red-400"
          >
            Server Error / Offline, Please Try Again Later
          </div>
        )}

        <main className="min-h-screen lg:flex justify-center items-center ">
          <section className="lg:w-[80%] min-h-dvh lg:min-h-[500px] bg-snaplink bg-cover bg-center rounded-3xl flex flex-col gap-4 justify-center items-center relative">
            <div className="text-center text-white lg:w-[700px] flex flex-col gap-2 p-3 lg:p-0">
              <h1 className="text-5xl font-semibold">SNAPLINK</h1>
              <h2 className="text-3xl font-semibold">Easily Shareable Links</h2>
              <p className="text-base font-light">
                Use our free URL shortener to convert lengthy URLs into compact
                links that are perfect for sharing on social media, emails, or
                any platform
              </p>
            </div>
            <div className="px-3">
              <form onSubmit={handleSubmit}>
                <div className="bg-white md:w-[600px] lg:w-[800px] flex rounded-lg overflow-hidden">
                  <input
                    type="text"
                    name="url"
                    id="url"
                    disabled={loading}
                    value={url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUrl(e.target.value)
                    }
                    className="bg-transparent outline-none w-full text-lg p-3"
                  />
                  <button
                    disabled={loading}
                    type="submit"
                    className={
                      loading
                        ? "bg-gray-500 w-[150px] text-white font-semibold"
                        : "bg-gray-900 w-[150px] text-white font-semibold"
                    }
                  >
                    {loading ? "Loading..." : "Shorten"}
                  </button>
                </div>
              </form>
            </div>
            <div className="px-3">
              <div className="bg-white md:w-[400px] flex rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={shortenedUrl}
                  readOnly
                  placeholder="Your Shortened URL Here"
                  className="bg-transparent outline-none w-full text-lg p-3"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (shortenedUrl) {
                      navigator.clipboard.writeText(shortenedUrl);
                      setCopyText("Copied");
                    }
                  }}
                  className="bg-gray-900 w-[150px] text-white font-semibold"
                >
                  {copyText}
                </button>
              </div>
            </div>
            <div className="absolute left-4 bottom-2 text-white font-semibold">
              <a href="https://www.freepik.com/free-photo/black-laptop-screen-dark-room-night_269980950.htm#fromView=search&page=2&position=24&uuid=14867695-9166-45ab-a48e-61c5d3ae9c60">
                Image by pvproductions on Freepik
              </a>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
