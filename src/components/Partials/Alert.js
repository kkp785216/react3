import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type}`} style={{position: 'fixed !important', top: '3.5rem', position:'fixed', zIndex:'5', left:'0', right:'0'}} role="alert">
            <strong>{props.alert.type.replace(props.alert.type.charAt(0), props.alert.type.charAt(0).toUpperCase())}!</strong> {props.alert.message}
        </div>
    )
}
