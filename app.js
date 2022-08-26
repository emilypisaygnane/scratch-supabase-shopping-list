
import { 
    checkAuth, 
    signOutUser,
    addItem,
    getItems,
    boughtItem,
    deleteItems
} from './fetch-utils.js';

import { renderItems } from './render-utils.js';

checkAuth();

const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);

const form = document.querySelector('.add-grocery-form');
const deleteButton = document.querySelector('.delete');
const listContainer = document.querySelector('.list');

let itemsArr = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');

    const thing = await addItem(item, quantity);
    itemsArr.push(thing);
    displayItems();

    form.reset();

});

// async function handleBought(item) {
//     await boughtItem(item.id);

//     await displayItems();
// }

async function displayItems() {
    listContainer.textContent = '';

    for (let item of itemsArr) {
        const renderItem = renderItems(item);

        renderItem.addEventListener('click', async () => {
            await boughtItem(item.id);

            renderItems.classList.add('item-bought');
        });

        listContainer.append(renderItem);
    }
    displayDeleteButton();

}

window.addEventListener('load', async () => {
    itemsArr = await getItems();
    displayItems();
});

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
    await getItems();
});

displayItems();
displayDeleteButton();