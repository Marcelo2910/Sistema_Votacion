import multer from "multer"

const guardado = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './static/imagenes')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.slice(file.originalname.lastIndexOf('.'))
        cb(null, Date.now() + extension)
    }
})

const filtroArchivos = ( req ,  file ,  cb ) => {
    let tipo = file.mimetype.split("/")[1]
    if(tipo === "png" || tipo === "jpg" || tipo === "jpeg"){
        cb ( null ,  true )
    }else{
        cb ( new  Error ( 'No es una imagen valida' ) )
    }
}

export const upload = multer({ 
    storage: guardado,
    fileFilter: filtroArchivos,
})
