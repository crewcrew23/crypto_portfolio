import {useRef, useState} from "react";
import {Flex, Select, Space, Typography, Divider, Form, InputNumber, DatePicker, Button, Result,} from "antd";
import {useAddAsset, useCrypto} from "../context/crypto-context.jsx";
import CoinInfo from "./CoinInfo.jsx";

const validateMessages = {
    required: "${label} is required!",
    types:{
        number:'${label} in not valid number'
    },
    number:{
        range:'${label} must be between ${min} and ${max}'
    }
};

export default function AddCoinForm({onClose}, addCoin){
    const [coin, setCoin] = useState(null)
    const {crypto} = useCrypto()
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()
    const addAsset = useAddAsset()

    if (!coin){
        return (
            <Select
                style={{
                    width: '100%',
                }}
                placeholder={"Select coin"}
                onSelect={(value)=> setCoin(crypto.find((c)=>c.id === value))}
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
        )
    }
    if (submitted){
        return (
            <Result
                status="success"
                title={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
                subTitle="New order was be added on your portfolio"
                extra={[
                    <Button type="primary" key="close" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }

    function onFinish(values){
        const newAsset = {
            id: coin.id,
            amount: values['amount'],
            price: values['price'],
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        addAsset(newAsset)
        setSubmitted(true)
    }
    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }
    return(
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +(coin.price).toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
                <CoinInfo coin={coin}/>
                <Divider/>
            <Flex vertical={true} justify={"start"}>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Enter coin amount"
                        onChange={handleAmountChange}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item label="Price" name="price">
                    <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Total" name="total">
                    <InputNumber disabled style={{ width: '100%' }} />
                </Form.Item>

                    <Form.Item label="Date & Time: " name="date">
                        <DatePicker showTime format="YYYY-MM-DD HH:mm"/>
                    </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>
            </Flex>
        </Form>
    )
}