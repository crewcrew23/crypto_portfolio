import {Button, Layout, Modal, Tag, Typography, Drawer} from "antd";
import React, {useState} from "react";
import {useCrypto} from "../../context/crypto-context.jsx";
import '../../styles/content.css'
import PortfolioChart from "../PortfolioChart.jsx";
import AssetsTable from "../AssetsTable.jsx";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
};
export default function AppContent(){
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { assets, crypto } = useCrypto()
    const cryptoPriceMap = crypto.reduce((acc, c)=>{
        acc[c.id] = c.price
        return acc
    }, {})

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return(

        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{color:"white", textAlign:"left",}}>
                Portfolio:
            <Tag color={"green"} style={{maxWidth:130,maxHeight:30 ,display:"flex", justifyContent:"center", fontSize:18,}}>
                {assets.length !== 0 && crypto.length !== 0 && assets.map(asset =>{
                return asset.amount * cryptoPriceMap[asset.id]
            })
                .reduce((acc, v)=> (acc+=v), 0)
                .toFixed(2)}$
            </Tag>
                <Button type="primary" onClick={showDrawer}>
                    Show analytics
                </Button>
                <Drawer title="Analytics" onClose={onClose} open={open} size={'large'}>
                    <PortfolioChart/>
                    <AssetsTable/>
                </Drawer>
            </Typography.Title>

        </Layout.Content>

    )
}