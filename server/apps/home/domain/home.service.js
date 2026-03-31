import { dataAccessModule } from "../data-access/home.repository.js";

 export const data = await dataAccessModule.findAll();


// console.log(data);