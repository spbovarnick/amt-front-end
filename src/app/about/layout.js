import { Suspense } from "react";

const AboutLayout = ({ children }) => {

  return(
    <>
    <Suspense fallback={null}>
      {children}
    </Suspense>
    </>
  );
}

export default AboutLayout