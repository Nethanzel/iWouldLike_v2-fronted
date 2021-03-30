<script>

import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: {
        progress: Array
    },
    computed: {
        myData() {
            return this.progress
        }
    },
    watch: {
        myData(nVal) {
            this.chartData.datasets[0].data = nVal
            this.renderChart(this.chartData, this.options)
        }
    },
    data() {
        return {
            chartData: {
                labels: ["Lo que hay", "Lo que falta"],

                datasets: [{
                    label: "Label",
                    data: [0, 0],

                    borderWidth: 1,
                    backgroundColor: ['rgba(83, 255, 120, 0.75)',
                                    'rgba(50, 150, 50, 0.35)'],
                    borderColor: 'rgba(0, 0, 0, 0.45)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                
                legend: {
                    display: false
                },

                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            drawOnCharArea: false,
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        },
                        ticks: {
                            beginAtZero: false,
                            display: false
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        },
                        
                        ticks: {
                            beginAtZero: false,
                            display: false,
                        },
                    }]
                }
            },
        }
    },

}
</script>
