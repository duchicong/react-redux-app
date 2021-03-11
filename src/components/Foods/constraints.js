const constraints = (validate) => {
  return {
    name: {
      presence: {
        allowEmpty: false,
        length: 50,
        message: validate.presence.message
      }
    },
    description: {
      presence: {
        allowEmpty: false,
        length: 255,
        message: validate.presence.message
      }
    },
    price: {
      presence: {
        allowEmpty: false,
        length: 12,
        message: validate.presence.message
      }
    }
  }
}
export default constraints