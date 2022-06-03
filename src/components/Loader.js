import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => (

      <ContentLoader
    speed={2}
    width={282}
    height={374}
    viewBox="0 0 282 374"
    backgroundColor="#787878"
    foregroundColor="#5c5c5c"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="282" height="282" />
    <rect x="0" y="287" rx="10" ry="10" width="282" height="85" />
  </ContentLoader>


)

export default Loader


