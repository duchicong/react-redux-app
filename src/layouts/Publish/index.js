import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'

const Publish = (props) => {
  return (
    <div className="Publish">
      <Header>{props.children}</Header>
      <Footer />
    </div>
  )
}

Publish.propTypes = {
  children: PropTypes.node.isRequired
}

export default Publish