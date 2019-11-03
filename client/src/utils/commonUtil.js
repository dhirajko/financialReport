import * as Yup from 'yup';

export const toUpper = (v, prev) => {
  if (v === prev) {
    return v;
  }
  return v.charAt(0).toUpperCase() + v.slice(1);
};

export const urlToList = (url) => {
  if (url) {
    const urlList = url.split('/').filter(i => i);
    return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
  }
};

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const paymentMethodTitle = (paymentCode) => {
  switch (paymentCode) {
    case 'C':
      return 'Cash';

    case 'B':
      return 'Account';

    case 'I':
      return 'Instant Deposit';

    default:
      return null;
  }
};

export const getDate = () => {
  let date = new Date().toLocaleDateString();
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const getTime = () => {
  let time = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  time = time.split(':');
  time = time.join('');
  return time;
};

export const checkKYCFormField = (fieldName, fieldType, props) => {
  if (fieldType === 'text') {
    if (props.includes(fieldName)) {
      return 'form-control is-invalid';
    } else {
      return 'form-control';
    }
  } else if (fieldType === 'select') {
    if (props.includes(fieldName)) {
      return 'custom-select is-invalid';
    } else {
      return 'custom-select';
    }
  } else if (fieldType === 'fileUpload') {
    if (props.includes(fieldName)) {
      return 'mr-4 file-upload-invalid';
    } else {
      return 'mr-4';
    }
  }
};

export const passwordYupVerification = (props) =>{
  if(props.passwordPolicies){
    let numericRegex = RegExp(`^(?=(.*\\d){${parseInt(props.passwordPolicies.minimumNumeric)}}).{${parseInt(props.passwordPolicies.minimumLength)},${parseInt(props.passwordPolicies.maximumLength)}}$`);
    let uppercaseRegex = RegExp(`^(?=.*[A-Z]{${parseInt(props.passwordPolicies.minimumUpperCase)}}).{${parseInt(props.passwordPolicies.minimumLength)},${parseInt(props.passwordPolicies.maximumLength)}}$`);
    let specialRegex = RegExp(`^(?=.*?[#?!@$%^&*-]{${parseInt(props.passwordPolicies.isSpecialCharacterRequired ? 1 : 0)}}).{${parseInt(props.passwordPolicies.minimumLength)},${parseInt(props.passwordPolicies.maximumLength)}}$`);
    return Yup.string()
      .max(parseInt(props.passwordPolicies.maximumLength), `Password must be less than ${props.passwordPolicies.maximumLength} characters`)
      .min(parseInt(props.passwordPolicies.minimumLength), `Password must be more than ${props.passwordPolicies.minimumLength} characters`)
      .matches(numericRegex, `Password must have at least ${props.passwordPolicies.minimumNumeric} numeric characters`)
      .matches(uppercaseRegex, `Password must have at least ${props.passwordPolicies.minimumUpperCase} uppercase character`)
      .matches(specialRegex, 'Password must have at least 1 special character')
      .required('Password is required')
  }else{
    return Yup.string().required('Password is required');
  }

};

export const getBankName = (banks, localBankId) => {

    let bankName = '';
    const bankObj = banks && banks.filter(data => {
      return (localBankId === data.id);
    });
    if (bankObj && bankObj[0] !== undefined) {
      bankName = bankObj[0].bankName;
    }
    return bankName;
};


export const getCountryName = (countries, countryCode) => {
    let countryName = '-';
    const countryObj = countries && countries.filter(data => {
      return (countryCode && countryCode === data.iso2);
    });
    if (countryObj && countryObj[0] !== undefined) {
      countryName = countryObj[0].countryName;
    }
    return countryName;
};

