import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
type HideShowProp = {
  component: any,
  nameSection: string,
  buttonName: string
}
function HideShow({component, nameSection, buttonName}: HideShowProp) {
  const [isVisible, initHs] = useState(false)
  const invokeCollapse = () => {
    return initHs(!isVisible)
  }
  return (
    <div>
      <h2 className="mb-2">{nameSection}</h2>
      <Button variant="success" className="mb-4" onClick={invokeCollapse}>
       {buttonName}
      </Button>
      <Collapse in={isVisible}>
        <div id="collapsePanel">
          {component()}
        </div>
      </Collapse>
    </div>
  )
}
export default HideShow