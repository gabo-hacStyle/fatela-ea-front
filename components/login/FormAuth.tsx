import React from 'react'

const FormAuth = () => {
  return (
    <form action="">
        <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="username">
          Usuario
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Usuario"
          name="username"
          // value={username}
          // onChange={onInputChange}
        />
      </div>

      <div className="mb-6">
        <label className="block  text-sm font-bold mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          name="password"
          // value={password}
          // onChange={onInputChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-primary-blue  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Ingresar
        </button>
      </div>
    </form>
  )
}

export default FormAuth