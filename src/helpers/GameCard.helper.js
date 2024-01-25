export const descriptionSlicer = (description) => {
    let descriptionSliced;

    description?.length < 0 ? descriptionSliced = descriptionSliced.trim() : descriptionSliced = "";    
    
    //set the max length for the description to 80 characters
    if (description?.length > 80) { descriptionSliced = description.slice(0,80) + "..." };
    //add the final dot in case there is no final dot
    if (descriptionSliced.charAt(descriptionSliced.length - 1) !== ".") { descriptionSliced += "." };

    console.log(descriptionSliced);
    return descriptionSliced
};