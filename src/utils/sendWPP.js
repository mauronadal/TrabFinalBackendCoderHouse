import twilio from 'twilio';
import { TWILIO_CREDENTIALS } from '../config/index.js';
import { LoggerError, LoggerInfo } from '../config/log4.js';

const client = twilio(
  TWILIO_CREDENTIALS.accountSid,
  TWILIO_CREDENTIALS.authToken
);

const sendOrderWpp = async (newOrder) => {
  const template = newOrder.products
    .map(
      (product) => `
        ------------------
        Cod: ${product.code}
        Nombre: ${product.name}
        Cant: ${product.quantity} uds
        Precio: ${product.price} $
      `
    )
    .join('');

  try {
    await client.messages.create({
      from: TWILIO_CREDENTIALS.from,
      to: TWILIO_CREDENTIALS.to,
      body: `
        Nuevo pedido de ${newOrder.clientEmail}.
        
        Productos:

        ${template}
        ------------------

        Datos de la orden:
        Fecha y hora: ${newOrder.timestamp}
        Dirección de entrega: ${newOrder.clientAddress}
      `,
    });
    LoggerInfo.info('¡WPP enviado con éxito!');
  } catch (error) {
    LoggerError.error(error);
  }
};

export default sendOrderWpp;

