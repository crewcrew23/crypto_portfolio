import {createContext, useContext, useEffect, useState} from "react";
import {fakeFetchCrypto, fetchAssets} from "../api.js";
import {capitalize, percentDifference} from "../utils.js";

const CryptoContext = createContext({
    assets:[],
    crypto:[],
    loading: false,

})


export const CryptoContextProvider=({children})=> {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    const mapAssets = (assets, result)=>{
        return assets.map(asset => {
            const coin = result.find((c) => c.id === asset.id)
            return{
                grow: asset.price < coin.price,// bool
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                ...asset,
            }
        })

    }
    const fieldChecker = (assetItem, newAsset) =>{
        const coin = crypto.find((c) => c.id === newAsset.id)
        assetItem.amount += newAsset.amount

        if (!isNaN(assetItem.totalProfit)){
            assetItem.totalProfit += (newAsset.amount * coin.price) - (newAsset.amount * newAsset.price)
        }else {
            assetItem.totalProfit = newAsset.amount * coin.price
        }

        if (!isNaN(assetItem.growPercent)){
            assetItem.growPercent = percentDifference(assetItem.price, coin.price)
        }else {
            assetItem.growPercent = percentDifference(newAsset.price, coin.price)
        }

        if (!isNaN(assetItem.totalAmount)){
            assetItem.totalAmount = (assetItem.amount * coin.price)
        }else {
            assetItem.totalAmount = (assetItem.amount * coin.price)
        }
    }
    const addAsset= (newAsset)=> {
        console.log(newAsset)
        const assets = JSON.parse(localStorage.getItem('assets'))

        if (assets.find((a)=> a.id === newAsset.id)){
                const assetItem = assets.find((a)=> a.id === newAsset.id)
                console.log(assetItem)

                fieldChecker(assetItem, newAsset)
                localStorage.setItem('assets', JSON.stringify(assets))
                location.reload()
                setAssets((prev) => mapAssets([...prev], crypto))

        }else {
            const assets = JSON.parse(localStorage.getItem('assets'))
            assets.push(newAsset)
            localStorage.setItem('assets', JSON.stringify(assets))
            setAssets((prev) => mapAssets([...prev, newAsset], crypto))

        }

    }

    useEffect(() => {
        //подгрузка данных о монетах и монетах пользователя
        async function preLoad(){
            setLoading(true)
            const {result} = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preLoad()
    }, [])



    return( <CryptoContext.Provider value={{loading, crypto, assets, addAsset,}}>
        {children}
    </CryptoContext.Provider>
    )
}

export function useAddAsset() {
    const {addAsset} = useContext(CryptoContext);
    return addAsset;
}

export default CryptoContext

export function useCrypto(){
    return useContext(CryptoContext)
}