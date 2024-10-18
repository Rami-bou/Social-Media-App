function showAlert(messageToShow, type='success') {
    //inject the alert deiv because he's gone when we hide it
    document.getElementById('alert').innerHTML = '<div id="liveAlertPlaceholder" class="fade show"></div>'
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div class="text-center">${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
    }
    appendAlert(messageToShow, type)
    setTimeout(() => {
        const alertToHide = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')
        alertToHide.close()
    },2000)
}