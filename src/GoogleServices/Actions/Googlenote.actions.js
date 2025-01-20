export const addGoogleNote = (data) => {
    return {
        type: 'ADD_GOOGLE_NOTE',
        payload: data
    };
};
export const GoogleNoteBook = (data) => {
    return {
        type: "NOTE_GOOGLE_BOOK",
        payload: data
    }
}
export const GoogledeleteNote = (id) => {
    return {
        type: "DELETE_GOOGLE_NOTE",
        payload: id
    }
}
