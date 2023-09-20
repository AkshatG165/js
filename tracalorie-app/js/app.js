class Meal {
  static counter = 0;

  constructor(name, calories) {
    Meal.counter += 1;
    this.id = 'M' + 1000 + Meal.counter;
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  static counter = 0;

  constructor(name, calories) {
    Workout.counter += 1;
    this.id = 'W' + 1000 + Workout.counter;
    this.name = name;
    this.calories = calories;
  }
}

class CalorieTracker {
  #claorieLimit;
  #totalCalories;
  #meals;
  #workouts;

  constructor() {
    this.#claorieLimit = 2000;
    this.#totalCalories = 0;
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
    this.#meals.forEach((meal) => {
      consumed += meal.calories;
    });
    calorieConsumed.innerText = consumed;
  }

  #displayCaloriesBurned() {
    const calorieBurned = document.querySelector('#calories-burned');
    let burned = 0;
    this.#workouts.forEach((workout) => {
      burned += workout.calories;
    });
    calorieBurned.innerText = burned;
  }

  #displayCaloriesRemaining() {
    const calorieRemaining = document.querySelector('#calories-remaining');
    calorieRemaining.innerText = this.#claorieLimit - this.#totalCalories;
  }

  #displayCaloriesProgress() {
    const progressPercentage = (this.#totalCalories / this.#claorieLimit) * 100;
    const calorieProgress = document.querySelector('#calorie-progress');

    if (progressPercentage < 100) {
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
    this.#meals.forEach((meal) => {
      const div = document.createElement('div');

      div.innerHTML = `
        <div class="card my-2">
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
        </div>
        `;
      mealItems.appendChild(div);
    });
  }

  #displayNewWorkout() {
    const workoutItems = document.querySelector('#workout-items');
    workoutItems.innerHTML = '';
    this.#workouts.forEach((workout) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="card my-2">
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
    this.#renderStats();
  }

  removeMeal(meal) {
    const temp = [];
    for (let i = 0; i < this.#meals.length; i++) {
      this.#meals[i].id !== meal.id
        ? temp.push(this.#meals.pop())
        : this.#meals.pop();
    }

    for (let i = 0; i < temp.length; i++) {
      this.#meals.push(temp.pop());
    }
    this.#renderStats();
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
    this.#renderStats();
  }

  removeWorkout(workout) {
    const temp = [];
    for (let i = 0; i < this.#workouts.length; i++) {
      this.#workouts[i].id !== workout.id
        ? temp.push(this.#workouts.pop())
        : this.#workouts.pop();
    }

    for (let i = 0; i < temp.length; i++) this.#workouts.push(temp.pop());
    this.#renderStats();
  }

  resetDay() {
    this.constructor();
  }

  setLimit(calories) {
    this.#claorieLimit = calories;
  }

  loadItems() {}
}

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
  }

  #newItem(e) {
    e.preventDefault();
    if (e.target.id === 'meal-form') {
      const meal = new Meal(
        e.target.querySelector('#meal-name').value,
        parseInt(e.target.querySelector('#meal-calories').value)
      );
      tracker.addMeal(meal);
    }

    if (e.target.id === 'workout-form') {
      const workout = new Workout(
        e.target.querySelector('#workout-name').value,
        parseInt(e.target.querySelector('#workout-calories').value)
      );
      tracker.addWorkout(workout);
    }

    e.target.reset();
  }

  #removeItem(e) {
    console.log(e);
  }

  #filterItem() {}

  #reset() {}

  #setLimit() {}
}

const app = new App();
const tracker = new CalorieTracker();

// const breakfast = new Meal('breakfast', 2000);
// const running = new Workout('running', 200);
// const fucking = new Workout('fucking', 200);

// const tracker = new CalorieTracker();
// tracker.addMeal(breakfast);
// tracker.addWorkout(running);
// tracker.addWorkout(fucking);
// console.log(tracker);
