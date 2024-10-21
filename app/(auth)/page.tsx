import FormAuth from '@/components/login/FormAuth'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>
    <h1 className="font-bold text-5xl italic">AnReHis</h1>
    <article
      className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md form-container">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Bienvenido de nuevo! Por favor, ingresa tus credenciales.
      </h2>

        <FormAuth />
        
        <p>
            <Link
                href="mailto:gabo2023brazil@gmail.com"
                className="text-blue-500 hover:underline"
            >
                ¿No tienes una cuenta? Habla con nosotros para crear una 
            </Link>
        </p>
      
    </article>
    <div id="app-info" className="p-6">
      <p>
        Una plataforma que facilita el analisis de datos historicos de una plataforma academica.
      </p>
    </div>
  </div>
  )
}

export default page