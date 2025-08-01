import React from 'react';
import { Users, Award, Heart, Truck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Acerca de Tienda Moderna
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos una empresa colombiana dedicada a ofrecer productos de limpieza de la más alta calidad 
            para hogares y empresas en todo el país.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <p className="text-gray-600 mb-4">
                Fundada en 2020, Tienda Moderna nació con la misión de revolucionar la forma en que 
                los colombianos acceden a productos de limpieza de calidad premium.
              </p>
              <p className="text-gray-600 mb-4">
                Comenzamos como una pequeña empresa familiar y hoy somos uno de los distribuidores 
                más confiables del país, sirviendo a miles de hogares y empresas.
              </p>
              <p className="text-gray-600">
                Nuestro compromiso con la calidad, el servicio al cliente y la innovación nos ha 
                permitido crecer y expandirnos a nivel nacional.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">Imagen de la empresa</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad</h3>
              <p className="text-gray-600">
                Solo ofrecemos productos de las mejores marcas y con los más altos estándares de calidad.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Servicio</h3>
              <p className="text-gray-600">
                Nuestro equipo está comprometido con brindar la mejor experiencia de compra a cada cliente.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confianza</h3>
              <p className="text-gray-600">
                Construimos relaciones duraderas basadas en la transparencia y la honestidad.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eficiencia</h3>
              <p className="text-gray-600">
                Entregamos tus productos de manera rápida y segura en todo el territorio nacional.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-blue-600 text-white rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Productos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Ciudades</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-blue-200">Calificación</div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nuestra Misión
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Facilitar el acceso a productos de limpieza de alta calidad a través de una plataforma 
              digital moderna, eficiente y confiable, contribuyendo al bienestar y la salud de los 
              hogares colombianos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
