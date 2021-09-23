import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import UI from "./config/ui.config";
import {validate} from "./helpers/validate";
import {showInputError, removeInputError} from "./views/form";
import {login} from "./services/auth.services";
import {notify} from "./views/notification";
import {getNews} from "./services/news.service";
import {registration} from "./services/registration.service";


const {
    form, inputEmail, inputPassword, btnRegistration, btnSignIn, cardLogin, cardRegistration,
    formRegistration, inputEmailReg, inputPasswordReg
} = UI
const inputs = [inputEmail, inputPassword]
const inputsReg = [inputPasswordReg, inputEmailReg]

//Events
form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit();

})

formRegistration.addEventListener('submit', e => {
    e.preventDefault();
    onRegistrationSubmit();
})

btnRegistration.addEventListener('click', () => {
    cardRegistration.classList.remove('d-none');
    cardLogin.classList.add('d-none')
})

btnSignIn.addEventListener('click', () => {
    cardLogin.classList.remove('d-none');
    cardRegistration.classList.add('d-none')
})


inputs.forEach(el => el.addEventListener('focus', () => {
    removeInputError(el);
}))


//Handlers
async function onSubmit() {
    const isValidForm = inputs.every(el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el)
        }
        return isValidInput
    });

    if (!isValidForm) return;

    try {
        await login(inputEmail.value, inputPassword.value);
        await getNews()
        notify({msg: 'Login success', className: 'alert-success'})
        form.reset();
    } catch (err) {
        notify({msg: 'Login failed', className: 'alert-danger'})
        console.log(err)
    }
}


async function onRegistrationSubmit() {
    const isValidForm = inputsReg.every(el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el)
        }
        return isValidInput
    });

    if (!isValidForm) return;

    try {
        const status = await registration(inputEmailReg.value, inputPasswordReg.value);
        if (status.error) {
            notify({msg: 'Registration failed', className: 'alert-warning'})
        } else {
            notify({msg: 'Registration success', className: 'alert-success'})
        }
        form.reset();
    } catch (err) {
        console.log(err)
        notify({msg: 'Registration failed', className: 'alert-warning'})
    }

}

