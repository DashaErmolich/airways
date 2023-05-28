export const formValidationErrorsMessages = {
  authForm: {
    email: {
      required: 'Please enter a login email',
      email: 'The login email is invalid',
    },
    password: {
      required: 'Please enter a password',
      strong: {
        inform: 'Your password isn\'t strong enough',
        length: 'at least 8 characters',
        hasUpperCaseAndLowerCaseLetters: 'a mixture of both uppercase and lowercase letters',
        hasNumber: 'a mixture of letters and numbers',
        hasSpecialChar: 'inclusion of at least one special character, e.g., ! @ # ? ]',
      },
    },
    firstName: {
      required: 'Please enter your first name',
      pattern: 'Must contain only letters (EN)',
    },
    lastName: {
      required: 'Please enter your last name',
      pattern: 'Must contain only letters (EN)',
    },
    dateOfBirth: {
      required: 'Please enter your date of birth',
      validDate: 'The date is invalid',
    },
    gender: {
      required: 'Please enter your gender',
    },
    countryCode: {
      required: 'Please enter your country code',
    },
    phoneNumber: {
      required: 'Please enter your phone number',
      pattern: 'The phone number must contain only numbers',
    },
    citizenship: {
      required: 'Please enter your citizenship',
    },
  },
  cardCreationForm: {
    title: {
      required: 'Please enter a title',
      minLength: 'The title is too short',
      maxLength: 'The title is too long',
    },
    description: {
      maxLength: 'The description is too long',
    },
    imageLink: {
      required: 'Please enter a link to the image',
      validUrl: 'The image link is invalid',
    },
    videoLink: {
      required: 'Please enter a link to the video',
      validUrl: 'The video link is invalid',
    },
    creationDate: {
      required: 'Please enter a creation date',
      validDate: 'The date is invalid',
    },
  },
  passengersForm: {
    firstName: {
      pattern: 'Must contain only letters (EN)',
    },
    age: {
      adultAge: 'Adult must be more than 14 YRS',
      childAge: 'Child must be from 2 to 14 YRS',
      infantAge: 'Infant must be from 0 to 2 YRS',
    },
  },
};
