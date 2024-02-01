export const nextPrevButtonDesign = (action) => {

    switch (action) {
        case "Prev":
                return "prevButtonDesign";
            break;

        case "Next":
                return "nextButtonDesign";
            break;
        
        case "Submit":
                return "submitButtonDesign";
            break;

        case "Wait":
                return "waitButtonDesign ";
            break;
    
        default:
            break;
    }
};