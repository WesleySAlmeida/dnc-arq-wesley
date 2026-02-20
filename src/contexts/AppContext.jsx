import { createContext, useState, useEffect } from "react";
import { getApiData } from "../services/apiServices";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const savedLanguage = localStorage.getItem('lang')
    const [language, setLanguage] = useState(savedLanguage ?? 'br')
    const [languages, setLanguages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const data = await getApiData('webtext')
                setLanguages(data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchLanguages()
    }, [])

    useEffect(() => {
        localStorage.setItem('lang', language)
    }, [language])

    return (
        <AppContext.Provider value={{ language, setLanguage, languages, loading }}>
            {children}
        </AppContext.Provider>
    )
}
