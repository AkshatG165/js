import Storage from './Storage.js';

class CalorieTracker {
  #claorieLimit;
  #totalCalories;
  #meals;
  #workouts;

  constructor() {
    this.#claorieLimit =
      Storage.getCalorieLimit() === null ? 0 : Storage.getCalorieLimit();
    this.#totalCalories =
      Storage.getTotalCalories() === null ? 0 : Storage.getTotalCalories();
    this.#meals = [];
    this.#workouts = [];
    this.#renderStats();
  }

  #displayCaloriesTotal() {
    const calorieTotal = document.querySelector('#calories-total');
    calorieTotal.innerText = this.#totalCalories;
  }

  #displayCaloriesLimit() {
    const calorieLimit = document.querySelector('#calories-limit');
    calorieLimit.innerText = this.#claorieLimit;
  }

  #displayCaloriesConsumed() {
    const calorieConsumed = document.querySelector('#calories-consumed');
    let consumed = 0;
    if (this.#meals.length !== 0) {
      this.#meals.forEach((meal) => (consumed += meal.calories));
    }
    calorieConsumed.innerText = consumed;
  }

  #displayCaloriesBurned() {
    const calorieBurned = document.querySelector('#calories-burned');
    let burned = 0;
    if (this.#workouts.length !== 0) {
      this.#workouts.forEach((workout) => (burned += workout.calories));
    }
    calorieBurned.innerText = burned;
  }

  #displayCaloriesRemaining() {
    const calorieRemaining = document.querySelector('#calories-remaining');
    calorieRemaining.innerText = this.#claorieLimit - this.#totalCalories;
  }

  #displayCaloriesProgress() {
    const progressPercentage =
      this.#claorieLimit === 0
        ? 0
        : (this.#totalCalories / this.#claorieLimit) * 100;
    const calorieProgress = document.querySelector('#calorie-progress');

    if (progressPercentage <= 100 || this.#claorieLimit === 0) {
      calorieProgress.setAttribute('style', `width: ${progressPercentage}%`);
      calorieProgress.innerText = `${progressPercentage}%`;
      calorieProgress.classList.remove('bg-danger');
      document.querySelector(
        '.stats'
      ).lastElementChild.lastElementChild.lastElementChild.className =
        'card bg-light';
    } else {
      calorieProgress.setAttribute('style', 'width: 100%');
      calorieProgress.innerText = '100';
      calorieProgress.classList.add('bg-danger');
      document.querySelector(
        '.stats'
      ).lastElementChild.lastElementChild.lastElementChild.className =
        'card bg-danger';
    }
  }

  #displayNewMeal() {
    const mealItems = document.querySelector('#meal-items');
    mealItems.innerHTML = '';
    if (this.#meals.length === 0) return;
    this.#meals.forEach((meal) => {
      const div = document.createElement('div');
      div.className = 'card my-2';

      div.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                    ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                </div>
            </div>
          `;
      mealItems.appendChild(div);
    });
  }

  #displayNewWorkout() {
    const workoutItems = document.querySelector('#workout-items');
    workoutItems.innerHTML = '';
    if (this.#workouts.length === 0) return;
    this.#workouts.forEach((workout) => {
      const div = document.createElement('div');
      div.className = 'card my-2';

      div.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workout.name}</h4>
                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                    ${workout.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                </div>
            </div>
          `;
      workoutItems.appendChild(div);
    });
  }

  #renderStats() {
    this.#displayCaloriesTotal();
    this.#displayCaloriesLimit();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#displayCaloriesProgress();
    this.#displayNewMeal();
    this.#displayNewWorkout();
  }

  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
    Storage.updateCalories(this.#totalCalories);
    Storage.saveMeal(this.#meals);
    this.#renderStats();
  }

  removeMeal(name) {
    this.#meals = this.#meals.filter(
      (meal) => meal.name.toLowerCase() !== name.toLowerCase()
    );

    this.#totalCalories = 0;
    this.#meals.forEach((meal) => (this.#totalCalories += meal.calories));
    if (this.#workouts.length !== 0) {
      this.#workouts.forEach(
        (workout) => (this.#totalCalories -= workout.calories)
      );
    }
    Storage.updateCalories(this.#totalCalories);
    Storage.removeMeal(this.#meals);
    this.#renderStats();
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
    Storage.updateCalories(this.#totalCalories);
    Storage.saveWorkout(this.#workouts);
    this.#renderStats();
  }

  removeWorkout(name) {
    this.#workouts = this.#workouts.filter(
      (workout) => workout.name.toLowerCase() !== name.toLowerCase()
    );

    this.#totalCalories = 0;
    this.#workouts.forEach(
      (workout) => (this.#totalCalories -= workout.calories)
    );
    if (this.#meals.length !== 0) {
      this.#meals.forEach((meal) => (this.#totalCalories += meal.calories));
    }
    Storage.updateCalories(this.#totalCalories);
    Storage.removeWorkout(this.#workouts);
    this.#renderStats();
  }

  resetDay() {
    this.#totalCalories = 0;
    this.#meals = [];
    this.#workouts = [];
    Storage.updateCalories(this.#totalCalories);
    Storage.clearAll();
    this.#renderStats();
  }

  setLimit(calories) {
    this.#claorieLimit = calories;
    Storage.setCalorieLimit(this.#claorieLimit);
    this.#renderStats();
  }

  loadItems() {
    Storage.getMeals() === null
      ? (this.#meals = [])
      : (this.#meals = Storage.getMeals());
    Storage.getWorkouts() === null
      ? (this.#workouts = [])
      : (this.#workouts = Storage.getWorkouts());
    this.#renderStats();
  }
}

export default CalorieTracker;
