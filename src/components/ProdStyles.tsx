import { useEffect, useState } from "react";

export function ProdStyles() {
  const [cssUrls, setCssUrls] = useState<string[]>([]); // Update the type of cssUrls to string[]
  useEffect(() => {
    const assetManifestUrl = new URL(
      "./.vite/manifest.json",
      import.meta.url
    ).toString();
    console.log("assetManifestUrl", assetManifestUrl);
    getAssetsFromWebpack4AssetManifest(assetManifestUrl).then((assets) => {
      setCssUrls(assets.cssUrls);
    });
  }, []);

  return (
    <>
      {cssUrls.map((url) => (
        <link key={url} type="text/css" rel="stylesheet" href={url} />
      ))}
    </>
  );
}

async function getAssetsFromWebpack4AssetManifest(baseUrl: string) {
  const getAbsoluteUrl = (path: string) => new URL(path, baseUrl).toString();
  const response = await fetch(getAbsoluteUrl("manifest.json"));
  if (!response.ok) {
    throw new Error("Failed to get manifest");
  }
  const manifest = await response.json();
  const relativeCssUrls = Object.keys(manifest).filter((x: string) =>
    x.endsWith(".css")
  );
  return {
    cssUrls: relativeCssUrls.map(getAbsoluteUrl),
  };
}
