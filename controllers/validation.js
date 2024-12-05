// validation.js

// Validate name and phone number
const validateNameAndPhone = (name, phone) => {
    if (!name || !phone) {
        return { isValid: false, message: "Both name and phone are required" };
    }

    if (typeof phone !== 'string' || phone.length !== 10 || isNaN(Number(phone))) {
        return { isValid: false, message: "Phone number must be a valid 10-digit number" };
    }

    return { isValid: true };
};

// Validate date of birth
const validateDob = (dob) => {
    if (dob && isNaN(Date.parse(dob))) {
        return { isValid: false, message: "Date of birth must be a valid date" };
    }
    return { isValid: true };
};

// Validate class name
const validateClass = (studentClass) => {
    if (studentClass && (typeof studentClass !== 'string' || studentClass.trim() === '')) {
        return { isValid: false, message: "Class must be a non-empty string" };
    }
    return { isValid: true };
};

// Validate feePaid
const validateFeePaid = (feePaid) => {
    if (feePaid !== undefined && typeof feePaid !== 'boolean') {
        return { isValid: false, message: "Fee paid must be a boolean value" };
    }
    return { isValid: true };
};

// Export all validations as a module
module.exports = {
    validateNameAndPhone,
    validateDob,
    validateClass,
    validateFeePaid,
};
