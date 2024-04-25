import {Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React, {useContext} from "react";
import {capitalize} from "../../utils.js";
import CryptoContext, {useCrypto} from "../../context/crypto-context.jsx";
const { Meta } = Card;
import { observer } from "mobx-react-lite"
import '../../styles/sider.css'


const AppSider = observer(() => {
    const { assets} =  useContext(CryptoContext)
    const {crypto} = useCrypto()
    const coin = crypto

    // localStorage.removeItem('assets')

    return(
        <Layout.Sider width="50%" style={{padding: '1rem'}} className='sider'>
            {assets.map(asset =>(
                <Card key={asset.id} bordered={false} className='card'
                      style={{marginBottom: '1rem', maxWidth:'100%'}} >
                    <div style={{display:"flex"}}>
                        <img src={coin.find((c) => c.id === asset.id).icon} style={{width: 20, height:20, marginRight:'0.5rem'}}/>
                        <Statistic
                            title={capitalize(asset.id)}
                            value={asset.totalAmount}
                            precision={2}
                            valueStyle={{
                                color: asset.grow ? '#3f8600' : '#cf1322',
                            }}
                            prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                            suffix="$"
                        />
                    </div>
                    <List
                        size='small'
                        header={<div>Info</div>}
                        bordered
                        dataSource={[
                            {title: 'Coin amount', value: asset.amount, isPlane: true},
                            {title: 'Total profit', value: asset.totalProfit, isProfit: true},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                {item.isPlane && <span>{item.value}</span>}
                                {item.isProfit && <Typography.Text type={asset.grow?'success':'danger'}>
                                    <Tag color={asset.grow?'green':'red'}>
                                        {asset.grow?asset.growPercent+' %':'- '+asset.growPercent+' %'}
                                    </Tag>
                                    {parseFloat(item.value).toFixed(2)} $
                                </Typography.Text>}
                            </List.Item>
                        )}
                    />

                </Card>
            ))}
        </Layout.Sider>
    )
})

export default AppSider;