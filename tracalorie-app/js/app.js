import { Meal, Workout } from './items.js';
import CalorieTracker from './CalorieTracker.js';

class App {
  constructor() {
    document
      .querySelector('#meal-form')
      .addEventListener('submit', this.#newItem);
    document
      .querySelector('#meal-items')
      .addEventListener('click', this.#removeItem);
    document
      .querySelector('#workout-form')
      .addEventListener('submit', this.#newItem);
    document
      .querySelector('#workout-items')
      .addEventListener('click', this.#removeItem);
    document
      .querySelector('#filter-meals')
      .addEventListener('input', this.#filterItem);
    document
      .querySelector('#filter-workouts')
      .addEventListener('input', this.#filterItem);
    document
      .querySelector('#limit-form')
      .addEventListener('submit', this.#setLimit);
    document
      .querySelector('header div')
      .lastElementChild.addEventListener('click', this.#reset);
  }

  #newItem(e) {
    e.preventDefault();
    if (e.target.id === 'meal-form') {
      if (
        e.target.querySelector('#meal-calories').value === '' ||
        e.target.querySelector('#meal-calories').value <= 0
      ) {
        alert('Please enter a value greater than 0');
        return;
      }

      const meal = new Meal(
        e.target.querySelector('#meal-name').value,
        parseInt(e.target.querySelector('#meal-calories').value)
      );
      tracker.addMeal(meal);
    }

    if (e.target.id === 'workout-form') {
      if (
        e.target.querySelector('#workout-calories').value === '' ||
        e.target.querySelector('#workout-calories').value <= 0
      ) {
        alert('Please enter a value greater than 0');
        return;
      }

      const workout = new Workout(
        e.target.querySelector('#workout-name').value,
        parseInt(e.target.querySelector('#workout-calories').value)
      );
      tracker.addWorkout(workout);
    }
    e.target.reset();
  }

  #removeItem(e) {
    if (e.currentTarget.id === 'meal-items') {
      if (e.target.className.includes('delete')) {
        tracker.removeMeal(
          e.target.parentElement.querySelector('h4').innerText
        );
      }
      if (e.target.parentElement.className.includes('delete')) {
        tracker.removeMeal(
          e.target.parentElement.parentElement.querySelector('h4').innerText
        );
      }
    }

    if (e.currentTarget.id === 'workout-items') {
      if (e.target.className.includes('delete')) {
        tracker.removeWorkout(
          e.target.parentElement.querySelector('h4').innerText
        );
      }
      if (e.target.parentElement.className.includes('delete')) {
        tracker.removeWorkout(
          e.target.parentElement.parentElement.querySelector('h4').innerText
        );
      }
    }
  }

  #filterItem(e) {
    if (e.target.id === 'filter-meals' && e.target.value !== '') {
      document.querySelectorAll('#meal-items .card').forEach((item) => {
        if (
          item.firstElementChild.firstElementChild.firstElementChild.innerText
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    } else {
      document.querySelectorAll('#meal-items .card').forEach((item) => {
        item.classList.remove('hidden');
      });
    }

    if (e.target.id === 'filter-workouts' && e.target.value !== '') {
      document.querySelectorAll('#workout-items .card').forEach((item) => {
        if (
          item.firstElementChild.firstElementChild.firstElementChild.innerText
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    } else {
      document.querySelectorAll('#workout-items .card').forEach((item) => {
        item.classList.remove('hidden');
      });
    }
  }

  #reset() {
    tracker.resetDay();
  }

  #setLimit(e) {
    e.preventDefault();

    if (
      e.target.querySelector('#limit').value === '' ||
      e.target.querySelector('#limit').value <= 0
    ) {
      alert('Please enter a value greater than 0');
      return;
    }
    tracker.setLimit(parseInt(e.target.querySelector('#limit').value));
    document.querySelector('#limit-modal .btn-close').click();
  }
}

const app = new App();
const tracker = new CalorieTracker();
tracker.loadItems();
