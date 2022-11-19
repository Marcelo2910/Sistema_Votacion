import Votacion from './models/Votacion.js'
import Asistencia from './models/Asistencia.js'
import Temas from './models/Temas.js'

export default async (io) => {
    io.on('connection', (socket) => {
        console.log('Cliente conectado')
        let contenido
        socket.on('id-sesion', async (payload) =>{
            if(payload != ""){
                const temasSesion = await Temas.find({sesion: payload }).sort('fecha_sesion')
                
                contenido = temasSesion.map(function(elemento){
                    return elemento.temaDescripcion
                })
                io.emit('temasSesion', contenido)
            }
        })
        
        socket.on('tema-siguiente', async(payload) =>{
            if(payload >= contenido.length){
                io.emit('siguiente-tema','No hay mas temas')
            }else{
                io.emit('siguiente-tema',contenido[payload])
            }
            
        })

        socket.on('activar-botones', async(payload)=>{
            if(payload == 'none'){
                io.emit('activados', 'activar')
            }
            else{
                console.log('No se pudieron activar los botones')
            }

        })

        socket.on('asistencia', async (data) => {
            const checaAsistencia = new Asistencia({
                tema:data.tema,
                usuario: data.usuario,
                asistencia: true
            })
            const asistenciaUsuario = await checaAsistencia.save()
            socket.emit('checaAsistencia', asistenciaUsuario)
        })

        socket.on('agregar-voto', async (voto)=> {
            const {tipo_voto,contenido} = voto
            
            const id_tema = await Temas.find({temaDescripcion: contenido})
            const id = id_tema.map(function(elemento){
                return elemento._id
            })
            const nuevaVotacion = await new Votacion({
                tema:id,
                tipo_voto: tipo_voto
            })
            
            const votacionRealizada = await nuevaVotacion.save() 
            
            socket.emit('votoRealizado', votacionRealizada)

        })

        socket.on('disconnect', () => {
            console.log('Cliente desconectado')
        })

    })
}