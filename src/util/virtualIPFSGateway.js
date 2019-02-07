import shaka from "shaka-player";

// for now we load ipfs through a cdn because im quite lazy
const node = new window.Ipfs();
let initialized = false;
node.on("ready", () => {
  // Ready to use!
  console.log("ipfs is ready");
  initialized = true;
});

export default function(uri, request, requestType) {
  if (initialized === false) {
    console.error("ipfs not initialized yet. we currently dont have a fallback for this");
  }
  const promise = loadSegment(uri);
  const abort = () => console.log("aborted!");
  return new shaka.util.AbortableOperation(promise, abort);
}

async function loadSegment(uri) {
  const startTime = Date.now();
  try {
    const path = uri.replace("ipfs:", "").replace("//", "");
    const arrayBuffer = await ipfsGet(path);
    return {
      uri,
      data: arrayBuffer,
      timeMs: Date.now() - startTime
    };
  } catch (e) {
    console.error(e);
    throw e
  }
}

function ipfsGet(path, timeout = 30000) {
  console.log("fetch from ipfs: '" + path + "'");
  return new Promise((res, rej) => {
    const timer = setTimeout(() => res([]), timeout)
    node.get(path, (err, files) => {
      clearTimeout(timer)
      if (err) return rej(err);
      else {
        res(files[0].content);
      }
    });
  });
}
