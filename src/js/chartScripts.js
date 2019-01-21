import {Bar} from 'react-chartjs-2';

export function chartSetup(stats){
    stats = stats.reverse();
    
    //var ctx = document.getElementById("pokemon-stats").getContext('2d');
    let statChart = this.statChart;
    var pokemonStats = new Chart(statChart,  {
        type: 'bar',
        data: {
            labels: [
                        stats[0].stat.name,
                        stats[1].stat.name,
                        stats[2].stat.name,
                        stats[3].stat.name,
                        stats[4].stat.name,
                        stats[5].stat.name
                    ],
            datasets: [{
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });


}