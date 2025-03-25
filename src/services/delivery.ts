
export interface DeliveryInfo {

  deliveryType: "pickup" | "delivery";


  address?: {

    street: string;


    number: string;

    neighborhood: string;


    city: string;


    zipCode: string;


    complement?: string;

 
    reference?: string;


    state: string;
  };
}
