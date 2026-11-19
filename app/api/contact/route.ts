import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Verificar que Resend esté configurado
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Servicio de email no configurado. Por favor contacta al administrador.' },
        { status: 500 }
      );
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name, email, phone, company, message, service } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor completa todos los campos requeridos.' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Por favor ingresa un email válido.' },
        { status: 400 }
      );
    }

    // Email que recibirá el mensaje
    // IMPORTANTE: El email debe coincidir con el email registrado en tu cuenta de Resend
    // Para enviar a cualquier email, necesitas verificar tu dominio en resend.com/domains
    const recipientEmail = 'info@fanamillingcenter.com';
    
    // Mapeo de servicios en español
    const serviceNames: Record<string, string> = {
      estructuras: 'Estructuras de Implantes',
      estetica: 'Estética Avanzada',
      suministros: 'Suministros',
      coronas: 'Coronas y Puentes',
      provisional: 'Restauraciones Provisionales',
      otro: 'Otro'
    };

    // Manejar servicio que puede ser string o array de strings
    let serviceName = 'No especificado';
    if (service) {
      if (typeof service === 'string' && service.includes(',')) {
        // Es un string con múltiples servicios separados por comas
        const services = service.split(',').map(s => s.trim());
        serviceName = services.map(s => serviceNames[s] || s).join(', ');
      } else if (typeof service === 'string') {
        // Es un servicio único
        serviceName = serviceNames[service] || service;
      } else {
        // Es un array (aunque no se usa desde el Hero, por si acaso)
        serviceName = String(service);
      }
    }

    // Enviar email a la empresa
    // IMPORTANTE: En modo prueba de Resend, usar el email temporal asignado
    // Una vez verificado el dominio en resend.com/domains, cambiar a 'noreply@fanamillingcenter.com'
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Email temporal de Resend para testing
      to: recipientEmail,
      replyTo: email,
      subject: `Nuevo mensaje de contacto - ${serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Nuevo Mensaje de Contacto
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Clínica/Laboratorio:</strong> ${company}</p>` : ''}
            <p><strong>Servicio de interés:</strong> ${serviceName}</p>
          </div>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #374151;">Mensaje:</h3>
            <p style="background-color: #ffffff; padding: 15px; border-left: 4px solid #2563eb; white-space: pre-wrap;">
              ${message}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de FANA Milling Center.</p>
            <p>Puedes responder directamente a este email para contactar al cliente.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error enviando email:', JSON.stringify(error, null, 2));
      console.error('Detalles del error:', error);
      
      // Mensaje más específico según el tipo de error
      let errorMessage = 'Error al enviar el mensaje. Por favor intenta de nuevo más tarde.';
      
      if (error.message?.includes('not verified')) {
        errorMessage = 'El dominio no está verificado en Resend. Por favor verifica tu dominio en resend.com/domains.';
      } else if (error.message?.includes('only send testing emails')) {
        errorMessage = 'En modo prueba, Resend solo permite enviar a la cuenta registrada. Verifica tu dominio para enviar a otros emails.';
      } else if (error.message) {
        // Mostrar el mensaje real del error
        errorMessage = error.message;
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? JSON.stringify(error, null, 2) : undefined
        },
        { status: 500 }
      );
    }
    
    console.log('Email enviado exitosamente:', data);

    // Opcional: Enviar email de confirmación al cliente
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // Usar dominio temporal de Resend
        to: email,
        subject: 'Gracias por contactarnos - FANA Milling Center',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">¡Gracias por contactarnos!</h2>
            <p>Hola ${name},</p>
            <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
            <p>Nuestro equipo revisará tu consulta y te responderá en un máximo de 24 horas.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Resumen de tu consulta:</strong></p>
              <p>Servicio: ${serviceName}</p>
              <p>Mensaje: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
            </div>
            
            <p>Si tienes alguna pregunta urgente, puedes contactarnos directamente:</p>
            <ul>
              <li>Email: info@fanamillingcenter.com</li>
              <li>Teléfono: +1 (786) 881-7017</li>
            </ul>
            
            <p>Saludos,<br>El equipo de FANA Milling Center</p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente. Te contactaremos pronto.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta más tarde.' },
      { status: 500 }
    );
  }
}

