function muestraMensajeGood () {
    jSuites.notification({
        name: 'Notificación',
        message: 'Registro Ingresado Correctamente',
    })
}

function muestraMensajeUpdate () {
    jSuites.notification({
        name: 'Notificación',
        message: 'Registro Actualizado Correctamente',
    })
}

function muestraMensajeDeleted () {
    jSuites.notification({
        name: 'Notificación',
        message: 'Registro se Eliminó Correctamente',
    })
}

function muestraMensajeError() {
    jSuites.notification({
        error: 1,
        name: 'Error message',
        message: 'Something went wrong',
    })
}
