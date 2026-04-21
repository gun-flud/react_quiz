import { dataAccessModule } from "../data-access/home.repository.js";

//  export const data = await dataAccessModule.findAll();

const value = await dataAccessModule.findAll();

export const data = value.quizzes;


// console.log(data);