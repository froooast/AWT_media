import shaka from "shaka-player";

// for now we load ipfs through a cdn because im quite lazy
const node = new window.Ipfs();
let initialized = false;
node.on("ready", () => {
  // Ready to use!
  console.log("ipfs is ready");
  initialized = true;
  //ipfsGet("QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG", "quick-start").then(ans => console.log(ans[0].content))
});

export default function(uri, request, requestType) {
  if (initialized === false) {
    console.error(
      "ipfs not initialized yet. we currently dont have a fallback for this"
    );
  }
  const promise = loadSegment(uri);
  const abort = () => console.log("aborted!");
  return new shaka.util.AbortableOperation(promise, abort);
}

async function loadSegment(uri) {
  const startTime = Date.now();
  try {
    const path = uri.replace("ipfs://", "");
    const arrayBuffer = await ipfsGet(path);
    return {
      uri,
      data: arrayBuffer,
      timeMs: Date.now() - startTime
    };
  } catch (e) {
    console.error("uncaught ipfs error");
    console.error(e);
  }
}

function ipfsGet(path) {
  console.log("fetch from ipfs: '" + path + "'");
  return new Promise((res, rej) => {
    node.files.get(path, (err, files) => {
      if (err) return rej(err);
      else {
        res(files[0].content);
      }
    });
  });
}
