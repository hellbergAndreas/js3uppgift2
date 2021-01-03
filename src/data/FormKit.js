export default class {
  login = [
    {
      name: "email",
      input: "input",
      type: "input",
      label: "email",
      validateEmail: true,
    },
    { name: "password", input: "input", type: "password", required: true },
  ]

  register = [
    { name: "firstName", input: "input", required: true },
    { name: "lastName", input: "input", required: true },
    {
      name: "email",
      input: "input",
      type: "input",
      validateEmail: true,
      label: "email",
    },

    { name: "password", input: "input", type: "password", required: true },
    { name: "organisationName", input: "input", required: true },
    {
      name: "organisationKind",
      input: "select",
      required: true,
      options: [1, 2, 3],
    },
  ]

  customer = [
    { name: "name", label: "name", input: "input", required: true },
    { name: "organisationNr", label: "Organisation number", input: "input" },
    { name: "vatNr", label: "Vat number", input: "input", validateVat: true },
    { name: "reference", label: "Reference", input: "input" },
    {
      name: "paymentTerm",
      label: "Payment term",
      input: "input",
      required: true,
      type: "number",
    },
    { name: "website", label: "Website", input: "input" },
    { name: "email", input: "input", type: "input", label: "email" },
    { name: "phoneNumber", label: "Phone number", input: "input" },
  ]
  errorMessages = []

  validateEmail(field, fieldValues) {
    const re = /\S+@\S+\.\S+/
    if (!re.test(fieldValues[field.name])) {
      this.errorMessages.push({ [field.name]: "please enter a valid email!" })
    }
  }
  validateVat(field, fieldValues) {
    const re = /^(SE)(\d{10}01$)/i
    console.log(fieldValues[field.name])
    if (!re.test(fieldValues[field.name])) {
      this.errorMessages.push({ [field.name]: "please enter a valid vat!" })
    }
  }
  validateRequired(field) {
    this.errorMessages.push({ [field.name]: "this field is required!" })
  }
  checkValidations(fieldValues, type) {
    const form = this[type]
    form.forEach((field) => {
      if (field.validateEmail) {
        console.log("validates email")
        this.validateEmail(field, fieldValues)
      }
      if (field.validateVat) {
        this.validateVat(field, fieldValues)
      }
      if (field.required && fieldValues[field.name].length === 0) {
        this.validateRequired(field, fieldValues)
      }
    })
  }
  validate = (type, fieldValues, setErrorMessage) => {
    this.checkValidations(fieldValues, type)

    if (this.errorMessages.length === 0) {
      return true
    } else {
      setErrorMessage({})
      this.errorMessages.forEach((error) => {
        setErrorMessage((prevState) => {
          return {
            ...prevState,
            ...error,
          }
        })
      })
    }
  }
}
