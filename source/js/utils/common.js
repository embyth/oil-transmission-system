import {KeyCode} from '../const.js';

// Блокуємо прокрутку сторінки
export const blockBodyScroll = () => {
  document.body.style.overflowY = `hidden`;
};

// Розблокуємо прокрутку сторінки
export const unblockBodyScroll = () => {
  document.body.style.overflowY = `auto`;
};

// Перевірка на натиснення кнопки ESC
export const isEscKey = (evt) => {
  return evt.keyCode === KeyCode.ESC;
};

// Виділяємо поле вводу
export const highlightInput = (input) => {
  input.classList.add(`data__input--error`);
};

// Знімаємо виділення поля вводу
export const resetHighlightInput = (input) => {
  input.classList.remove(`data__input--error`);
};

// Метод повертає випадкове число в заданому інтервалі
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Метод створює елемент с повідомленням помилки
export const spawnErrorMessage = (message) => {
  const divElement = document.createElement(`div`);
  divElement.style.cssText = `width: 100%; padding: 7px 10px; color: white; background-color: red; text-align: center;`;
  divElement.textContent = message;
  document.body.prepend(divElement);

  setTimeout(() => {
    document.body.firstElementChild.remove();
  }, 5000);
};
