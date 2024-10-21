import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <>
        <Sidebar role="admin" />
        <main className="wrapper lg:oveflow-y-scroll">
        <header className="header-container p-2 lg:p-4 my-4 lg:mb-8">
          <button
            className="cursor-pointer border lg:hidden border-primary-blue px-2 rounded-sm
        absolute right-7 top-2 "
          >
            Log out
          </button>
          <h1 className="lg:text-5xl text-left font-semibold">Admin Page</h1>
          <nav className="lg:hidden">
            <ul className="flex">
              <li
                className="clickable px-3 border border-primary-blue/50"
               
              >
                Estudiantes
              </li>
              <li
                className="clickable px-3 border border-primary-blue/50"
               
              >
                Cursos
              </li>
              <li
                className="clickable px-3 border border-primary-blue/50"
               
              >
                Usuarios
              </li>
            </ul>
          </nav>
        </header>
            
        <div className="w-full">
          {children}
        </div>
        </main>

    </>
  ) 
}

export default layout