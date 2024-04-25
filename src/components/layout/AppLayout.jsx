import AppHeader from "./AppHeader.jsx";
import {Layout, Spin} from "antd";
import AppSider from "./AppSider.jsx";
import AppContent from "./AppContent.jsx";
import React, {useContext} from "react";
import cryptoContext from "../../context/crypto-context.jsx";
import '../../styles/appLayout.css'

export default function AppLayout() {
    const {loading} = useContext(cryptoContext)
    if (loading){
        return <Spin fullscreen/>
    }
    return(
        <Layout className='layout'>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}