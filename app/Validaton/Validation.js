

//Login Validation
  export const LoginValidate = (email,password) => {
      let errors = {};
      if (!email?.trim()) {
        errors.email = "*Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "*You have entered an invalid email address!";
      }

      if (!password?.trim()) {
        errors.password = "*Password is required";
      }
      return errors;
  };


//
    export const resetPasswordValidation = (password, confirmPassword) => {
      let errors = {};

      if (!password?.trim()) {
        errors.password = "*Password is required";
      } else if (password.length < 8) {
        errors.password = "*Password must be at least 8 characters long";
      }

      if (!confirmPassword?.trim()) {
        errors.confirmPassword = "*Confirm Password is required";
      } else if (confirmPassword !== password) {
        errors.confirmPassword = "*Passwords do not match";
      }
      return errors;
    };