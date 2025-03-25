
export interface ViaCepResponse {

  cep: string;


  logradouro: string;


  complemento: string;


  bairro: string;


  localidade: string;


  uf: string;


  ibge: string;


  ddd: string;


  gia: string;


  siafi: string;


  erro?: boolean;
}


export interface ViaCepError {
  erro: boolean;
}
