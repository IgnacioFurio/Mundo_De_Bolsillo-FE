export const descriptionSlicer = (description) => {
    let descriptionSliced = description;
    descriptionSliced = descriptionSliced.trim();
    
    //set the max length for the description to 90 characters
    if (description.length > 90) { descriptionSliced = description.slice(0,90) + "..." };
    //add the final dot in case there is no final dot
    if (descriptionSliced.charAt(descriptionSliced.length - 1) !== ".") { descriptionSliced += "." };

    return descriptionSliced
};