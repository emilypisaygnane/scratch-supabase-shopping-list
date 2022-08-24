
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

    const newItem = await addItem(item, quantity);
    itemsArr.push(newItem);

    await displayItems();

    form.reset();

});

async function displayItems() {
    listContainer.textContent = '';

    itemsArr = await getItems();

    for (let item of itemsArr) {
        const renderedItem = renderItems(item);
        renderedItem.addEventListener('click', async () => {
            await boughtItem(item.id);

            if (item.bought === true) {
                renderedItem.classList.add('bought');
            }

            displayItems();

        });

        listContainer.append(renderedItem);
    }

    displayDeleteButton();

}

function displayDeleteButton() {
    if (itemsArr.length > 0) {
        deleteButton.classList.add('delete');
        deleteButton.classList.remove('hidden');
    } else if (itemsArr.length === 0) {
        deleteButton.classList.add('hidden');
    }

}
deleteButton.addEventListener('click', async () => {
    await deleteItems();
    itemsArr = [];
    displayItems();

});

displayItems();
displayDeleteButton();