This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Third Party Tools

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