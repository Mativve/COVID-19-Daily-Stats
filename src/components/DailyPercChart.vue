<script>
import { defineComponent } from 'vue'
import { Bar } from 'vue3-chart-v2';

export default defineComponent({
  name: 'DailyPercChart',
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

  methods:{
    render(){
      const dateOptions = {
          year: "2-digit",
          month: "numeric",
          day: "numeric"
      };

      this.stats = this.stats.slice(this.stats.length-30);

      let dates = this.stats.map(d => {
        let date = new Date(d.last_update);
        return date.toLocaleDateString("pl-PL", dateOptions);
      });

      dates.shift();

      let diffs = [];

      for(let i=1; i < this.stats.length; i++){
        // console.log( this.stats[i].last_update, this.stats[i-1].last_update );
        
        const c_diff = this.stats[i].cases - this.stats[i - 1].cases;
        const d_diff = this.stats[i].deaths - this.stats[i - 1].deaths;
        const r_diff = this.stats[i].recovered - this.stats[i - 1].recovered;

        diffs.push({
          date: this.stats[i].last_update,
          cases: ( isNaN(c_diff) ) ? 0 : c_diff,
          deaths: ( isNaN(d_diff) ) ? 0 : d_diff,
          recovered: ( isNaN(r_diff) ) ? 0 : r_diff
        });
      }

      const cases_perc = diffs.map(c => {
        const total = c.cases + c.deaths + c.recovered;

        if( total !== 0 ){
          return (c.cases / total) * 100;
        }
        else{
          return 0;
        }
      });

      const deaths_perc = diffs.map(d => {
        const total = d.cases + d.deaths + d.recovered;

        if( total !== 0 ){
          return (d.deaths / total) * 100;
        }
        else{
          return 0;
        }
      });

      const recovered_perc = diffs.map(r => {
        const total = r.cases + r.deaths + r.recovered;

        if( total !== 0 ){
          return (r.recovered / total) * 100;
        }
        else{
          return 0;
        }
      });

      this.renderChart({
        labels: dates,
        datasets: [
          {
            label: 'Dzienne przypadki %',
            borderColor: '#0b93fb',
            backgroundColor: '#0b93fb',
            data: cases_perc
          },
          {
            label: 'Dzienne zgony %',
            borderColor: '#e45253',
            backgroundColor: '#e45253',
            data: deaths_perc
          },
          {
            label: 'Dzienne ozdrowienia %',
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
})
</script>
<style lang="scss" scoped>
.chartjs-render-monitor{
    max-height: 250px;
}
</style>