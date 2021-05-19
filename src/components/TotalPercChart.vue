<script>
import { Bar } from 'vue3-chart-v2';

export default {
  name: 'TotalPercChart',
  extends: Bar,
  props:{
    chartData:{
      type:Array
    }
  },
  data(){
    return{
      stats: []
    }
  },
  methods: {
    render(){
      const dateOptions = {
          year: "2-digit",
          month: "numeric",
          day: "numeric"
      };

      this.stats = this.stats.reverse();

      this.stats = this.stats.reverse().slice(this.stats.length-30);

      const dates = this.stats.map(d => {
        let date = new Date(d.last_update);
        return date.toLocaleDateString("pl-PL", dateOptions);
      });

      const cases_perc = this.stats.map(c => {
        const total = c.cases + c.deaths + c.recovered;

        return (c.cases / total) * 100;
      });

      const deaths_perc = this.stats.map(d => {
        const total = d.cases + d.deaths + d.recovered;

        return (d.deaths / total) * 100;
      });

      const recovered_perc = this.stats.map(r => {
        const total = r.cases + r.deaths + r.recovered;

        return (r.recovered / total) * 100;
      });

      this.renderChart({
        labels: dates,
        datasets: [
          {
            label: 'Przypadki %',
            borderColor: '#0b93fb',
            backgroundColor: '#0b93fb',
            data: cases_perc
          },
          {
            label: 'Zgony %',
            borderColor: '#e45253',
            backgroundColor: '#e45253',
            data: deaths_perc
          },
          {
            label: 'Ozdrowienia %',
            borderColor: '#2f7b63',
            backgroundColor: '#2f7b63',
            data: recovered_perc
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0.1
            },
            point:{
                radius: 0,
                hoverRadius: 0,
            }
        },
        legend: {
            display: true,
        },
        tooltips: {
          mode: 'label',
          axis: 'x',
          intersect: true,
          callbacks: {
            label: function (tooltipItems){
              if( tooltipItems.yLabel.toString().includes(".") ){
                return tooltipItems.yLabel.toFixed(2) + "%";
              }
              else{
                return tooltipItems.yLabel;
              }
            }
          }
        },
        scaleShowValues: true,
        scales: {
          xAxes: [{
            display: true,
            stacked: true,
            ticks: {
              maxRotation: 50,
              minRotation: 10,
              padding: 10,
              autoSkip: true,
              fontSize: 10
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              min: 0,
              max: 100
            },
            stacked: true
          }]
        }
      });
    }
  },
  watch:{
    chartData(){
      this.render();
    }
  },
  mounted(){
    this.stats = this.chartData;
    this.render();
  }
}
</script>
<style lang="scss" scoped>
.chartjs-render-monitor{
    max-height: 250px;
}
</style>