/**
 * Módulo TypeScript - Exercício Módulo 26
 * Aluno: Omar Mohamad Abou Ghoche
 */

/**
 * Função de multiplicação: recebe dois números e retorna a multiplicação deles.
 * @param a - Primeiro número
 * @param b - Segundo número
 * @returns O produto de a e b
 */
function multiplicar(a: number, b: number): number {
    return a * b;
}

/**
 * Função de saudação: recebe um nome e retorna a saudação concatenada.
 * @param nome - Nome da pessoa a ser saudada
 * @returns A string "Olá " + nome
 */
function saudar(nome: string): string {
    return "Olá " + nome;
}

// Testes simples (opcional, para validação local)
console.log(multiplicar(5, 10)); // Esperado: 50
console.log(saudar("Omar"));    // Esperado: Olá Omar
