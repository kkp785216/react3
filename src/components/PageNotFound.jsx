import React, { useEffect } from 'react'

function PageNotFound(props) {
    useEffect(() => {
        props.changeTitle(props.title);
    });
  return (
    <div>Page Not Found</div>
  )
}

export default PageNotFound