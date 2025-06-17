# ALBINA COMMUNITY ARCHIVE - Public-Facing Front End

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This interactive and complete archive is accessible to the public and utilizes the API at [https://github.com/spbovarnick/amt-admin-1.0](https://github.com/spbovarnick/amt-admin-1.0).

### Local Development

Locally this app runs on port 3333; [amt-admin-1.0](https://github.com/spbovarnick/amt-admin-1.0), which runs on port 3000, also needs to be running to hydrate amt-front-end with data.

Your `.env` file should include the following variables:
- `NEXT_PUBLIC_DEV_API_URL`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRO`
- `NEXT_PUBLIC_DOMAIN`
- `NEXT_PUBLIC_TARGET_DB`

This project's `NEXT_PUBLIC_TARGET_DB` need to match the value of [amt-admin-1.0's](https://github.com/spbovarnick/amt-admin-1.0) to operate correctly in development.

Start the server with `npm run dev`

<strong><ins>NOTE:</ins></strong>

In the event that the CloudFront or AWS URLs change, those values need to be updated in both `.env` and `remotePatterns` `next.config.js`. Because this project utilizes Next's `Image` component, external images need to be validated in this config value.

### Deployment

Pushes to `staging` automatically deploys to the staging environment on Vercel. These deployments can be promoted to via the deployments tab in Vercel, but all pushes to `main` automatically build new production deployments. Following best practice, all changes and features should be merged first to `staging`, to test Vercel's staging environment, and then into `main` for production deployment.

### Third Party Tools

**_react-responsive-masonry_**
(https://github.com/cedricdelpoux/react-responsive-masonry)[https://github.com/cedricdelpoux/react-responsive-masonry]

**_classnames_**
(https://github.com/JedWatson/classnames)[https://github.com/JedWatson/classnames]

**_react-select_**
[https://github.com/JedWatson/react-select/tree/master](https://github.com/JedWatson/react-select/tree/master)

**_Axios_** <br/>
Used for API queries. <br/>
[https://github.com/axios/axios](https://github.com/axios/axios)

**_google-map-react_** <br/>
Used to render custom Google Maps and markers. <br/>
[https://github.com/google-map-react/google-map-react](https://github.com/google-map-react/google-map-react)

**_use-supercluster_** <br/>
Used with peer dependency [supercluster](https://github.com/mapbox/supercluster) to render marker clusters within the google-map-react component.<br/>
[https://github.com/leighhalliday/use-supercluster](https://github.com/leighhalliday/use-supercluster)

**_react-window_** <br/>
Used to create a custom built timeline. react-window virtualizes the large array of rendered timeline items without crashing the browser during interaction.<br/>
[https://github.com/bvaughn/react-window](https://github.com/bvaughn/react-window)

**_react-intersection-observer_** <br/>
React implementation of the Intersection Observer API. Used within the `Timeline.jsx` component to detect when a timeline card is centered in its scrolling parent and render the card's year information. <br/>
[https://github.com/thebuilder/react-intersection-observer#readme](https://github.com/thebuilder/react-intersection-observer#readme)

**_zoom-pan-pinch_** <br/>
Used to give users greater access to image file types in the archive modal. <br/>
[https://github.com/BetterTyped/react-zoom-pan-pinch/tree/master](https://github.com/BetterTyped/react-zoom-pan-pinch/tree/master)