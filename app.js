
import { 
    checkAuth, 
    signOutUser,
    addItem,
    getItems,
    boughtItem,
    deleteItem
} from './fetch-utils.js';

checkAuth();

const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);'

const form = document.querySelector('add-grocery-form');
const deleteButton = document.querySelector('delete');
const listContainer = document.querySelector('.list');

let itemsArr = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');

    const newItem = await 
})