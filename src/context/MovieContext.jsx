//A Context will allow state to be globally available to anything that's within the provided context
import { createContext,useContext,useState,useEffect } from "react";
//first we must create the context using function createContext
const MovieContext = createContext()
//hl2 be3mal l function le r7 nest5dem feha l useContext yale bte5od l MovieContext le 3rfneha ka provider 
export const useMovieContext=()=> useContext(MovieContext)
//hl2 bde e3ml l provider le r7 yest5dmo l context hyda l provider is going to provide state to any of the components that are wrapped(ya3ni n7ato b albo le bekouno child elo) around it
//bt5lehun ye3mo hook aw access to specific function or state when they need to useit
//children is a reserved prop when you write a component and children is anything that's inside of the component that you rendered
export const MovieProvider =({children})=>{
    const [favorites,setFavorites]=useState([])
    //Local Storage allow us to store values directly within our browser

    useEffect(()=>{
        const storedFavs =localStorage.getItem("favorites") //key favorites
        if(storedFavs) setFavorites(JSON.parse(storedFavs))//r7 n7ot kl l fav movies b2lb list awal shy byen3amala conversuin la json string le2no l local storage bye3ml store la json strings only wel json.parse btraje3a la string fena ne7na no2ra w mn7oto bl favorites
    },[])

    useEffect(()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites))//aya wa2et ana 3m e3ml favorite la shy movie bde e3ml update l hydol le bl local storage
    },[favorites])

    //3ende 3 main operation lezem e3mlon ya ama add favorite aw remove favorite aw check iza hl video favorite
    const addToFavorites = (movie) => {
        setFavorites(prev=>[...prev,movie]) //ana hon bde zed l movie 3a 2e5r ma fee est3ml l push bl react favorite.push 8lt ma bye3ml update lal state
    }

    const removeFromFavorites=(movieId)=>{
        setFavorites(prev=>prev.filter(movie=>movie.id !== movieId))
    }

    const isFavorite=(movieId)=>{
        return favorites.some(movie => movie.id===movieId)
    }
    const value={
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return (
    <MovieContext.Provider value={value}>
        {children} 
    </MovieContext.Provider>)//any child in the provider can access the values
}
