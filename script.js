const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const radioGeneral = document.getElementById('general');
const radioSupport = document.getElementById('support');
const nameEl = document.getElementById('first-name')
const lastNameEl = document.getElementById('last-name');
const emailEl = document.getElementById('email')
const messageEl = document.getElementById('message');
const consentEl = document.getElementById('consent');
const errorConsent = document.getElementById('error-consent');
const errorRadio = document.getElementById('error-radio');
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const form = document.getElementById('contact');

radioGeneral.addEventListener('click', function () {
    radio1.classList.add('checked');
    radio2.classList.remove('checked');
});
radioSupport.addEventListener('click', function () {
    radio2.classList.add('checked');
    radio1.classList.remove('checked');
});

const isRequired = value => value === '' ? false : true;

const isEmailValid = email => regex.test(email);

const showError = (input, message) => {
    const formField = input.parentElement;
    input.classList.remove('success');
    input.classList.add('error');
    const error = formField.querySelector('p');
    error.textContent = message;
};
const showSuccess = (input) => {
    const formField = input.parentElement;
    input.classList.remove('error');
    input.classList.add('success');
    const error = formField.querySelector('p');
    error.textContent = '';
};

const checkName = () => {
    let valid = false;
    const name = nameEl.value.trim();
    if (!isRequired(name)) {
        showError(nameEl, 'This field is required');
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};

const checkLast = () => {
    let valid = false;
    const last = lastNameEl.value.trim();
    if (!isRequired(last)) {
        showError(lastNameEl, 'This field is required');
    } else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'This field is required');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Please enter a valid email address');
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkRadio = () => {
    let valid = false;
    if (radioGeneral.checked || radioSupport.checked) {
        errorRadio.textContent = '';
        valid = true;
    } else {
        errorRadio.textContent = 'Please select a query type';
    }
    return valid;
};

const checkMessage = () => {
    let valid = false;
    const message = messageEl.value.trim();
    if (!isRequired(message)) {
        showError(messageEl, 'This field is required');
    } else {
        showSuccess(messageEl);
        valid = true;
    }
    return valid;
};

const checkConsent = () => {
    let valid = false;
    if (consentEl.checked) {
        errorConsent.textContent = '';
        valid = true;
    } else {
        errorConsent.textContent = 'To submit this form, please consent to being contacted';
    }
    return valid;
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isNameValid = checkName(),
        isLastValid = checkLast(),
        isEmailValid = checkEmail(),
        isRadioValid = checkRadio(),
        isMessageValid = checkMessage(),
        isConsentValid = checkConsent();
    let isFormValid = isNameValid &&
        isLastValid && isEmailValid &&
        isRadioValid && isMessageValid &&
        isConsentValid;

    if (isFormValid) {
        confirm();
        setTimeout(function() { window.location.reload();}, 2200);
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'first-name':
            checkName();
            break;
        case 'last-name':
            checkLast();
            break;
        case 'email':
            checkEmail();
            break;
        case 'general':
            checkRadio();
            break;
        case 'support':
            checkRadio();
            break;
        case 'message':
            checkMessage();
            break;
        case 'consent':
            checkConsent();
            break;
    }
}));

function confirm() {
    let popup = document.getElementById('popAlert');
    popup.classList.toggle('active');
    setTimeout(function() { popup.classList.remove('active');}, 2000);
}
