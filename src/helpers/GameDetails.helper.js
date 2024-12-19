export const extractId = (arr) => {
    let arr_ids = [];
    
    for (let i = 0; i < arr.length; i++) {
        arr_ids.push(arr[i].id);
    };
    
    return arr_ids;
};