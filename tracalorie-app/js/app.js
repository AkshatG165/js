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
        const progressPercentage = this.#totalCalories/this.#claorieLimit * 100;
        const calorieProgress = document.querySelector('#calorie-progress');

        if(progressPercentage < 100) {
            calorieProgress.setAttribute('style', `width: ${progressPercentage}%`);
            calorieProgress.innerText = `${progressPercentage}%`;
            calorieProgress.classList.remove('bg-danger');
            document.querySelector('.stats').lastElementChild.lastElementChild
            .lastElementChild.className = 'card bg-light';
        }else {
            calorieProgress.setAttribute('style', 'width: 100%');
            calorieProgress.innerText = '100';
            calorieProgress.classList.add('bg-danger');
            document.querySelector('.stats').lastElementChild.lastElementChild
            .lastElementChild.className = 'card bg-danger';
        }
    }

    #displayNewMeal() {}
    #displayNewWorkout() {}
    
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
        const temp = []
        for(let i=0; i < this.#meals.length; i++) {
            this.#meals[i].id !== meal.id?temp.push(this.#meals.pop()):this.#meals.pop()
        }
        
        for(let i=0; i < temp.length; i++) {
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
        const temp = []
        for(let i=0; i < this.#workouts.length; i++) {
            this.#workouts[i].id !== workout.id?temp.push(this.#workouts.pop()):this.#workouts.pop()
        }
        
        for(let i=0; i < temp.length; i++) this.#workouts.push(temp.pop());
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

