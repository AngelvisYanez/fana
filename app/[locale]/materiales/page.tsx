'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations';
import { 
  SparklesIcon, 
  StarIcon, 
  BoltIcon, 
  CubeIcon, 
  CogIcon, 
  BeakerIcon,
  Cog6ToothIcon,
  MagnifyingGlassCircleIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

export default function MaterialesPage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
      
      {/* Hero Section */}
      <section className="bg-fana-secondary py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-fana-primary/10 text-fana-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              variants={fadeInUp}
            >
              <span className="w-2 h-2 bg-fana-primary rounded-full"></span>
              Materiales Premium
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-fana-navy mb-6 leading-tight"
              variants={fadeInUp}
            >
              <span className="text-fana-primary">Materiales</span> de Alta Calidad
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
              variants={fadeInUp}
            >
              Solo trabajamos con materiales certificados y biocompatibles de las mejores marcas internacionales.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Zirconio */}
            <div className="bg-fana-secondary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-fana-secondary/20">
              <div className="w-16 h-16 bg-fana-primary rounded-2xl flex items-center justify-center mb-6">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-fana-navy mb-4">Zirconio Multicapa</h3>
              <p className="text-gray-600 mb-6">
                Material de alta resistencia y estética superior para restauraciones dentales duraderas.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Resistencia &gt; 1200 MPa
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Translucidez natural
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Certificación ISO 13356
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Biocompatibilidad total
                </li>
              </ul>
            </div>

            {/* Disilicato de Litio */}
            <div className="bg-fana-secondary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-fana-secondary/20">
              <div className="w-16 h-16 bg-fana-primary rounded-2xl flex items-center justify-center mb-6">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-fana-navy mb-4">Disilicato de Litio</h3>
              <p className="text-gray-600 mb-6">
                Material estético de excelencia para restauraciones que requieren máxima naturalidad.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Resistencia &gt; 400 MPa
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Estética superior
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Mínimo desgaste
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Certificación CE
                </li>
              </ul>
            </div>


            {/* PMMA */}
            <div className="bg-fana-secondary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-fana-secondary/20">
              <div className="w-16 h-16 bg-fana-primary rounded-2xl flex items-center justify-center mb-6">
                <CubeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-fana-navy mb-4">PMMA</h3>
              <p className="text-gray-600 mb-6">
                Material provisional de alta calidad para restauraciones temporales.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Bloques provisionales
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Fácil fresado
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Colores variados
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Económico
                </li>
              </ul>
            </div>


            {/* Cera */}
            <div className="bg-fana-secondary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-fana-secondary/20">
              <div className="w-16 h-16 bg-fana-primary rounded-2xl flex items-center justify-center mb-6">
                <BeakerIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-fana-navy mb-4">Cera de Fresado</h3>
              <p className="text-gray-600 mb-6">
                Material para modelado y encerado de estructuras protésicas.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Modelado preciso
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Fácil fresado
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Sin residuos
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fana-primary rounded-full"></span>
                  Colada directa
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-fana-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fana-navy mb-6">
              Tecnología de Fresado CNC
            </h2>
            <p className="text-lg text-gray-600">
              Utilizamos maquinaria de 5 ejes con precisión micrométrica para garantizar resultados excepcionales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md text-center border border-fana-secondary/20">
              <div className="flex justify-center mb-4">
                <Cog6ToothIcon className="w-16 h-16 text-fana-primary" />
              </div>
              <h3 className="text-xl font-bold text-fana-navy mb-2">Fresadoras 5 Ejes</h3>
              <p className="text-gray-600 text-sm">Precisión micrométrica (±5μm)</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center border border-fana-secondary/20">
              <div className="flex justify-center mb-4">
                <MagnifyingGlassCircleIcon className="w-16 h-16 text-fana-primary" />
              </div>
              <h3 className="text-xl font-bold text-fana-navy mb-2">Escáneres 3D</h3>
              <p className="text-gray-600 text-sm">Resolución de 10μm</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center border border-fana-secondary/20">
              <div className="flex justify-center mb-4">
                <ComputerDesktopIcon className="w-16 h-16 text-fana-primary" />
              </div>
              <h3 className="text-xl font-bold text-fana-navy mb-2">Software CAD/CAM</h3>
              <p className="text-gray-600 text-sm">Certificación CE médica</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </PageTransition>
  );
}
