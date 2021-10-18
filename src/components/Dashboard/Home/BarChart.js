import React from 'react'
import { Box } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

export default function BarChart() {
  return (
    <Box style={{ width: '100%' }}>
      <Bar
        data={{
          labels: ["IT", "CE", "CSE", "ME", "CL", "EE", "EC"],
          datasets: [
            {
              label: "Feedback",
              data: [12, 19, 3, 5, 20, 23, 24],
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
