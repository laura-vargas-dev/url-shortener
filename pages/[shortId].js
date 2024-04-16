export default function ShortIdPage() {
  return <div>Redirecting...</div>;
}

export async function getServerSideProps({ params }) {
  const { shortId } = params;
  try {
    const response = await fetch(process.env.NEXTAUTH_URL + "/api/getShortUrl", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ shortId }),
    });
    const data = (await response?.json()) || null;
    if (!data) return { redirect: { destination: "/" } };
    return { redirect: { destination: data.url } };
  } catch (error) {
    return { redirect: { destination: "/" } };
  }
}
