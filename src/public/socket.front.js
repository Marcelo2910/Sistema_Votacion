//Referencias a cosas del HTML
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtSesion = document.querySelector('#txtSesion')
const btnSesion = document.querySelector('#btnSesion')
const contenido = document.querySelector('#contenido')
const btnSiguiente = document.querySelector('#btnSiguiente')
const btnVotar = document.querySelector('#btnVotar')
const btnFavor = document.querySelector('#btnFavor')
const btnContra = document.querySelector('#btnContra')
const btnAbstinencia = document.querySelector('#btnAbstinencia')
const tiempoRestante = document.querySelector('#tiempoRestante')

const tiempo = 5
tiempoRestante.innerText = tiempo

const socket = io()
let estadoBotones = 'none'
btnFavor.style.display = estadoBotones
btnContra.style.display = estadoBotones
btnAbstinencia.style.display = estadoBotones
tiempoRestante.style.display = estadoBotones
export const estatus_socket = () => {
    socket.on('connect', () => {
        console.log('Conectado')

        lblOnline.style.display = ''
        lblOffline.style.display = 'none'
    })

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor')

        lblOnline.style.display = 'none'
        lblOffline.style.display = ''

    })
}

export const sesionActual = () => {
    var orden_dia

    btnSesion.addEventListener('click', () => {
        const id = txtSesion.value
        socket.emit('id-sesion', id)
    })

    socket.on('temasSesion', (payload) => {
        orden_dia = payload
        let numero_orden = 0
        contenido.innerText = orden_dia[numero_orden]
        numero_orden = 1
        btnSiguiente.addEventListener('click', () =>{
            socket.emit('tema-siguiente', numero_orden)
            numero_orden++
        })
        
    })

    socket.on('siguiente-tema', (payload) => {
        contenido.innerText = payload
    })

    btnVotar.addEventListener('click', () => {
        socket.emit('activar-botones',estadoBotones)
        socket.emit('actializarTiempo',tiempoRestante.innerText)
        console.log(tiempoRestante.innerText) 
    })

    socket.on('activados',(payload) =>{
        if(payload == 'activar'){
            estadoBotones = ''
            btnFavor.style.display = estadoBotones
            btnContra.style.display = estadoBotones
            btnAbstinencia.style.display = estadoBotones
            tiempoRestante.style.display = estadoBotones
        }
        if(payload == 'desactivar'){
            estadoBotones = 'none'
            btnFavor.style.display = estadoBotones
            btnContra.style.display = estadoBotones
            btnAbstinencia.style.display = estadoBotones
            tiempoRestante. innerText = tiempo
            tiempoRestante.style.display = estadoBotones
        }
    })

    const agregar_voto = async (tipo_voto,contenido)=>{
        const voto = {tipo_voto,contenido}
        socket.emit('agregar-voto', voto)
    }

    btnFavor.addEventListener('click', () => {
        agregar_voto('favor',contenido.innerText)
    })

    btnContra.addEventListener('click', () => {
        agregar_voto('contra',contenido.innerText)
    })

    btnAbstinencia.addEventListener('click', () => {
        agregar_voto('abstinencia',contenido.innerText)
    })

    socket.on('valor-timer', (payload) =>{
        
        if(payload == 0){
            tiempoRestante.innerText = "Tiempo terminado"
            
            socket.emit('desactivar-botones',"")

        }else{
            tiempoRestante.innerText = payload
            socket.emit('actializarTiempo',tiempoRestante.innerText)
        }
    })
    
}
