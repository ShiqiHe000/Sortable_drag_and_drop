const draggables = document.querySelectorAll('.draggable');

const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if(afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
})

function getDragAfterElement(container, mouseY){

    const draggableElements = Array.from(container.querySelectorAll('.draggable:not(.dragging)'));

    const closestElement = draggableElements.reduce((closest, child, index) => {
        const box = child.getBoundingClientRect();
        const offset = mouseY - box.top - box.height / 2;
        if(offset < 0 && offset > closest.offset ) {
            return {offset: offset, element: child};
        } else {
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY});
    return closestElement.element;
}