
import { ViaCepResponse } from "@/interfaces/viacep";


export class ViaCepService {

  private static baseUrl = "https://viacep.com.br/ws";


  public static async getAddressByCep(
    cep: string
  ): Promise<ViaCepResponse | null> {
    try {

      const formattedCep = cep.replace(/\D/g, "");

      if (formattedCep.length !== 8) {
        return null;
      }

      const response = await fetch(`${this.baseUrl}/${formattedCep}/json/`);

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        return null;
      }

      return data;
    } catch (error) {
      throw new Error("Não foi possível obter os dados do CEP.");
    }
  }


  public static formatCep(cep: string): string {
    const digits = cep.replace(/\D/g, "");

    if (digits.length === 8) {
      return `${digits.substring(0, 5)}-${digits.substring(5)}`;
    }

    return cep;
  }

  public static sanitizeCep(cep: string): string {
    return cep.replace(/\D/g, "");
  }
}
