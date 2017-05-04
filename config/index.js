var errors = {
        "validationSchema": {
            "registration": {
                "firstname": { in: "body",
                    notEmpty: {
                        errorMessage: 'firstname field is require & cannot be blank.'
                    }

                },
                "lastname": { in: "body",
                    notEmpty: {
                        errorMessage: 'lastname field is require & cannot be blank.'
                    }

                },
                "email": { in: "body",
                    notEmpty: {
                        errorMessage: 'email field is require & cannot be blank.'
                    },
                    isEmail: {
                        errorMessage: 'email field must have email Value.'
                    }
                },
                "password": { in: "body",
                    notEmpty: {
                        errorMessage: 'password field is require & cannot be blank.'
                    }

                },
                "mobileno": { in: "body",
                    notEmpty: {
                        errorMessage: 'mobileno field is require & cannot be blank.'
                    }

                }
            },
            "login": {
                "email": { in: "body",
                    notEmpty: {
                        errorMessage: 'email field is require & cannot be blank.'
                    },
                    isEmail: {
                        errorMessage: 'email field must have email Value.'
                    }
                },
                "password": { in: "body",
                    notEmpty: {
                        errorMessage: 'password field is require & cannot be blank.'
                    },
                    // isPassword: {
                    //     errorMessage: 'password field Must Be Proper Date.'
                    // }
                }
              }
          },
          checkSystemErrors : function(err) {
            console.log("bdsvbldsvbll");
              return err instanceof TypeError ||
                  err instanceof SyntaxError ||
                  err instanceof EvalError ||
                  err instanceof RangeError ||
                  err instanceof ReferenceError
          }

        }
        module.exports = errors;
