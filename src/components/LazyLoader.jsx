import React, { Suspense } from "react";

function Loader() {
  return <div>Loading...</div>;
}

function LazyLoader({ children }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

export default LazyLoader;
