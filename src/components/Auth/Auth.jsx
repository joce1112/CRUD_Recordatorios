import { useState } from 'react'
import { supabase } from '../../config/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('¡Revise su correo electrónico para el enlace de inicio de sesión!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header" >Iniciar secion</h1>
        <p className="description">inicie sesión a través del enlace mágico con su correo electrónico a continuación</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Ingresa tu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>Cargando</span> : <span>Enviar enlace de acceso</span>}
          </button>
        </div>
      </div>
    </div>
  )
}