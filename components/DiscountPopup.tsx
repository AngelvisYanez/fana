'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, GiftIcon } from '@heroicons/react/24/outline';
import { scaleIn, fadeIn } from '@/lib/animations';
import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

// Configuración - Número de WhatsApp (formato internacional sin +)
// Número: +1 (786) 881-7017
const WHATSAPP_NUMBER = '17868817017';

// MODO DE PRUEBA: Cambiar a false cuando quieras que solo se muestre una vez por usuario
const TESTING_MODE = false; // true = siempre muestra el pop-up | false = solo una vez por usuario

export default function DiscountPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const t = useTranslations('popup');
    const params = useParams();
    const locale = params.locale as string || 'es';

    useEffect(() => {
        // Marcar como montado en el cliente
        setMounted(true);
    }, []);

    useEffect(() => {
        // Asegurar que se ejecute solo en el cliente y después de montar
        if (!mounted || typeof window === 'undefined') return;

        if (TESTING_MODE) {
            // Modo de prueba: siempre mostrar el pop-up después de 1 segundo (reducido para pruebas)
            console.log('🔍 Modo de prueba activado - Pop-up aparecerá en 1 segundo');
            const timer = setTimeout(() => {
                console.log('✅ Mostrando pop-up');
                setIsVisible(true);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            // Modo producción: verificar si el usuario ya ha visto el pop-up
            const hasSeenPopup = localStorage.getItem('fana_discount_popup_seen');

            // Mostrar después de 2 segundos si no lo ha visto
            if (!hasSeenPopup) {
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 2000);

                return () => clearTimeout(timer);
            }
        }
    }, [mounted]);

    const handleClose = () => {
        setIsVisible(false);
        // Solo guardar en localStorage si NO está en modo de prueba
        if (!TESTING_MODE) {
            localStorage.setItem('fana_discount_popup_seen', 'true');
        }
    };

    const handleAccept = async () => {
        setIsSubmitting(true);

        try {
            // Enviar notificación por email al equipo
            const response = await fetch('/api/discount-claim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: t('clientName'),
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar notificación');
            }

            // Preparar mensaje de WhatsApp
            // Codificar el mensaje correctamente para WhatsApp (funciona en Web y móvil)
            // WhatsApp Web requiere codificación especial de caracteres
            const cleanMessage = t('whatsappMessage').trim();
            // Codificar cada carácter especial correctamente
            const whatsappMessage = encodeURIComponent(cleanMessage);
            // Usar formato estándar de WhatsApp
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

            console.log('URL de WhatsApp:', whatsappUrl);
            console.log('Mensaje codificado:', whatsappMessage);
            console.log('Mensaje original:', t('whatsappMessage'));
            
            // Nota: WhatsApp Web a veces no muestra el mensaje pre-llenado
            // En ese caso, el usuario puede copiar el mensaje manualmente

            // Marcar como visto (solo si NO está en modo de prueba)
            if (!TESTING_MODE) {
                localStorage.setItem('fana_discount_popup_seen', 'true');
            }

            // Abrir WhatsApp con el mensaje pre-llenado
            // El mensaje aparecerá en el campo de texto pero NO se enviará automáticamente
            window.open(whatsappUrl, '_blank');

            // Cerrar pop-up
            setIsVisible(false);
        } catch (err) {
            console.error('Error:', err);
            // Aún así abrir WhatsApp aunque falle el email
            const cleanMessage = t('whatsappMessage').trim();
            const whatsappMessage = encodeURIComponent(cleanMessage);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
            console.log('URL de WhatsApp (fallback):', whatsappUrl);
            window.open(whatsappUrl, '_blank');
            setIsVisible(false);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                    />

                    {/* Pop-up */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, scale: 0.9 }}
                        variants={scaleIn}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative max-w-lg w-full pointer-events-auto rounded-3xl overflow-hidden shadow-2xl" style={{
                            background: 'linear-gradient(135deg, #1E2B4F 0%, #0f1a3a 25%, #125DA3 50%, #0d4a7a 75%, #1E2B4F 100%)'
                        }}>
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20"
                                aria-label={t('close')}
                            >
                                <XMarkIcon className="w-5 h-5 text-white" />
                            </button>

                            {/* Content */}
                            <div className="p-8 sm:p-10 text-white">
                                {/* Gift Icon */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/30"
                                >
                                    <GiftIcon className="w-10 h-10 text-white" />
                                </motion.div>

                                {/* Title */}
                                <motion.h2
                                    variants={fadeIn}
                                    className="text-3xl sm:text-4xl font-bold text-center mb-4 font-heading leading-tight text-white"
                                    style={{ fontFamily: 'Playfair Display, serif' }}
                                >
                                    {t('title')}
                                </motion.h2>

                                {/* Body Text */}
                                <motion.p
                                    variants={fadeIn}
                                    className="text-base sm:text-lg text-white/90 text-center mb-8 font-body leading-relaxed max-w-md mx-auto"
                                >
                                    {t.rich('description', {
                                        span: (chunks) => <span className="font-bold text-white text-xl">{chunks}</span>
                                    })}
                                </motion.p>

                                {/* Action Button */}
                                <div className="mt-8">
                                    <motion.button
                                        onClick={handleAccept}
                                        disabled={isSubmitting}
                                        className="w-full bg-fana-primary text-white py-4 rounded-xl font-semibold text-base shadow-lg transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-white hover:text-fana-primary hover:shadow-2xl hover:shadow-white/50 hover:-translate-y-0.5"
                                        whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}}
                                        whileTap={!isSubmitting ? { scale: 0.97, y: 0 } : {}}
                                    >
                                        {isSubmitting ? (
                                            <svg className="animate-spin h-5 w-5 text-white hover:text-fana-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            t('button')
                                        )}
                                    </motion.button>
                                </div>

                                {/* Small print */}
                                <motion.p
                                    variants={fadeIn}
                                    className="text-xs text-white/60 text-center mt-6 font-body"
                                >
                                    {t('disclaimer')}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

