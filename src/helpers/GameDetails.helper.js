export const extractWorldId = (arr) => {
    let world_ids = [];
    
    for (let i = 0; i < arr.length; i++) {
        world_ids.push(arr[i].id);
    };
    
    return world_ids;
};