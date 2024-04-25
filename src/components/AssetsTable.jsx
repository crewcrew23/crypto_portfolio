import { Table } from 'antd';
import {useCrypto} from "../context/crypto-context.jsx";
import {capitalize} from "../utils.js";




export default function AssetsTable(){
    const {assets, crypto} = useCrypto()
    const filtrs = assets.map((asset) => {
        return {
            text:capitalize(asset.id),
            value:capitalize(asset.id),
        }

    })
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: {
                target: 'full-header',
            },
            filters:filtrs,

            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'purchase price, $',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Current price for 1, $',
            dataIndex: 'profit',

        },
        {
            title: 'Amount',
            dataIndex: 'amount',

        },
    ];

    let key = 1
    const cryptoPriceMap = crypto.reduce((acc, c)=>{
        acc[c.id] = c.price
        return acc
    }, {})

    const data = assets.map((asset) => {
        return {
            key:key+=1,
            name:capitalize(asset.id),
            price:(asset.price * asset.amount).toFixed(2),
            amount:asset.amount.toFixed(2),
            profit:cryptoPriceMap[asset.id].toFixed(2),
        }

    })
    return(
        <Table
            columns={columns}
            dataSource={data}
            showSorterTooltip={{
                target: 'sorter-icon',
            }}
        />
    )
}