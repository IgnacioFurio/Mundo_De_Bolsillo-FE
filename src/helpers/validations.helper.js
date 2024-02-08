export const validate = ( input, data, required ) => {
    switch (input) {
        case "title":
            
            if (data === "" && required === true) {
                return {message: "Es imprescindible darle un nombre para poder seguir." , valid: false}
            } else if (!/^[\p{L}\p{N}\s\p{P}]{3,30}$/u.test(data)) {
                return {message: "Este campo debe contener entre 3 y 30 caracteres alfanuméricos.", valid: false}
            }

            return {message: "Parece que lo tienes, ¿Continuamos?", valid: true}
            break;
        
        case "description":
            
            if (data === "" && required === true) {
                return {message: "Deberías escribir algo para continuar." , valid: false}
            } else if (!/^[\p{L}\p{N}\s\p{P}]{0,500}$/u.test(data)) {
                return {message: "Lo sentimos pero solo puedes escribir hasta 500 caracteres.", valid: false}
            }

            return {message: "No se si es una locura o una genialidad, pero por ahora es momento de dar un paso más.", valid: true}
            break;
    
        default:
            break;
    }
};

export const showNext  = (object, counter) => {
    let values = Object.values(object)

    if(values[counter] === true) {
        return true;
    };

    return false;
};