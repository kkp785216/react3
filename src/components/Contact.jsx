import React, { useEffect } from 'react'

function Contact(props) {
    useEffect(() => {
        props.changeTitle(props.title);
    });
  return (
    <div>This is contact page</div>
  )
}

export default Contact