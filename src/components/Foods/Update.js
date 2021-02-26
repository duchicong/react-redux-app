import React, { useState } from 'react'

const Update = () => {
  const [formState, setFormState] = useState({
    values: null,
    errors: {},
    valid: true,
    tourch: {}
  })
  return (
    <div className="Create-form">
      Update foods
    </div>
  )
}

export default Update