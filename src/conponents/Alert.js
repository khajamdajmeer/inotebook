import React from 'react'

const Alert = (props) => {
  const Capitalize = (word)=>{
    const lower = word.toLowerCase();
    return lower.ChartAt(0).toUpperCase()+lower.slice(1)
  }
  return (
    <>
    <div style={{height:'50px'}}>

    {props.Alert&& <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{Capitalize(props.alert.type)}</strong>:{props.Alert.msg}
</div>}
    </div>

    </>
  )
}

export default Alert
