import { useEffect, useState } from "react";

export function ProdStyles() {
  const [cssUrls] = useState<string[]>([`style.css`]); // Update the type of cssUrls to string[]
  useEffect(() => {
    const assetManifestUrl = new URL(
      "./.vite/manifest.json",
      import.meta.url
    ).toString();
    console.log("assetManifestUrl", assetManifestUrl);
  }, []);

  return (
    <>
      {cssUrls.map((url) => (
        <link key={url} type="text/css" rel="stylesheet" href={url} />
      ))}
    </>
  );
}
