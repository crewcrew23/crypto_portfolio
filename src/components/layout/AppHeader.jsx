import {Layout, Select, Space, Button, Modal, Drawer, Typography, Tag} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddCoinForm from "../AddCoinForm.jsx";
import MoreInfo from "../MoreInfo.jsx";

const headerStyle = {
    textAlign: 'center',
    width: '100%',
    height: 60,
    padding: '1rem',
    justifyContent: 'space-between',
    alignItems:'center',
    background:'white',
    display:'flex',
    boxShadow: '4px 22px 8px 0px rgba(34, 60, 80, 0.2)'

};
export default function AppHeader(){
    const {crypto} = useCrypto()
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const [drawer, setDrawer] = useState(false)
    const [more, setMore] = useState(false)

    const handleSelect = (value) => {
        setCoin(crypto.find(c => c.id === value))
        setModal(true)
    };

    useEffect(()=>{
        const keyPress = (event) =>{
            if(event.key === '/'){
                setSelect((prev)=>!prev)
            }
        }
        document.addEventListener('keypress', keyPress)
        return () => document.removeEventListener('keypress', keyPress)
    }, [] )

    return(
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '250px',
                }}
                value={'Press / to open'}
                open={select}
                onSelect={handleSelect}
                onClick={()=> setSelect((prev)=>!prev)}
                options={crypto.map(coin =>({
                    label:coin.name,
                    value:coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                    <img src={option.data.icon}  alt={option.data.label} style={{width:'20px'}}/>
                     <span>{option.data.label}</span>
                    </Space>
                )}
            />
            <Modal
                   open={modal}
                   onOk={() => setModal(false)}
                   onCancel={() => setModal(false)}
                   footer={()=>(
                       <Button type="primary" onClick={()=> setMore(true)}>More info</Button>
                   )}
                   >
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Button type="primary"
            onClick={()=> setDrawer(true)}
            >Add coin
            </Button>
            <Drawer
                title="Add coin"
                onClose={()=> setDrawer(false)}
                open={drawer}
                width={600}
                destroyOnClose
            >
                <AddCoinForm  onClose={()=> setDrawer(false)} />
            </Drawer>
            <Drawer
                title="More info"
                placement={"right"}
                width={500}
                onClose={()=> setMore(false)}
                open={more}
                extra={
                    <Space>
                        <Button type="primary" onClick={()=> setMore(false)}>
                            Close
                        </Button>
                    </Space>
                }
            >
                <MoreInfo coin={coin}/>
            </Drawer>

        </Layout.Header>

    )
}