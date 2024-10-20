let counter = 0;

function createElement(tag, id, className, innerHTML) {
  const element = document.createElement(tag);
  if (id) element.id = id;
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

function addElement() {
  counter++;
  const newDiv = createElement("div", 'row_' + counter, 'row');

  const newInput1 = createElement("input", 'col_1_' + counter);
  newDiv.appendChild(newInput1);

  const newInput2 = createElement("input", 'col_2_' + counter);
  newDiv.appendChild(newInput2);

  const newButtonUp = createElement("button", 'btn_up_' + counter, 'button', "&#8593;");
  newButtonUp.addEventListener('click', () => buttonsClick('btn_up', newDiv.id));
  newDiv.appendChild(newButtonUp);

  const newButtonDown = createElement("button", 'btn_down_' + counter, 'button', "&#8595;");
  newButtonDown.addEventListener('click', () => buttonsClick('btn_down', newDiv.id));
  newDiv.appendChild(newButtonDown);

  const newButtonDel = createElement("button", 'btn_delete_' + counter, 'button', "&#10006;");
  newButtonDel.addEventListener('click', () => buttonsClick('btn_delete', newDiv.id));
  newDiv.appendChild(newButtonDel);

  newDiv.style.display = 'flex';
  newDiv.style.flexDirection = 'row';
  newDiv.style.gap = '0';

  const parent = document.getElementsByClassName('table')[0];
  parent.appendChild(newDiv);
}

addElement();

function deleteElement(id) {
  row = document.getElementById(id);
  row.remove();
}

function rowUp(id) {
  const row = document.getElementById(id);
  const previousRow = row.previousElementSibling;

  if (previousRow) {
    row.parentNode.insertBefore(row, previousRow);
  }
}

function rowDown(id) {
  const row = document.getElementById(id);
  const nextRow = row.nextElementSibling;

  if (nextRow) {
    row.parentNode.insertBefore(nextRow, row);
  }
}

const buttonAdd = document.getElementById('btn_add');
buttonAdd.addEventListener('click', () => {
    addElement();
});
const buttonSave = document.getElementById('btn_save');
buttonSave.addEventListener('click', () => {
    allSave();
});

function allSave() {
  const rows = document.querySelectorAll('.row');
  const result = {};

  rows.forEach(row => {
    const key = row.querySelector('input[id^="col_1_"]').value || 'Unnamed';
    const value = row.querySelector('input[id^="col_2_"]').value || '';
    result[key] = value;
  });

  const resultText = JSON.stringify(result);
  document.getElementById('textAfterSave').innerText = resultText;
}

function buttonsClick(btn_id, el_id) {
    switch (btn_id) {
        case 'btn_up':
            rowUp(el_id);
            break;
        case 'btn_down':
            rowDown(el_id);
            break;
        case 'btn_delete':
            deleteElement(el_id)
            break;
        default:
            console.log('error');
    }
}
