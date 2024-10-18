import { useState } from "react";
import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { getContacts } from "../../redux/selectors";

export const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const nameChangeEvent = e => {
        setName(e.target.value);
    };
    const numberChangeEvent = e => {
        setNumber(e.target.value);
    }

    const addContactSubmit = e => {
        //prevent the form from submitting upon submit
        e.preventDefault();

        //if name and number is empty, will not submit(return)
        if (name.trim() === "" || number.trim() === "") {
            return;
        }

        //if contact exist, set an alert, will not submit(return) 
        const existingContact = contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase()
        );
        if (existingContact) {
            alert(`${name} is  already in contacts!`);
            return;
        }

        dispatch(addContact(name, number));

        //Reset form fields upon submitting
        setName("");
        setNumber("");
    };

    return (
        <form className={css.form} onSubmit={addContactSubmit}>
            <label className={css.formField}>
                <p className={css.nameLabel}>Name</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de castelmore d'Artagnan."
                    required
                    value={name}
                    onChange={nameChangeEvent}
                />
            </label>

            <label className={css.formField}>
                <p className={css.nameLabel}>Number</p>
                <input type="tel"
                    name="number"
                    placeholder="Number"
                    pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parenthesis and can start with +"
                    required
                    value={number}
                    onChange={numberChangeEvent}
                />
            </label>

            <button className={css.addContactButton} type="submit" >Add Contact</button>
        </form>
    );
};