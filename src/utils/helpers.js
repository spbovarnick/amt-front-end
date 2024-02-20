export function getCloudfrontUrl(
  path,
  width = null,
  height = null,
  fit = "contain" // one of "cover" | "contain"
) {
  // takes an activeRecord attachment path and returns a Cloudfront URL
  const url = new URL(path);
  if (process.env.TARGET_DB === "production") {
    console.log('prod block')
    const request = {
      bucket: process.env.S3_BUCKET, // S3 bucket name
      key: url.pathname.replace(/^\//, ""), // path to your file on the S3 bucket (ex. photos/face1.png)
      edits: {
        webp: true,
        jpeg: true,
        resize: {
          width: width,
          height: height,
          fit: fit,
        },
      },
    };

    const strRequest = JSON.stringify(request);
    const encRequest = btoa(strRequest);
    const newUrl = `${process.env.PROD_CLOUDFRONT_DISTRO}/${encRequest}`;

    return newUrl;
  } else if (process.env.TARGET_DB === "staging") {
    console.log('staging block')
    const request = {
      bucket: process.env.STAGING_S3_BUCKET, // S3 bucket name
      key: url.pathname.replace(/^\//, ""), // path to your file on the S3 bucket (ex. photos/face1.png)
      edits: {
        webp: true,
        jpeg: true,
        resize: {
          width: width,
          height: height,
          fit: fit,
        },
      },
    };

    const strRequest = JSON.stringify(request);
    const encRequest = btoa(strRequest);
    const newUrl = `${process.env.STAGING_CLOUDFRONT_DISTRO}/${encRequest}`;

    return newUrl;
  } else {
    console.log('local block')
    return path;
  }
}
