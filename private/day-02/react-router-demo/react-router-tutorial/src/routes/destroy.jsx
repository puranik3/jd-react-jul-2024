import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

export const action = async ({ params }) => {
    // throw new Error('Error deleting contact');
    await deleteContact(params.contactId);
    return redirect('/');
}