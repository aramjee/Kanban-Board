import { ObjectId } from "mongodb";

export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date);
}

export const checkValidDate = (date) => {
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
        throw [400, `ERROR: ${date} must be a valid date string in the format MM/DD/YYYY`];
    }
}

export const checkObjectId = (id, idName) => {
    // idName is included for debugging where the id went wrong.
    if (!id)
        throw [400, `ERROR: ${idName} parameter must be supplied`];
    if (typeof id !== 'string')
        throw [400, `ERROR: ${idName} must be a string`];
    if (id.trim().length === 0)
        throw [400, `ERROR: ${idName} cannot be an empty string or just spaces`];
    id = id.trim();
    if (!ObjectId.isValid(id)) {
        console.log(id);
        throw [400, `ERROR: ${idName} is not a valid Object ID`];
    }
    return id;
}
