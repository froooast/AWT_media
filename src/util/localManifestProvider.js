import shaka from "shaka-player";
export default function(manifest) {
  const enc = new TextEncoder(); // always utf-8
  const encodedManifest = enc.encode(manifest);
  return uri => {
    const result = {
      uri: uri,
      data: encodedManifest,
      headers: {
        "content-type": "application/dash+xml"
      }
    };
    const promise = new Promise((res, rej) => {
      res(result);
    });
    const abort = () => console.log("aborted!");
    return new shaka.util.AbortableOperation(promise, abort);
  };
}
