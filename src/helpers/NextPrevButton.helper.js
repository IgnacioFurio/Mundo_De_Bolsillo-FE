export const nextPrevButtonDesign = (action, status) => {
    if (action === "Submit" && status === true) return "submitButtonDesignActive m-3";

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
    
        default:
            break;
    }
};