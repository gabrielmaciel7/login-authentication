export const getFormData = (e) => {
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  return data;
};

export const customValidation = (event) => {
  const field = event.target;
  const validation = validateField(field);

  if (!!field.value) {
    field.classList.add("withValue");
  } else {
    field.classList.remove("withValue");
  }

  validation();
  generalValidation();
};

const validateField = (field) => {
  const verifyErrors = () => {
    const MIN_PASS_CHAR = 3;
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }

      if (field.type === "password") {
        if (field.value.length < MIN_PASS_CHAR) foundError = "typeMismatch";
      }
    }

    return foundError;
  };

  const customMessage = (typeError) => {
    const messages = {
      email: {
        valueMissing: "Email is required.",
        typeMismatch: "Invalid email.",
      },
      password: {
        valueMissing: "Password is required.",
        typeMismatch: "Invalid password.",
      },
    };

    return messages[field.type][typeError];
  };

  const setCustomMessage = (message = "") => {
    const spanErrorParent = field.parentNode;
    const spanError = spanErrorParent.querySelector("span.error");

    if (message) {
      //spanErrorParent.classList.add("error");
      spanError.innerHTML = message;
    } else {
      //spanErrorParent.classList.remove("error");
      spanError.innerHTML = "";
    }
  };

  return () => {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);
      setCustomMessage(message);
    } else {
      setCustomMessage();
    }
  };
};

const generalValidation = () => {
  const spans = document.querySelectorAll("span.error");
  const button = document.querySelector("button.submit");
  let valid = true;

  for (let span of spans) {
    if (span.innerHTML !== "") valid = false;
  }

  if (valid) {
    button.classList.add("valid");
  } else {
    button.classList.remove("valid");
  }
};
