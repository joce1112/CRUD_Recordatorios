import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import AppBar from '../../components/AppBar';
 import { Routes , Route } from "react-router-dom";
import Perfiles from "../Perfiles";
import Recordatorios from "../Recordatorios";
import Home from "../Home";
// import RecordatorioHome from "../Recordatorio-Home";


export default function Rotas({ session }) {
    const [, setLoading] = useState(true);
    const [, setUsername] = useState(null);
    const [, setCreated_at] = useState(null);
    const [, setWebsite] = useState(null);
    const [, setImgperfiles_url] = useState(null);
    const [, setTitulo] = useState(null);
    const [, setFechaCreacion] = useState(null);
    const [, setContenido] = useState(null);
    const [, setFechaRecordatorio] = useState(null);

    useEffect(() => {
        getPerfiles();
    }, [session]);
    useEffect(() => {
        getRecordatorios();
    }, [session]);

    async function getPerfiles() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("profiles")
                .select(`username,updated_at, avatar_url,website`)
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setCreated_at(data.updated_at);
                setImgperfiles_url(data.avatar_url);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }
    async function getRecordatorios() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("memorie")
                .select(`title, dateMemories, contain, created_at`)
                .eq("id", user.id)
         

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setTitulo(data.title);
                setFechaCreacion(data.created_at);
                setContenido(data.contain);
                setFechaRecordatorio(data.dateMemories);
               console.log(data);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }
   

    return (
        
        <div className="form-widget">
         <AppBar/>

           
            <Routes>
                        <Route path='/Perfiles' element={<Perfiles key={session.user.id} session={session}  />}/>
                        <Route path='/Recordatorios' element={<Recordatorios key={session.user.id} session={session}  />}/>
                        
                        <Route path='/' element={<Home />}/>
            </Routes>

        </div>
    );
}