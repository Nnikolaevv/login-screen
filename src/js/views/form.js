export  function  showInputError(el) {
    const parent = el.parentElement;
    const div = parent.querySelector('.invalid-feedback');
    if (div) return;

    const msg = el.dataset.invalidMessage || 'invalid input';
    const template = errorTemplate(msg);
    el.classList.add('is-invalid');
    parent.insertAdjacentHTML('beforeend', template)

}

export function removeInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector('.invalid-feedback');
    if (!err) return;
    el.classList.remove('is-invalid');
    parent.removeChild(err)
}

    function errorTemplate(msg) {
        return `
        <div class="invalid-feedback">${msg}</div>
         `
    }
