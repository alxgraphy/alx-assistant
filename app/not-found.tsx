export default function NotFound() {
  const messages = [
    {
      title: "404",
      subtitle: "PAGE NOT FOUND",
      message: "This page went to get milk and never came back.",
    },
    {
      title: "404",
      subtitle: "LOST IN THE VOID",
      message: "Even my AI assistant can't find this one. And it has access to the entire internet.",
    },
    {
      title: "404",
      subtitle: "CONGRATULATIONS",
      message: "You've discovered a page so rare, it doesn't exist. Impressive.",
    },
    {
      title: "404",
      subtitle: "ERROR: SUCCESS",
      message: "You successfully found a page that doesn't exist. That takes skill.",
    },
    {
      title: "404",
      subtitle: "MISSING",
      message: "This page is taking a mental health day. It'll be back never.",
    },
  ];

  // Pick random message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        {/* Giant 404 */}
        <div className="mb-8">
          <h1 className="text-[200px] leading-none font-black tracking-tighter">
            {randomMessage.title}
          </h1>
          <div className="h-4 w-64 bg-black mt-4"></div>
        </div>

        {/* Message Box */}
        <div className="border-4 border-black bg-white p-8 mb-8">
          <h2 className="text-4xl font-black mb-4">{randomMessage.subtitle}</h2>
          <p className="text-xl font-mono mb-6">{randomMessage.message}</p>
          
          <div className="h-1 w-full bg-black mb-6"></div>
          
          <p className="font-mono text-sm mb-4">SUGGESTED ACTIONS:</p>
          <ul className="space-y-2 font-mono">
            <li>→ Check the URL (you probably typed it wrong)</li>
            <li>→ Go back to safety</li>
            <li>→ Question your life choices</li>
            <li>→ Accept defeat</li>
          </ul>
        </div>

        {/* Back Button */}
        <a
          href="/"
          className="inline-block bg-black text-white px-8 py-4 font-black text-xl border-4 border-black hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1"
        >
          ← TAKE ME HOME
        </a>

        {/* Footer */}
        <div className="mt-8 text-center font-mono text-sm">
          Made with ❤️ in Toronto, Canada 🇨🇦 by Alexander Wondwossen <span className="font-bold">(@alxgraphy)</span>
        </div>
      </div>
    </div>
  );
}