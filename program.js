console.log("El programa ideal tiene una estructura clara. Estructurar y preservar la estructura es una buena práctica cuando se escribe");
console.log("un programa. Los módulos nos ayudan a seguir esta práctica. Un módulo es una pieza de programa que especifica en qué otras");
console.log("piezas se basa y qué funcionalidad proporciona para que usen otros módulos (su interfaz). Las interfaces de un módulo tienen");
console.log("mucho en común con las interfaces de objeto. Hacen que parte del módulo esté disponible para el mundo exterior y mantienen el");
console.log("resto privado. Al restringir las formas en que los módulos interactúan entre sí, el sistema se parece más a un LEGO, donde");
console.log("las piezas interactúan a través de conectores bien definidos, y menos como el barro, donde todo se mezcla con todo.")

console.log();

console.log("Las relaciones entre módulos se denominan dependencias. Cuando un módulo necesita una pieza de otro módulo, se dice que");
console.log("depende de ese módulo. Cuando este hecho se especifica claramente en el propio módulo, se puede utilizar para averiguar qué");
console.log("otros módulos deben estar presentes para poder utilizar un módulo determinado y cargar dependencias automáticamente. Para");
console.log("separar módulos de esa manera, cada uno necesita su propio ámbito privado. Simplemente poniendo código JS en diferentes");
console.log("archivos no satisface estos requisitos. Los archivos aún comparten el mismo espacio de nombres global. Pueden, de forma");
console.log("intencionada o accidental, interferir con las uniones de los demás. Y la estructura de depedencia sigue sin estar clara.");
console.log("Diseñar una estructura de módulos para un programa puede resultar difícil.");

console.log();

console.log("Una de las ventajas de construir un programa a partir de piezas separadas, y poder ejecutar esas piezas por sí mismas, es");
console.log("que es posible que pueda aplicar la misma pieza en diferentes programas e.g. usar una función que se escribió en un programa,");
console.log("en otro programa. No obstante, si se encuentra un error en la función después de haberla copiado en el nuevo programa, y se");
console.log("corrige, también se tiene que corregir en el programa origen, lo que conlleva código duplicado. Ahí es donde entran los");
console.log("paquetes. Un paquete es un fragmento de código que se puede distribuir (copiar e instalar). Puede contener uno o más módulos");
console.log("y tiene información sobre los paquetes de los que depende. Un paquete también suele venir con documentación que explica como");
console.log("usarlo. Cuando se encuentra un problema en un paquete o se agrega una nueva característica, el paquete se actualiza. Entonces");
console.log("los programas que dependen de él (que también pueden ser paquetes) pueden actualizarse a la nueva versión. Trabajar de esta");
console.log("manear requiere una infraestructura. Necesitamos un lugar para almacenar y donde encontrar paquetes y una forma conveniente de");
console.log("instalarlos y actualizarlos. En el mundo JS, esta infraestructura la proporciona NPM (https://npmjs.org).");

console.log();

console.log("NPM es un servicio en línea donde se pueden descargar y cargar paquetes y un programa (incluido con Node.js) que lo ayuda");
console.log("a instalarlos y administrarlos. Hay más de medio millón de paquetes disponibles. Por eso es conveniente, antes de escribir");
console.log("un programa, buscar un paquete que ya implemente dicho programa para no reinventar la rueda e.g. el programa analizador de");
console.log("archivos INI del capítulo anterior, esta disponible en NPM con el nombre de paquete ini. Cuando se usan paquetes de terceros");
console.log("es importante conocer sus licencias: https://eloquentjavascript.net/code/packages_chapter_10.js");

console.log();

console.log("Hasta 2015, JS no tenía un sistema de módulos incorporado. Sin embargo, la gente acabo diseñando sus propios sistemas de");
console.log("módulos además del lenguaje. Podemos usar funciones JS para crear ámbitos, y objetos locales para representar interfaces");
console.log("de módulo. El código de abajo, es un módulo que funciona de forma similar al método getDay de la clase Date.");

const weekDay = function() {
	const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return {
		name(number) { return names[number]; },
		number(name) { return names.indexOf(name); }
	};
}();

console.log(weekDay.name(weekDay.number("Friday")));

console.log();

console.log("Este estilo de módulo proporciona aislamiento, hasta cierto punto, pero no declara dependencias. En cambio, simplemente");
console.log("coloca su interfaz en el ámbito global y espera que sus dependencias, si las hay, hagan lo mismo. Hace tiempo, este fue");
console.log("el enfoque principal en la programación web, pero ahora está casi obsoleto. Si queremos que las relaciones de dependencia");
console.log("formen parte del código, tendremos que tomar el control de la carga de dependencias. Hacer esto requiere poder ejecutar");
console.log("cadenas como código.");

console.log();

console.log("Hay varias formas de tomar datos (una cadena de código) y ejecutarlos como parte del programa actual. La forma más obvia");
console.log("es el operador especial eval, que ejecutará una cadena en el ámbito actual. Esto suele ser una mala idea porque rompe algunas");
console.log("de las propiedades que tienen los ámbitos, como que es fácilmente predecible a qué vinculación se refiere un nombre dado e.g.");

const x = 1;
function evalAndReturnX(code) {
	eval(code);
	return x;
}

console.log(evalAndReturnX("var x = 2"));
console.log(x);

console.log("Una forma menos aterradora de interpretar datos como código es usar el constructor de funciones. Toma dos argumentos:");
console.log("una cadena que contiene la lista de parámetros y otra cadena que contiene el cuerpo de la función. Envuelve el código");
console.log("en un valor de función para que tenga su propio ámbito y no haga cosas raras con otros ámbitos e.g.");

let plusOne = Function("n", "return n + 1;");
console.log(plusOne(4));

console.log("Esto es precisamente lo que necesitamos para un sistema de módulos. Podemos envolver el código del módulo en una función y");
console.log("usar el ámbito de esta función como ámbito del módulo.");

console.log();

console.log("El enfoque más utilizado para los módulos JS incorporados se llama módulos CommonJS. Node.js lo usa y es el sistema que usan");
console.log("la mayoría de los paquetes en NPM. El concepto principal en los módulos CommonJS es una función llamada require. Cuando se");
console.log("llama a require con el nombre del módulo de una dependencia, se asegura de que el módulo esté cargado y devuelva su interfaz.");

console.log();

console.log("Debido a que el cargador envuelve el código del módulo en una función, los módulos obtienen automáticamente su propio ámbito")
console.log("local. Todo lo que tenemos que hacer es llamar a require para acceder a sus dependencias y poner su interfaz en el objeto");
console.log("vinculado a las exportaciones.");

console.log();

console.log("El módulo de ejemplo proporciona una función de formato de fecha. Utiliza dos paquetes de NPM: ordinal, para convertir");
console.log("números en cadenas como '1st' y '2st', y date-names para obtener los nombres en inglés de los días de la semana y los");
console.log("meses. Exporta una única función, formatDate, que toma un objeto Date y una cadena de plantilla. La cadena de la plantilla");
console.log("puede contener códigos que dirijan el formato, como YYYY para el año y Do, para el día ordinal del mes. Podría darle una");
console.log("cadena como 'MMMM Do YYYY' para obtener un resultado como '22 de noviembre de 2017'.");

/*const ordinal = require("ordinal");
const {days, months} = require("date-names");

exports.formatDate = function(date, format) {
	return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
		if (tag == "YYYY") return date.getFullYear();
		if (tag == "M") return date.getMonth();
		if (tag == "MMMM") return months[date.getMonth()];
		if (tag == "D") return date.getDate();
		if (tag == "Do") return ordinal(date.getDate());
		if (tag == "dddd") return days[date.getDay()];
	});
};*/

console.log("La interfaz ordinal es una función única, mientras que los nombres de fecha exportan un objeto que contiene varias cosas:");
console.log("días y meses, que son arrays de nombres. La desestructuración es muy conveniente al crear enlaces para interfaces");
console.log("importadas (línea 110). El módulo agrega su función de interfaz a las exportaciones (línea 112) para que los módulos que");
console.log("dependen de él tengan acceso a él. Podríamos usar el módulo así:");

/*const {formatDate} = require("./format-date");

console.log(formatDate(new Date(2017, 9, 13), "dddd the Do"));*/

console.log("La forma más minimalista de definir require es la siguiente:");

/*require.cache = Object.create(null);

function require(name) {
	if (!(name in require.cache)) {
		let code = readFile(name);
		let module = {exports: {}};
		require.cache[name] = module;
		let wrapper = Function("require, exports, module", code);
		wrapper(require, module.exports, module);
	}
	return require.cache[name].exports;
}*/

console.log("En el código anterior, readFile es una función inventada que lee un archivo y devuelve su contenido como un string. El JS");
console.log("estándar no proporciona dicha función, pero diferentes entornos JS, como el navegador y Node.js, proporcionan sus propias");
console.log("formas de acceder a los archivos. Para evitar cargar el módulo varias veces, require mantiene un almacén (caché) de los");
console.log("módulos ya cargados. Esto implica leer el código del módulo, envolverlo en una función y llamarlo.");

console.log();

console.log("La interfaz del paquete ordinal que vimos antes no es un objeto sino una función. Una peculiaridad de los módulos");
console.log("CommonJS es que, aunque el sistema del módulo creará un objeto de interfaz vacío (vinculado a las exportaciones),");
console.log("se puede reemplazar con cualquier valor sobreescribiendo module.exports. Esto lo hacen muchos módulos para exportar");
console.log("un solo valor en lugar de un objeto de interfaz.");

console.log();

console.log("Al definir require, export y module como parámetros para la función contenedora generada, el cargador se asegura de que");
console.log("estas vinculaciones estén disponibles en el ámbito del módulo.");

console.log();

console.log("La forma en que la cadena dada a require se traduce a un nombre de archivo real o a una dirección web difiere en los");
console.log("diferentes sistemas e.g. './format-date' se refiere al archivo llamado format-date.js en el mismo directorio. Cuando");
console.log("el nombre no es relativo, Node.js buscará un paquete instalado con ese nombre. En el código de ejemplo de este capítulo,");
console.log("se interpretan dichos nombres de archivos como referencias a paquetes NPM. Ahora en lugar de escribir nuestro propio");
console.log("analizador de archivos INI, podemos usar uno de NPM e.g.");

/*const {parse} = require("ini");
console.log(parse("x = 10\ny = 20"));*/

console.log();

console.log("El sistema de módulos ECMAScript usa una palabra clave para importar módulos, en lugar de llamar a una función (require)");
console.log("para acceder a una dependencia e.g.");

/*import ordinal from "ordinal";
import {days, months} from "date-names";

export function formatDate(date, format) {}*/

console.log("Similarmente, la palabra clave 'export' se usa para exportar cosas. Puede aparacer delante de una función, clase o");
console.log("definición de variable (let, const o var). La interfaz de un módulo ES no es una valor único, sino un conjunto de");
console.log("variables con nombre. El módulo anterior vincula formatDate a una función. Cuando importa desde otro módulo, importa");
console.log("la variable, no el valor, lo que significa que un módulo exportador puede cambiar el valor de la variable en cualquier");
console.log("momento, y los módulos que lo importan verán su nuevo valor.");

console.log();

console.log("Cuando hay una variable llamada 'default', se trata como el valor principal exportado del módulo. Si importamos un");
console.log("módulo como ordinal, en el ejemplo, sin llaves alrededor del nombre de la variable, obtendremos una variable 'default'.");
console.log("Dichos módulos aún pueden exportar otras variables con diferentes nombres junto con su exportación 'default'. Para");
console.log("crear una exportación 'default', se escribe 'export default' antes de una expresión, una declaración de función o");
console.log("una declaración de clase e.g.");

//export default ["Winter", "Spring", "Summer", "Autumn"];

console.log("Es posible renombrar variables importadas usando la palabra 'as' e.g.");

/*import {days as dayNames} from "date-names";
console.log(dayNames.length);*/

console.log("Otra diferencia importante, respecto a CommonJS, es que las importaciones de módulos ES ocurren antes de que el script");
console.log("de un módulo comience a ejecutarse. Esto significa que las declaraciones de importación pueden no aparecer dentro de");
console.log("funciones o bloques, y los nombres de las dependencias deben ser cadenas entre comillas, no expresiones arbitrarias.");

console.log();

console.log("Para mejorar la velocidad de carga de un programa en la web se usan herramientas denominadas agrupadores. Por otro lado,");
console.log("el tamaño del archivo también determina qué tan rápido se puede transferir a través de la red. Por lo tanto, la comunidad");
console.log("JS ha inventado minificadores. Estas herramientas toman un programa JS y lo hacen más pequeño elminando comentarios y los");
console.log("espacios en blanco, cambiando el nombre de las variables y reemplazando partes de código con código equivalente que ocupan");
console.log("menos espacio.");

console.log();

console.log("La estructuración de programas es uno de los aspectos más sutiles de la programación. Cualquier pieza de funcionalidad no");
console.log("trivial se puede modelar de varias maneras. El buen diseño de un programa es subjetivo. Un aspecto del diseño de módulos");
console.log("es la facilidad de uso. Si estamos diseñando algo que está destinado a ser utilizado por varias personas, en un tiempo");
console.log("cuando ya no recordemos lo que hicimos, es útil que su interfaz sea simple y predecible e.g. el paqute ini.");

console.log();

console.log("Otro aspecto útil del diseño de módulos es la facilidad con la que algo se puede componer con otro código. Los módulos");
console.log("enfocados que calculan valores son aplicables en una gama más amplica de programas que los módulos más grandes que");
console.log("realizan acciones complicadas.");

console.log();

console.log("A continuación se muestra el uso del paquete dijkstrajs:");

/*const {find_path} = require("dijkstrajs");

let graph = {};
for (let node of Objetct.keys(roadGraph)) {
	let edges = graph[node] = {};
	for (let dest of roadGraph[node]) edges[dest] = 1;
}

console.log(find_path(graph, "Post Office", "Cabin"));*/

console.log();