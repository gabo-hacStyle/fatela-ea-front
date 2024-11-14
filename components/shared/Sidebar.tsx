import React from 'react'
import LogoutButton from './LogoutButton'

type SidebarProps = {
    role: 'admin' | 'staff' | 'coordinador'
}


const Sidebar = ({role}: SidebarProps) => {
  return (
    <div className="hidden lg:block  w-64 shadow-md shadow-dark-black/50 ">
      <aside className=" h-screen fixed flex flex-col justify-between items-center pt-16 pl-10">
        {role === "admin" ? (
          <>
            <ul className="space-y-6">
              <li>
                <h2
                  className="text-xl font-bold mb-2 clickable hover:underline"
                 
                >
                  Estudiantes
                </h2>
                <ul className="space-y-2 pl-4">
                  <li>
                    <span
                      className="clickable text-gray-600 "
                     
                    >
                      Crear Estudiante
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <h2
                  className="text-xl font-bold mb-2 clickable hover:underline"
                 
                >
                  Cursos
                </h2>
                <ul className="space-y-2 pl-4">
                  <li>
                    <span
                      className="clickable text-gray-600 "
                     
                    >
                      Crear Curso
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <h2
                  className="text-xl font-bold mb-2 clickable hover:underline"
                 
                >
                  Usuarios
                </h2>
                <ul className="space-y-2 pl-4">
                  <li>
                    <span
                      className="clickable text-gray-600 "
                     
                    >
                      Crear Usuario
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        ) : (
          <div className="p-4 w-[90%]  text-xs">
            <h2 className="text-xl font-bold mb-4">Filtros:</h2>
            <ul className="space-y-2 pl-4">
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 1</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 2</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 3</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 4</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 5</span>
                </label>
              </li>
              <li>
                <label className=" inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-6 form-checkbox text-primary-blue"
                  />
                  <span className="ml-2">Filtro 6</span>
                </label>
              </li>
            </ul>
            <br />
            {/* {
              isShowingStudent && (
                <span className="text-xl clickable" onClick={() => {
                  dispatch(setShowStudent(false));
                  dispatch(setItemId(null));
                }}>
                  Estudiantes
                </span>
              )

            } */}

            
          </div>
        )}
        <LogoutButton  position='sidebar'/>
      </aside>
    </div>
  )
}

export default Sidebar