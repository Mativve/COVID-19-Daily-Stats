<script>
import { Line } from 'vue3-chart-v2';

export default {
  name: 'LineChartCDR',
  extends: Line,
  props:{
    chartData:{
      type:Array
    }
  },
  methods:{
    render(){
      const dateOptions = {
          year: "2-digit",
          month: "numeric",
          day: "numeric"
      };

      const dates = this.chartData.map(d => {
        let date = new Date(d.last_update);
        return date.toLocaleDateString("pl-PL", dateOptions);
      }).reverse();
      
      const cases = this.chartData.map(c => c.cases).reverse();
      const deaths = this.chartData.map(d => d.deaths).reverse();
      const recovered = this.chartData.map(r => r.recovered).reverse();
      const vaccined = this.chartData.map(v => (v.vaccine) ? v.vaccine : 0).reverse();

      this.renderChart({
        labels: dates,
        datasets: [
          {
            label: 'Przypadki',
            borderColor: '#0b93fb',
            backgroundColor: "rgba(255,255,255,0)",
            data: cases
          },
          {
            label: 'Zgony',
            borderColor: '#e45253',
            backgroundColor: "rgba(255,255,255,0)",
            data: deaths
          },
          {
            label: 'Ozdrowienia',
            borderColor: '#2f7b63',
            backgroundColor: "rgba(255,255,255,0)",
            data: recovered
          },
          {
            label: 'Szczepienia',
            borderColor: '#e48c52',
            backgroundColor: "rgba(255,255,255,0)",
            data: vaccined
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        pointHitDetectionRadius: 0,
        cutoutPercentage: 80,
        elements: {
            line: {
                tension: 0.1
            },
            point:{
                radius: 0,
                hoverRadius: 0
            }
        },
        legend: {
            display: true,
        },
        tooltips: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
        hover:{
          mode:'x',
          intersect: false
        },
        scaleShowValues: true,
        scales: {
          xAxes: [{
            display: true,
            stacked: true,
            ticks: {
              maxRotation: 30,
              minRotation: 25,
              padding: 5,
              autoSkip: true,
              fontSize: 10
            }
          }],
          yAxes: [{
            display: false
          }]
        }
      });
    }
  },
  mounted(){
    this.render();
  }
}
</script>
<style lang="scss" scoped>
.chartjs-render-monitor{
  max-height: 300px;
}
</style>