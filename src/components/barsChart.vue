<script>

import { HorizontalBar } from 'vue-chartjs'

export default {
    extends: HorizontalBar,
    props: {
        data: Array
    },
    computed: {
        myData() {
            return this.data
        }
    },
    watch: {
        myData(nVal) {

            this.options.scales.xAxes[0].ticks.max = parseInt(nVal[1][0])
            this.chartData.datasets[0].data = nVal[0]
            this.renderChart(this.chartData, this.options)
        }
    },
    data() {
        return {
            chartData: {
                labels: ["Azua", "Bahoruco", "Barahona", "Dajabón", "D. N.", "Duarte", "Elias Piña", "El Seibo",
                        "Espaillat", "Hato Mayor", "Hnas. Mirabal", "Independencia", "La Altagracia", "La Romana", "La Vega",
                        "M. T. Sanchez", "Monseñor Nouel", "Monte Cristi", "Monte Plata", "Pedernales", "Peravia", 
                        "Puerto Plata", "Samaná", "San Cristóbal", "San J. de Ocoa", "San Juan", "S. P. de Macorís",
                        "S. Ramírez", "Santiago", "Stgo. Rodríguez", "Santo Domingo", "Valverde"],

                datasets: [{
                    label: "Participantes",
                    data: [],
                    borderWidth: 1,
                    backgroundColor: 'rgba(83, 255, 120, 0.65)',
                    borderColor: "rgba(0, 0, 0, 0.8)",
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            drawOnCharArea: false,
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true,
                            max: 0
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        },
                        ticks: {
                            display: true,
                            fontColor: '#fff',
                        }
                    }]
                }
            }
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>