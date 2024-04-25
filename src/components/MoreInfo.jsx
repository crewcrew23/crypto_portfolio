import {Flex, List, Tag, Typography} from "antd";
import React from "react";

export default function MoreInfo({coin}){
    return(
        <Flex align={"start"} vertical={true}>
            <div style={{marginBottom:10}}>
            <h2 style={{marginBottom:5}}>Info:</h2>
            <List
                size="small"
                bordered
                dataSource={[
                    {title: 'Name', value: coin.name},
                    {title: 'Price', value: coin.price + ' $', dollars: true},
                    {title: 'Volume', value: coin.volume + ' $', dollars: true},
                    {title: 'MarketCap', value: coin.marketCap + ' $', dollars: true},
                    {title: 'Available supply', value: coin.availableSupply},
                    {title: 'Total Supply', value: coin.totalSupply},
                    {title: 'Price Change 1 hour', value: coin.priceChange1h, changed: true, changed1h: true},
                    {title: 'Price Change 1 day', value: coin.priceChange1d, changed: true, changed1d: true},
                    {title: 'Price Change 1 week', value: coin.priceChange1w, changed: true, changed1w: true},
                    {title: 'Contract address', value: coin.contractAddress},
                ]}
                renderItem={(item) =>
                    <List.Item>
                        <span>{item.title}: </span>
                        {item.changed === undefined && item.dollars === undefined &&
                            <Typography.Text>{item.value}</Typography.Text>}
                        {item.dollars && <Tag color={"green"}>{item.value}</Tag>}
                        {item.changed1h && <Tag color={item.value > 0 ? 'green' : 'red'}>{item.value} %</Tag>}
                        {item.changed1d && <Tag color={item.value > 0 ? 'green' : 'red'}>{item.value} %</Tag>}
                        {item.changed1w && <Tag color={item.value > 0 ? 'green' : 'red'}>{item.value} %</Tag>}

                    </List.Item>}
            />
            </div>
            <div style={{marginBottom:5}}>
            <h2 style={{marginBottom:5}}>Social media:</h2>
            <List
                size="small"
                bordered
                dataSource={[
                    {title: 'Reddit', value: coin.redditUrl},
                    {title: 'Website', value: coin.websiteUrl},
                    {title: 'Twitter', value: coin.twitterUrl},

                ]}
                renderItem={(item) =>
                    <List.Item>
                        <span style={{marginRight: 10}}>{item.title}: </span>
                        <Typography.Text>{item.value}</Typography.Text>
                    </List.Item>}
            />
            </div>
            <div style={{marginBottom:5}}>
            <h2 style={{marginBottom:5}}>Explorers:</h2>
            <List
                size="small"
                bordered
                dataSource={[
                    {title:'https://blockchair.com/bitcoin/'},
                    {title:'https://btc.com/'},
                    {title:'https://btc.tokenview.io/'},
                    {title:'https://www.oklink.com/btc',},
                    {title:'https://3xpl.com/bitcoin'},
                    {title:'https://blockchain.coinmarketcap.com/chain/bitcoin'},
                    {title:'https://blockexplorer.one/btc/mainnet'},


                ]}
                renderItem={(item) =>
                    <List.Item>
                        <span style={{marginRight: 10}}>{item.title}: </span>
                    </List.Item>}
            />
            </div>
        </Flex>
    )
}