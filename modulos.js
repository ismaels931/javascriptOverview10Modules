import * as todo from './funciones.js';

//import { cadenaMayus } from './funciones.js';
const saludo = todo.cadenaMayus("Hola, cocacola!");
console.log(saludo);

//import {IVAGENERAL, IVAREDUCIDO, IVASUPERREDUCIDO} from './funciones.js';
console.log("Hay tres tipos de IVA: " + todo.IVAGENERAL + ", " + todo.IVAREDUCIDO + ", " + todo.IVASUPERREDUCIDO);