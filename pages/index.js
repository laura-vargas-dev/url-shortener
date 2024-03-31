import { useState, useRef } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const inputRef = useRef();
  const copyRef = useRef();
  const [shortUrl, setShortUrl] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    const currentUrl = window.location.href;
    e.preventDefault();
    const url = inputRef.current.value;
    fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShortUrl(currentUrl + data.shortUrl);
      });
  };

  const copyUrl = (e) => {
    const value = copyRef.current.value;
    navigator.clipboard.writeText(value);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Acorta tu url aquí</h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">Esta es la plataforma definitiva para acortar tus url's.</p>
              <form onSubmit={handleSubmit}>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <label htmlFor="url" className="sr-only">
                    Url
                  </label>
                  <input
                    ref={inputRef}
                    id="url"
                    name="url"
                    type="url"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your url"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Short
                  </button>
                </div>
              </form>
              {shortUrl !== null && (
                <div className="relative mt-6 flex max-w-md gap-x-4">
                  <label htmlFor="short-url" className="sr-only">
                    Short url
                  </label>
                  <input
                    ref={copyRef}
                    id="short-url"
                    name="short-url"
                    type="short-url"
                    value={shortUrl}
                    disabled
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="You short url"
                  />
                  <button
                    onClick={copyUrl}
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-indigo-500 rounded-e-lg hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </button>
                </div>
              )}              
              {showAlert && <p className="text-end text-white">Copied!</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
