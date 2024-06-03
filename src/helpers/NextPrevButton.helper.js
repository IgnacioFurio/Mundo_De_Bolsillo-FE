export const nextPrevButtonDesign = (action) => {

    switch (action) {
        case "Prev":
                return "prevButtonDesign  bold";
            break;

        case "Next":
                return "nextButtonDesign bold";
            break;
        
        case "Down":
                return "downButtonDesign bold";
            break;
        
        case "Up":
                return "upButtonDesign bold";
            break;
        
        case "Submit":
                return "submitButtonDesign d-flex justify-content-center align-items-center bold";
            break;

        case "Wait":
                return "waitButtonDesign ";
            break;
    
        default:
            break;
    }
};