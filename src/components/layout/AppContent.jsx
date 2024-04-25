import {Button, Layout, Modal, Tag, Typography} from "antd";
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
            <Button type="primary" onClick={showModal} style={{marginTop:10}}>
                Show analytics
            </Button>
            </Typography.Title>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <PortfolioChart/>
                <AssetsTable/>
            </Modal>
        </Layout.Content>

    )
}