/**
 * @fileoverview Arquivo central de produtos
 * 
 * Este arquivo simplificado apenas importa os produtos das categorias individuais
 * e os disponibiliza em um formato unificado. Isso mantém a compatibilidade
 * com código existente que depende deste arquivo.
 */

// Importando da pasta de categorias para centralizar os dados
import { Product, getAllProducts } from './categories';

// Reexportando a interface e a função para manter compatibilidade com código existente
export type { Product };

/**
 * Array contendo todos os produtos de todas as categorias
 * Obtido através da função getAllProducts da pasta de categorias
 */
export const products = getAllProducts(); 