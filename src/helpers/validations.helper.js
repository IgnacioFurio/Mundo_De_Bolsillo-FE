export const validate = ( input, data, required ) => {
    switch (input) {
        case "title":
        case "name":
            
            if (data === "" && required === true) {
                return {message: "Es imprescindible darle un nombre para poder seguir." , valid: false}
            } else if (!/^[\p{L}\p{N}\s\p{P}]{3,30}$/u.test(data)) {
                return {message: "Este campo debe contener entre 3 y 30 caracteres alfanuméricos.", valid: false}
            }

            return {message: "Parece que lo tienes, ¿Continuamos?", valid: true}
            break;
        
        case "description":
            
            if (!/^[\p{L}\p{N}\s\p{P}]{0,500}$/u.test(data)) {
                return {message: "Lo sentimos pero solo puedes escribir hasta 500 caracteres.", valid: false}
            }

            return {message: "No se si es una locura o una genialidad, pero por ahora es momento de dar un paso más.", valid: true}
            break;
        
        case "type":
            
            if (!/^[\p{L}\p{N}\s\p{P}]{0,30}$/u.test(data)) {
                return {message: "¿Usar mas de 30 letras para etiquetar un lugar no es excesivo?.", valid: false}
            }

            return {message: "Mucho mejor, podemos seguir con el proceso.", valid: true}
            break;            
        
        case "government":
            
            if (!/^[\p{L}\p{N}\s\p{P}]{0,30}$/u.test(data)) {
                return {message: "No hace falta tanta información, con que definas el tipo de gobierno en caso de que haya uno debería de ser suficiente.", valid: false}
            }

            return {message: "Ahora que hay algo de orden podemos continuar.", valid: true}
            break;            
        
        case "population":
            
            if (!/^[\p{L}\p{N}\s\p{P}]{0,100}$/u.test(data)) {
                return {message: "Deberíamos centrarnos en poner una cantidad aproximada y las razas de las criaturas que pueblan el lugar.", valid: false}
            }

            return {message: "Ahora que hay algo de orden podemos continuar.", valid: true}
            break;            
        
        case "defenses":
            
            if (!/^[\p{L}\p{N}\s\p{P}]{0,100}$/u.test(data)) {
                return {message: "Con un resumen de la manera que tienen de defenderse ante un ataque bastaría.", valid: false}
            }

            return {message: "La guardia se ha quedado tranquila ante tú explicación, puedes continuar.", valid: true}
            break; 
                       
        case "commerce":
            
            if (!/^[\p{L}\p{N}\s\p{P}]{0,100}$/u.test(data)) {
                return {message: "Tampoco era necesario hacer una tesis doctoral, comenta por encima en que se basa el sustento de los habitantes y sigue creando.", valid: false}
            }

            return {message: "Sube al barco que zarpamos al próximo puerto.", valid: true}
            break;            
        
        case "about_character_id":
        case "heard_from_character_id":
        case "about_location_id":
        case "heard_on_location_id":
            
            if (data === NaN && required === true) {
                return {message: "Algo nos impide continuar, por favor inténtalo de nuevo más tarde.", valid: false}
            }

            return {message: "Hemos cazado el dato que necesitabamos, proseguimos adelante.", valid: true}
            break;            
        
        default:
            return {message: "Algo no ha salido como esperabamos.", valid: false}
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