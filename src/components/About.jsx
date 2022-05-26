import React, { useEffect } from 'react'

function About(props) {
  useEffect(() => {
    props.changeTitle(props.title);
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>This is about page</div>
  )
}

export default About