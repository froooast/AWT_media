import shaka from "shaka-player";

// for now we load ipfs through a cdn because im quite lazy
const node = new window.Ipfs();
let initialized = false;
node.on("ready", () => {
  // Ready to use!
  console.log("ipfs is ready");
  initialized = true;
  /*node.files.ls('/ipfs/QmSTi5L9VC8chZdSKt7sEBNWpi74dVJKawZs8TPoNnhdcu', (err, ans) => console.log(err,ans))
  node.files.ls('/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG', (err, ans) => console.log(err,ans))
  node.files.ls('/ipfs/QmSnNCfxL7R1ei8Dfk82gsEPykBZjC683iovaxaMxuE1WW', (err, ans) => console.log(err,ans))*/
  //ipfsGet("QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/quick-start").then(ans => console.log(ans))
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
      console.log("callback!")
      clearTimeout(timer)
      if (err) return rej(err);
      else {
        console.log("fetch successful!")
        res(files[0].content);
      }
    });
  });
}
