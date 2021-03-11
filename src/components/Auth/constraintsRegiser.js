const constraints = (validate) => {
  return {
    userName: {
      presence: {
        allowEmpty: false,
        length: 50,
        message: validate.presence.message
      }
    },
    phone: {
      presence: {
        allowEmpty: false,
        length: 11,
        message: validate.presence.message
      }
    },
    email: {
      presence: {
        allowEmpty: false,
        length: 255,
        message: validate.presence.message
      }
    },
    password: {
      presence: {
        allowEmpty: false,
        length: 12,
        message: validate.presence.message
      }
    }
  }
}
export default constraints