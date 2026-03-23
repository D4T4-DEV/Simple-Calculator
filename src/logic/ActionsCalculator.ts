export class ActionsCalculator {
  constructor() {}

  /** Suma dos numeros
   * @param {number} numeroUno
   * @param {number} numeroDos
   * @returns {number}
   */
  sumar(numeroUno: number, numeroDos: number): number {
    return numeroUno + numeroDos;
  }

  /** Resta dos numeros
   * @param {number} numeroUno
   * @param {number} numeroDos
   * @returns {number}
   */
  restar(numeroUno: number, numeroDos: number): number {
    return numeroUno - numeroDos;
  }

  /** Multiplica dos numeros
   * @param {number} numeroUno
   * @param {number} numeroDos
   * @returns {number}
   */
  multiplicar(numeroUno: number, numeroDos: number): number {
    return numeroUno * numeroDos;
  }

  /** Divide dos numeros con validación de division
   * @param {number} numeroUno
   * @param {number} numeroDos
   * @returns {number}
   */
  dividir(numeroUno: number, numeroDos: number): number {
    if (numeroUno === 0 && numeroDos === 0) {
      throw new Error("Resultado indefinido");
    }

    if (numeroDos === 0) {
      throw new Error("No es posible dividir por cero.");
    }

    return numeroUno / numeroDos;
  }

  /** Exponente de un numero
   * @param {number} numero
   * @param {number} exponente
   * @returns {number}
   */
  exponente(numero: number, exponente: number): number {
    return numero ** exponente; // -> Equivale a Math.pow(numero, exponente);
  }

  /** Raiz cuadrada de un numero
   * @param {number} numero
   * @returns {number}
   */
  raizCuadrada(numero: number): number {
    if (numero < 0) {
      throw new Error("No se puede calcular la raíz de un número negativo.");
    }
    return Math.sqrt(numero);
  }

  /** Convierte un numero a su valor porcentual (n / 100)
   * @param {number} numero
   * @returns {number}
   */
  porcentajeSimple(numero: number): number {
    return numero / 100;
  }
}
