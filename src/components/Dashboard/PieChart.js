import React from 'react'
import { Box } from '@material-ui/core'
import { Pie } from 'react-chartjs-2'

export default function PieChart({ labels, data, label }) {
  return (
    <Box>
      <Pie
        data={{
          labels: ['Completely Agree', 'Agree', 'Neutral', 'Disagree', 'Completely Disagree'],
          datasets: [
            {
              label,
              data,
              fill: true,
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)"
              ],
              borderColor: [
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)"
              ],
              borderWidth: 2
            }
          ]
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          pointRadius: 5,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
      />
    </Box>
  )
}
