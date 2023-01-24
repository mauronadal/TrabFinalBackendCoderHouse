import { createTransport } from 'nodemailer';
import { CREDENTIALS_TO_SEND_MAIL } from '../config/index.js';
import { LoggerError, LoggerInfo } from '../config/log4.js';

const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: CREDENTIALS_TO_SEND_MAIL.adminServer,
    pass: CREDENTIALS_TO_SEND_MAIL.password,
  },
});

const sendNewSignupMail = async (newUser) => {
  try {
    const success = await transporter.sendMail({
      from: 'NodeServer Admin',
      to: CREDENTIALS_TO_SEND_MAIL.adminServer,
      subject: 'Nuevo registro de usuario',
      html: `
        <p>Email: ${newUser.email}</p>
        <p>Nombre: ${newUser.fullName}</p>
        <p>Dirección: ${newUser.address}</p>
        <p>Edad: ${newUser.age}</p>
        <p>Teléfono: ${newUser.phone}</p>
      `,
    });
    LoggerInfo.info(success);
  } catch (error) {
    LoggerError.error(error);
  }
};

const sendOrderMail = async (newOrder) => {
  const template = newOrder.products
    .map(
      (product) => `
        <tr><td><img src="${product.thumbnail}" width="40px"></td>
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td></tr>
      `
    )
    .join('');
  try {
    const success = await transporter.sendMail({
      from: 'NodeServer Admin',
      to: CREDENTIALS_TO_SEND_MAIL.adminServer,
      subject: `Nuevo pedido de ${newOrder.clientEmail}`,
      html: `
        <div>
          <h4>Productos:</h4>
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              ${template}
            </tbody>
          </table>
                            
          <h4>Datos de la orden:</h4>
          <ul>
            <li>Fecha y hora: ${newOrder.timestamp}</li>
            <li>Email: ${newOrder.clientEmail}</li>
            <li>Dirección de entrega: ${newOrder.clientAddress}</li>
          </ul>
        </div>`,
    });
    LoggerInfo.info(success);
  } catch (error) {
    LoggerError.error(error);
  }
};

export { sendNewSignupMail, sendOrderMail };
