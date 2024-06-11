export const descriptionSlicer = (description, textLength) => {
    let descriptionSliced;
    
    description.length > 0 ? descriptionSliced = description.trim() : descriptionSliced = "";    
    
    //set the max length for the description to 80 characters
    if (description.length > textLength) { descriptionSliced = description.slice(0,textLength) + "..." };
    //add the final dot in case there is no final dot
    if (descriptionSliced.charAt(descriptionSliced.length - 1) !== "." && descriptionSliced !== "") { descriptionSliced += "." };

    return descriptionSliced
};