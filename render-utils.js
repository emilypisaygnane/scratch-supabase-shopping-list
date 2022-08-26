export function renderItems(item) {
    const div = document.createElement('div');
    const itemP = document.createElement('p');
    const quantityP = document.createElement('p');

    itemP.textContent = item.item;
    quantityP.textContent = `(${item.quantity})`;

    if (item.bought === true) {
        div.classList.add('item-bought');
    } else {
        itemP.classList.add('list-item');
    }

    div.append(itemP, quantityP);

    return div;
}