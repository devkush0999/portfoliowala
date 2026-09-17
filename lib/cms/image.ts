export function isCloudinaryUrl(src: string) {
  return src.includes("res.cloudinary.com") && src.includes("/image/upload/");
}

export function cmsSrc(src: string, width: number) {
  const marker = "/image/upload/";
  const index = src.indexOf(marker);
  if (index === -1) {
    return src;
  }
  const prefix = src.slice(0, index + marker.length);
  let path = src.slice(index + marker.length);
  if (!/^v\d+\//.test(path)) {
    const version = path.search(/\/v\d+\//);
    if (version >= 0) {
      path = path.slice(version + 1);
    } else {
      path = path.replace(/^[^/]+\/(?=v\d+\/|[\w-]+\/)/, "");
    }
  }
  return `${prefix}f_auto,q_auto,c_limit,w_${width}/${path}`;
}
