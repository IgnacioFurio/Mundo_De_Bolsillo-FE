export const validate = ( input, data, required ) => {
    switch (input) {
        case "title":
            
            if (data === "" && required === true) {
                return {message: "Es imprescindible darle un nombre para poder seguir." , valid: false}
            } else if (!/^[\p{L}\p{N}]{3,30}$/u.test(data)) {
                return {message: "Este campo debe contener entre 3 y 30 caracteres alfanuméricos.", valid: false}
            }

            return {message: "", valid: true}
            break;
        
        case "description":
            
            if (data === "" && required === true) {
                return {message: "Deberías escribir algo para continuar." , valid: false}
            } else if (!/^[\p{L}\p{N}]{0,500}$/u.test(data)) {
                return {message: "Lo sentimos pero solo puedes escribir hasta 500 caracteres.", valid: false}
            }

            return {message: "", valid: true}
            break;
    
        default:
            break;
    }
};