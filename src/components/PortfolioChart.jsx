import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card } from 'antd';
import {useCrypto} from "../context/crypto-context.jsx";
import {capitalize} from "../utils.js";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PortfolioChart(){
    const {crypro, assets} = useCrypto()
    const labels = assets.map(aset => capitalize(aset.id))
    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: assets.map(asset => asset.totalAmount),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            },
        ],
    };

    return(
        <div style={{
            display:"flex",
            marginBottom:'1rem',
            justifyContent:'center',
            height:400,
        }}>
            <Card>
                <Pie data={data} />
            </Card>
        </div>
    )
}