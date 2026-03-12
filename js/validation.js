function validateForm() {
    let errorsList = []; // array to store error messages
    const errorMsg = document.getElementById("error");

    const formFields = {
        username: {
            value: document.getElementById("fullName").value.trim(),
            maxLength: 20,
            minLength: 5,
        },
        email: {
            value: document.getElementById("emailAddress").value.trim(),
            maxLength: 30,
            minLength: 8,
            regex: /^[a-z]+\.[1-9][0-9]*@osu\.edu$/,
            errorMessage: "Email must match pattern: amayreh.1@osu.edu",
        },
        phone: {
            value: document.getElementById("phoneNumber").value.trim(),
            maxLength: 12,
            minLength: 12,
            regex: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
            errorMessage: "Phone must match pattern: 123-123-1234",
        },
        password: {
            value: document.getElementById("passWord").value.trim(),
            maxLength: 20,
            minLength: 5,
        },
    };

    clearText(errorMsg);

    for (let property in formFields) {
        const value = formFields[property].value;
        const maxLength = formFields[property].maxLength;
        const minLength = formFields[property].minLength;

        validateLength(value, maxLength, minLength, property, errorsList);

        if ("regex" in formFields[property]) {
            validatePattern(
                formFields[property].regex,
                formFields[property].errorMessage,
                value,
                errorsList
            );
        }
    }

    if (errorsList.length > 0) {
        errorMsg.innerHTML = print(errorsList);
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}

function validateLength(value, maxLength, minLength, fieldName, messages) {
    if (value === "") {
        messages.push(fieldName + " is required.");
        return;
    }

    if (value.length > maxLength) {
        messages.push(fieldName + " cannot exceed " + maxLength + " characters.");
    }

    if (value.length < minLength) {
        messages.push(fieldName + " must be at least " + minLength + " characters.");
    }
}

function validatePattern(regex, message, text, array) {
    if (text !== "" && !regex.test(text)) {
        array.push(message);
    }
}

function clearText(htmlElement) {
    htmlElement.innerHTML = "";
    console.clear();
}

print = (array) => {
    let text = "";
    for (let i = 0; i < array.length; i++) {
        text += "<li>" + array[i] + "</li>";
        console.error(array[i]);
    }
    return text;
};