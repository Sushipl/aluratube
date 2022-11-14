import { StyledRegisterVideo } from "./styles";
import React from 'react'
import { createClient } from "@supabase/supabase-js";

function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues);

    return {
        values, 
        handleChange:(e)=>{
            const value = e.target.value;
            const name = e.target.name;
            console.log(value)
            setValues({
                ...values, [name]: value,
            })
        },
        clearForm:()=>{
            setValues({})
        }
        
    };
}

const PROJECT_URL = 'https://cyqgmdjasbbvtgtpisnf.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5cWdtZGphc2JidnRndHBpc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTcxMjEsImV4cCI6MTk4MzgzMzEyMX0.kGBHmRhBFXZJuC-vriihoIHbhoWH4v59_k0DwBEKldc'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo(){
    const formCadastro = useForm({ initialValues: {titulo: "", url: ""}});
    const [formVisivel, setFormVisivel] = React.useState(false);


    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/*Operador de curto circuito "  true && 'oi' " */}
            {formVisivel 
                ? (   
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(formCadastro.values);

                        supabase.from('TabelaVideos').insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos", 
                        })
                        .then((oq) => {
                            console.log(oq)
                        })
                        .catch((err) => {
                          console.log(err)  
                        })
                        
                        setFormVisivel(false);
                        
                        formCadastro.clearForm();
                        
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input type='text' name="titulo" placeholder="Título do vídeo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange}/>
                            <input type='text' name="url" placeholder="URL" value={formCadastro.values.url} onChange={formCadastro.handleChange} />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                ) : null
            }
        </StyledRegisterVideo>    
    )
}