class Storage {
  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', JSON.stringify(calorieLimit));
  }

  static getCalorieLimit() {
    return localStorage.getItem('totalCalories') === null
      ? null
      : parseInt(JSON.parse(localStorage.getItem('calorieLimit')));
  }

  static setTotalCalories(totalCalories) {
    localStorage.setItem('totalCalories', JSON.stringify(totalCalories));
  }

  static getTotalCalories() {
    return localStorage.getItem('totalCalories') === null
      ? null
      : parseInt(JSON.parse(localStorage.getItem('totalCalories')));
  }

  static updateCalories(totalCalories) {
    Storage.setTotalCalories(totalCalories);
  }

  static saveMeal(meals) {
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(meals) {
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static saveWorkout(workouts) {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(workouts) {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static getMeals() {
    return JSON.parse(localStorage.getItem('meals'));
  }

  static getWorkouts() {
    return JSON.parse(localStorage.getItem('workouts'));
  }

  static clearAll() {
    for (let key in localStorage) {
      if (key !== 'calorieLimit') localStorage.removeItem(key);
    }
  }
}

export default Storage;
