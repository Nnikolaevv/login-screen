function getContainer() {
    return document.querySelector('.notify-container');
}

export function notify({msg = 'info msg', className = 'alert-info', timeout = 2000} = {}) {
    if (!getContainer()) {
        createNotifyContainer()
    }
    const index = getAlertIndex()
    const template = alertTemplate(msg, className, index)
    const container = getContainer();
    container.insertAdjacentHTML('beforeend', template);

    setTimeout(() => closeNotify(index), timeout)
}

function createNotifyContainer() {
    const template = notifyContainerTemplate();
    document.body.insertAdjacentHTML('afterbegin', template);
}

function notifyContainerTemplate() {
    return `
    <div class="notify-container" style="position: fixed; top: 10px; right: 10px; z-index: 99"></div>
    `
}

function alertTemplate(msg, className, index) {
    return `
    <div class="alert ${className}" data-index="${index}">${msg}</div>
    `
}

function getAlertIndex() {
    return document.querySelectorAll('.notify-container .alert').length
}

export function closeNotify(index) {
    let alert;
    if (index === undefined) {
        alert = document.querySelector('.notify-container .alert');
    } else {
        alert = document.querySelector(`.notify-container .alert[data-index="${index}"]`)
    }

    if (!alert) {
        console.warn('Alert not found');
        return
    }
    const container = getContainer();
    container.removeChild(alert);
}