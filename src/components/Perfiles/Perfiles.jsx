import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import ImgPerfiles from "../Avatar";
import AppBar from '../../components/AppBar';

import { useTranslation } from "react-i18next";
export default function Perfiles({ session }) {

    //Datos 
    const [loading, setLoading] = useState(true);
    const [updated_at, setUpdated_at] = useState(null);
    const [username, setUsername] = useState(null);
    const [avatar_url, setAvatar_url] = useState(null);
    const [website, setWebsite] = useState(null);
    const { t } = useTranslation();
   
    useEffect(() => {
        getPerfiles();
    }, [session]);

    //Obtener perfiles 
    async function getPerfiles() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("profiles")
                .select(`updated_at,username,avatar_url,website`)
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                setUsername(data.username);
                setUpdated_at(data.updated_at);
                setAvatar_url(data.avatar_url);
                setWebsite(data.website);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function updatePerfiles({ username,avatar_url,website }) {

        try {
            setLoading(true);
            const user = supabase.auth.user();
            const updates = {
                id: user.id,
                username,
                avatar_url, 
                website,
                updated_at: new Date(),
            };

            let { error } = await supabase.from("profiles").upsert(updates, {
                returning: "minimal", // Don't return the value after inserting
            });

            if (error) {
                alert ('error al registrar usuario'+error)
                throw error;
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
            alert('Actualizacion exitosa');
        }
    }

    return (        
        <div className="form-widget">            
        <AppBar/>
  
            <ImgPerfiles            
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatar_url(url);
                    updatePerfiles({ username, updated_at,website, avatar_url: url });
                }}
            />
            <div>
                <label htmlFor="email"><p>{t("Email")}</p></label>
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="username"><p>{t("Name")}</p></label>
                <input
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
         
            <div>
                <label htmlFor="Website"><p>{t("Website")}</p></label>
                <input
                    id="website"
                    type="texto"
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="Fecha de actualizacion"><p>{t("Date Update")}</p></label>
                <input
                    id="fechaAct"
                    type="text"
                    value={updated_at || ""}
                    onChange={(e) => setUpdated_at(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button block primary"
                    onClick={() =>
                        updatePerfiles({ username, updated_at, website, avatar_url})
                    }
                    disabled={loading}
                >
                    {loading ? <p>{t("Loading ...")}</p> : <p>{t("Update")}</p> }
                </button>
            </div>
        
        </div>
    );
}
