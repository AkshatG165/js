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

export { Meal, Workout };
