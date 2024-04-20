import { useEffect, useState } from "react";

export function ProdStyles() {
  const [cssUrls, setCssUrls] = useState<string[]>([]); // Update the type of cssUrls to string[]
  useEffect(() => {
    const stylesURL = new URL("style.css", import.meta.url).toString();

    setCssUrls([stylesURL]);
  }, []);

  return (
    <>
      {cssUrls.map((url) => (
        <link key={url} type="text/css" rel="stylesheet" href={url} />
      ))}
    </>
  );
}
