import { createSlice, nanoid } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const contactsSlice = createSlice({
    //namespace
    name: "contacts",
    initialState: {
        initialContacts: [
            { id: "id-1", name: "Jennifer Aniston", number: "459-12-56" },
            { id: "id-2", name: "Angelina Jolie", number: "443-89-12" },
            { id: "id-3", name: "Gal Gadot", number: "645-17-79" },
            { id: "id-4", name: "Scarlett Johansson", number: "227-91-26" },
        ],
    },
    reducers: {
        addContact: {
            reducer: (state, action) => {
                state.initialContacts.push(action.payload);
            },
            //preprocesses the payload before dispatching the action
            prepare: (name, number) => {
                return {
                    payload: {
                        id: nanoid(),
                        name: name.trim(),
                        number: number.trim(),
                    },
                };
            },
        },

        deleteContact: (state, action) => {
            const index = state.initialContacts.findIndex(
                contact => contact.id === action.payload
            );
            state.initialContacts.splice(index, 1);
        },
    },
});

const persistConfig = {
    key: "contacts",
    storage,
};

export const contactsReducer = persistReducer(
    persistConfig,
    contactsSlice.reducer
);

export const { addContact, deleteContact, deleteAllContacts } = contactsSlice.actions;