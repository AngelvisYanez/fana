import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Verificar que Resend esté configurado
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Servicio de email no configurado.' },
        { status: 500 }
      );
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name } = body;

    // Validación básica
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'El nombre es requerido.' },
        { status: 400 }
      );
    }

    // Email de notificación al equipo
    const recipientEmail = 'info@fanamillingcenter.com';
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Email temporal de Resend para testing
      to: recipientEmail,
      subject: '¡ALERTA! Nuevo Cliente Reclamó 40% de Descuento (Revisar WhatsApp)',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #125DA3 0%, #1E2B4F 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #FFFFFF; margin: 0; font-size: 24px;">
              🎁 Nueva Reclamación de Descuento
            </h2>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #125DA3;">
              <p style="margin: 0 0 10px 0; font-size: 16px; color: #374151;">
                <strong style="color: #1E2B4F;">Cliente:</strong> ${name}
              </p>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                <strong>Acción requerida:</strong> El cliente ha reclamado el cupón del 40% de descuento y debería estar contactando por WhatsApp en este momento.
              </p>
            </div>
            
            <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #92400e;">
                <strong>⚠️ Importante:</strong> Revisa WhatsApp inmediatamente. El cliente está esperando tu respuesta para realizar su primera orden con el 40% de descuento.
              </p>
            </div>
            
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #374151;">
                <strong>Información del cupón:</strong>
              </p>
              <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px;">
                <li>Descuento: 40% en toda la primera orden</li>
                <li>Válido sin importar el volumen</li>
                <li>Oferta exclusiva para nuevos clientes</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">Este mensaje fue generado automáticamente cuando el cliente hizo clic en "Reclamar Cupón" en el sitio web.</p>
              <p style="margin: 5px 0 0 0;">Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Miami' })}</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error enviando email:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: 'Error al enviar notificación. Por favor intenta de nuevo.',
          details: process.env.NODE_ENV === 'development' ? JSON.stringify(error, null, 2) : undefined
        },
        { status: 500 }
      );
    }
    
    console.log('Notificación de descuento enviada exitosamente:', data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Notificación enviada correctamente' 
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

