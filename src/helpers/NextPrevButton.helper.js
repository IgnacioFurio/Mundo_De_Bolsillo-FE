export const nextPrevButtonDesign = (action) => {

    switch (action) {
        case "Prev":
                return "prevButtonDesign m-3";
            break;

        case "Next":
                return "nextButtonDesign m-3"
            break;
        
        case "Submit":
                return "submitButtonDesign m-3"
            break;

        case "Wait":
                return "waitButtonDesign m-3"
            break;
    
        default:
            break;
    }
};