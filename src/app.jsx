import { useEffect, useState } from "react"

import './App.css'

const CAT_ENDPOINT_RANDOM = 'https://catfact.ninja/fact'
const CAT_PREFIX = 'https://cataas.com'

export function App() {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM)
            .then(res => res.json())
            .then(data => {
                const { fact } = data
                setFact(fact)
                const threetword = fact.split(' ').slice(0, 3).join(' ')
                //slice sirve para poder quedarnos las tres primeras palabras
                //el split te permite dividir una cadena de texto apartir del separador que yo le diga
                //el join los junta en una cadena de texto
                fetch(`https://cataas.com/cat/says/${threetword}?size=50&color=red&json=true`)
                    .then(res => res.json())
                    .then(response => {
                        const { url } = response
                        setImageUrl(url)
                    })
            })
    }, [])
    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt={`cat ${fact}`}></img>}
        </main>
        //renderizado condicional
    )
}