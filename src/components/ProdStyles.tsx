import { useEffect, useState } from "react";

/**
 *
 * @returns A component that will inject the production styles for the widget when built in production mode, since the styles are not included in the standalone web component.
 */
export function ProdStyles() {
  const [cssUrls, setCssUrls] = useState<string[]>([]);
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
